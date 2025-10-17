/**
 * Matrix Data Utilities
 *
 * This file provides utilities for working with the Meta-Matrix of 16 cognitive operations.
 * The matrix is formed by combining 4 base verbs (OBSERVE, ASK, REMEMBER, IMAGINE) with themselves.
 *
 * @module matrixUtils
 */

/** The 4 base verbs that form the rows of the meta-matrix */
export const ROWS = ['OBSERVE', 'ASK', 'REMEMBER', 'IMAGINE']

/** The 4 base verbs that form the columns of the meta-matrix (same as rows) */
export const COLS = ROWS

/** Color mapping for each base verb/row */
export const ROW_COLORS = {
  OBSERVE: '#3b82f6',  // Blue
  ASK: '#ef4444',      // Red
  REMEMBER: '#f97316', // Orange
  IMAGINE: '#10b981'   // Green
}

/** Mapping of base verbs to MM4 Ward plan quadrants */
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

/**
 * Predefined operation sequences (flows) through the matrix.
 * Useful for creating guided journeys through the 16 operations.
 *
 * @example
 * // Get all operations in the OBSERVE row
 * const observeOps = flows.byRow('OBSERVE')
 * // Returns: ['OBSERVE-OBSERVE', 'OBSERVE-ASK', 'OBSERVE-REMEMBER', 'OBSERVE-IMAGINE']
 */
export const flows = {
  /** Get all operations in a specific row */
  byRow: row => COLS.map(col => `${row}-${col}`),

  /** Get all operations in a specific column */
  byCol: col => ROWS.map(row => `${row}-${col}`),

  /** Get the main diagonal (same verb combined with itself) */
  diagonalCW: () => ['OBSERVE-OBSERVE', 'ASK-ASK', 'REMEMBER-REMEMBER', 'IMAGINE-IMAGINE'],

  /** Get the anti-diagonal (opposite verbs) */
  diagonalCCW: () => ['OBSERVE-IMAGINE', 'ASK-REMEMBER', 'REMEMBER-ASK', 'IMAGINE-OBSERVE']
}

/**
 * Normalizes and enriches raw operations data.
 *
 * Takes raw operation data and adds computed fields like colors, labels, IDs, and connections.
 * This is the main data processing function that prepares operations for use in components.
 *
 * @param {Object} source - Raw operations data object
 * @param {Array<string>} [source.rows] - Optional custom row verbs (defaults to ROWS)
 * @param {Array<string>} [source.cols] - Optional custom column verbs (defaults to COLS)
 * @param {Object} source.operations - Raw operation definitions keyed by "ROW-COL"
 * @returns {Object} Normalized data with rows, cols, rowColors, and enriched operations
 *
 * @example
 * const normalized = normalizeOperationsData(rawOperationsData)
 * console.log(normalized.operations['OBSERVE-ASK'])
 * // { name: 'INQUIRE', row: 'OBSERVE', col: 'ASK', color: '#3b82f6', ... }
 */
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

/**
 * Validates operations data for completeness and consistency.
 *
 * Checks that all required operations exist, colors match, MM4 examples are valid,
 * lens examples are consistent, and connected operation IDs are valid.
 *
 * @param {Object} data - Normalized operations data (output of normalizeOperationsData)
 * @returns {Array<string>} Array of validation issue messages (empty if valid)
 *
 * @example
 * const issues = validateOperationsData(normalizedData)
 * if (issues.length > 0) {
 *   console.error('Validation failed:', issues)
 * }
 */
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

/**
 * Creates MM4 Ward plan data structure from operations data.
 *
 * Transforms the matrix operations into the 4-quadrant MM4 plan structure
 * (Mission, Temple, Family History, Invite), with each quadrant containing
 * 4 actions derived from the operations.
 *
 * @param {Object} data - Normalized operations data
 * @returns {Object} Plan data with quadrants array
 *
 * @example
 * const plan = createPlanData(normalizedData)
 * // plan.quadrants[0] = { id: 'mission', title: 'MISSION', color: '#3b82f6', actions: [...] }
 */
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
