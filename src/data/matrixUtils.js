export const ROWS = ['OBSERVE', 'ASK', 'REMEMBER', 'IMAGINE']
export const COLS = ROWS

export const ROW_COLORS = {
  OBSERVE: '#3b82f6',
  ASK: '#ef4444',
  REMEMBER: '#f97316',
  IMAGINE: '#10b981'
}

const QUADRANTS = {
  OBSERVE: { id: 'mission', title: 'MISSION', subtitle: 'Observe' },
  ASK: { id: 'temple', title: 'TEMPLE', subtitle: 'Ask' },
  REMEMBER: { id: 'familyhistory', title: 'FAMILY HISTORY', subtitle: 'Remember' },
  IMAGINE: { id: 'invite', title: 'INVITE', subtitle: 'Imagine' }
}

const toTitleCase = (value = '') =>
  value
    .toLowerCase()
    .replace(/(^|\s|-)\S/g, match => match.toUpperCase())
    .replace(/Co Create/i, 'Co-Create')

// Inquiries can be questions, observations, thoughts, or shifts - no formatting needed
const passThrough = (value = '') => value.trim()

const extractMm4Verb = (action = '') => {
  const normalized = action.replace(/^DOING\b/, 'DO')
  const match = normalized.match(/^([A-Z][A-Z-]*(?:\s+[A-Z][A-Z-]*)*)\s+.*$/)

  if (!match) {
    return { verb: undefined, action: normalized }
  }

  return { verb: match[1].trim(), action: normalized }
}

export const flows = {
  byRow: row => COLS.map(col => `${row}-${col}`),
  byCol: col => ROWS.map(row => `${row}-${col}`),
  diagonalCW: () => ['OBSERVE-OBSERVE', 'ASK-ASK', 'REMEMBER-REMEMBER', 'IMAGINE-IMAGINE'],
  diagonalCCW: () => ['OBSERVE-IMAGINE', 'ASK-REMEMBER', 'REMEMBER-ASK', 'IMAGINE-OBSERVE']
}

export function normalizeOperationsData(source = {}) {
  const rows = Array.isArray(source.rows) && source.rows.length ? source.rows : ROWS
  const cols = Array.isArray(source.cols) && source.cols.length ? source.cols : COLS
  const operationsInput = source.operations || {}

  const nameToId = {}

  rows.forEach(row => {
    cols.forEach(col => {
      const id = `${row}-${col}`
      const raw = operationsInput[id]
      if (raw && raw.name) {
        nameToId[raw.name.toUpperCase()] = id
      }
    })
  })

  const operations = {}

  rows.forEach(row => {
    cols.forEach(col => {
      const id = `${row}-${col}`
      const raw = operationsInput[id]

      if (!raw) {
        throw new Error(`Missing operation definition for ${id}`)
      }

      const mm4 = extractMm4Verb(raw.mm4Example?.action || '')
      const normalizedAction = mm4.action
      const connectedIds = (raw.connectedOperations || [])
        .map(name => nameToId[(name || '').toUpperCase()])
        .filter(Boolean)

      operations[id] = {
        ...raw,
        id,
        row,
        col,
        pairId: `${col}-${row}`,
        color: ROW_COLORS[row],
        label: toTitleCase((raw.name || '').replace(/-/g, ' ')),
        connectedIds,
        inquiry: passThrough(raw.inquiry || ''),
        mm4Example: {
          ...raw.mm4Example,
          action: normalizedAction,
          verb: mm4.verb
        }
      }
    })
  })

  return {
    rows,
    cols,
    rowColors: { ...ROW_COLORS },
    operations
  }
}

export function validateOperationsData(data) {
  const issues = []
  const rows = data?.rows || ROWS
  const cols = data?.cols || COLS
  const operations = data?.operations || {}

  rows.forEach(row => {
    cols.forEach(col => {
      const id = `${row}-${col}`
      if (!operations[id]) {
        issues.push(`Missing operation: ${id}`)
      }
    })
  })

  const lensKeySet = new Set()
  Object.values(operations).forEach(op => {
    Object.keys(op.lensExamples || {}).forEach(key => {
      lensKeySet.add(key)
    })
  })
  const allLensKeys = Array.from(lensKeySet).sort()

  Object.values(operations).forEach(op => {
    if (op.color && op.color !== ROW_COLORS[op.row]) {
      issues.push(`Color mismatch for ${op.id} (has ${op.color}, expected ${ROW_COLORS[op.row]})`)
    }

    const action = op.mm4Example?.action || ''
    const firstToken = action.split(/\s+/)[0]
    if (op.mm4Example?.verb && op.mm4Example.verb !== firstToken) {
      issues.push(
        `MM4 verb mismatch in ${op.id} (verb=${op.mm4Example.verb}, action starts with ${firstToken})`
      )
    }

    // Inquiries can be questions, observations, thoughts, or shifts - all valid forms
    if (!(op.inquiry || '').trim()) {
      issues.push(`Inquiry is empty: ${op.id}`)
    }

    const keys = Object.keys(op.lensExamples || {}).sort()
    const missing = allLensKeys.filter(key => !keys.includes(key))
    if (missing.length) {
      issues.push(`Lens mismatch for ${op.id} (missing: ${missing.join(', ')})`)
    }
  })

  Object.values(operations).forEach(op => {
    (op.connectedIds || []).forEach(cid => {
      if (!operations[cid]) {
        issues.push(`Unknown connectedId "${cid}" on ${op.id}`)
      }
    })
  })

  return issues
}

export function createPlanData(data) {
  if (!data) {
    return { quadrants: [] }
  }

  return {
    quadrants: data.rows.map(row => {
      const meta = QUADRANTS[row] || {
        id: row.toLowerCase(),
        title: row,
        subtitle: row.charAt(0) + row.slice(1).toLowerCase()
      }

      return {
        id: meta.id,
        title: meta.title,
        subtitle: meta.subtitle,
        color: data.rowColors[row] || ROW_COLORS[row],
        actions: data.cols.map(col => {
          const operationId = `${row}-${col}`
          const operation = data.operations[operationId]
          const action = operation?.mm4Example?.action || ''
          const derivedVerb =
            operation?.mm4Example?.verb || (action.split(/\s+/)[0] || '').toUpperCase()

          return {
            verb: derivedVerb,
            action,
            perspective: operation?.inquiry || ''
          }
        })
      }
    })
  }
}
