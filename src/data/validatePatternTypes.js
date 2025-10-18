/**
 * Pattern Type Validation Script
 *
 * Validates that pattern classifications are structurally consistent with:
 * - The 4×4 matrix structure (operationsData.js)
 * - Base verb references
 * - Operation key formats
 * - Geometric/mathematical soundness
 *
 * Usage: node src/data/validatePatternTypes.js
 */

import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { BASE_VERBS, OPERATION_KEY_REGEX, PATTERN_TYPES, PATTERN_CATEGORIES } from './patternTypes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load data
const patternsPath = join(__dirname, 'patterns.json')
const patternsData = JSON.parse(readFileSync(patternsPath, 'utf-8'))
const patterns = patternsData.patterns

// Load operations data (manually since it's a JS file)
const operationsDataPath = join(__dirname, 'operationsData.js')
const operationsText = readFileSync(operationsDataPath, 'utf-8')

// Extract operation keys from operationsData.js
const operationKeys = []
const operationKeyMatches = operationsText.matchAll(/'([A-Z]+-[A-Z]+)':/g)
for (const match of operationKeyMatches) {
  operationKeys.push(match[1])
}

console.log('🔍 Validating Pattern Type Classifications...\n')
console.log('=' .repeat(80))

let totalIssues = 0
const validationResults = []

// Validate each pattern
patterns.forEach(pattern => {
  const issues = []
  const warnings = []

  console.log(`\n#${pattern.id}: ${pattern.title} [${pattern.type}]`)

  // 1. Validate type field exists
  if (!pattern.type) {
    issues.push('Missing type field')
  } else if (!Object.values(PATTERN_TYPES).includes(pattern.type)) {
    issues.push(`Invalid type: ${pattern.type}`)
  }

  // 1b. Validate category field exists
  if (!pattern.category) {
    issues.push('Missing category field')
  } else if (!Object.values(PATTERN_CATEGORIES).includes(pattern.category)) {
    issues.push(`Invalid category: ${pattern.category}`)
  }

  // 2. Validate derivation metadata
  if (!pattern.derivation) {
    warnings.push('Missing derivation metadata')
  } else {
    if (!pattern.derivation.confidence) {
      warnings.push('Missing confidence level')
    }
    if (!pattern.derivation.signals || pattern.derivation.signals.length === 0) {
      warnings.push('No detection signals recorded')
    }
  }

  // 3. Type-specific validations
  if (pattern.type === PATTERN_TYPES.SEQUENCE) {
    validateSequencePattern(pattern, issues, warnings)
  } else if (pattern.type === PATTERN_TYPES.PARTITION) {
    validatePartitionPattern(pattern, issues, warnings)
  } else if (pattern.type === PATTERN_TYPES.MAPPING) {
    validateMappingPattern(pattern, issues, warnings)
  } else if (pattern.type === PATTERN_TYPES.RHYTHM) {
    validateRhythmPattern(pattern, issues, warnings)
  } else if (pattern.type === PATTERN_TYPES.MIXED) {
    validateMixedPattern(pattern, issues, warnings)
  }

  // 4. Validate operation references
  validateOperationReferences(pattern, operationKeys, issues, warnings)

  // Display results
  if (issues.length > 0) {
    console.log('  ❌ Issues:')
    issues.forEach(issue => console.log(`    - ${issue}`))
    totalIssues += issues.length
  }

  if (warnings.length > 0) {
    console.log('  ⚠️  Warnings:')
    warnings.forEach(warning => console.log(`    - ${warning}`))
  }

  if (issues.length === 0 && warnings.length === 0) {
    console.log('  ✅ Valid')
  }

  validationResults.push({
    id: pattern.id,
    title: pattern.title,
    type: pattern.type,
    issues,
    warnings,
    valid: issues.length === 0
  })
})

// Summary
console.log('\n\n' + '=' .repeat(80))
console.log('📊 VALIDATION SUMMARY')
console.log('=' .repeat(80))

const validCount = validationResults.filter(r => r.valid).length
const invalidCount = validationResults.filter(r => !r.valid).length

console.log(`\nTotal patterns: ${patterns.length}`)
console.log(`Valid: ${validCount}`)
console.log(`Invalid: ${invalidCount}`)
console.log(`Total issues: ${totalIssues}`)

if (totalIssues === 0) {
  console.log('\n✅ All patterns pass validation!')
} else {
  console.log('\n❌ Validation failed - issues detected')
  process.exit(1)
}

/**
 * Validate SEQUENCE type pattern
 */
function validateSequencePattern(pattern, issues, warnings) {
  if (!pattern.operationSequence) {
    issues.push('SEQUENCE type missing operationSequence field')
    return
  }

  if (!Array.isArray(pattern.operationSequence)) {
    issues.push('operationSequence must be an array')
    return
  }

  if (pattern.operationSequence.length === 0) {
    issues.push('operationSequence is empty')
  }

  // Validate verbs in sequence
  pattern.operationSequence.forEach((verb, idx) => {
    if (!BASE_VERBS.includes(verb)) {
      issues.push(`Invalid verb in operationSequence[${idx}]: ${verb}`)
    }
  })

  // Check if it's actually a sequence (not just all same verb)
  const uniqueVerbs = new Set(pattern.operationSequence)
  if (uniqueVerbs.size === 1) {
    warnings.push('operationSequence contains only one unique verb')
  }
}

/**
 * Validate PARTITION type pattern
 */
function validatePartitionPattern(pattern, issues, warnings) {
  if (!pattern.operationPartition) {
    issues.push('PARTITION type missing operationPartition field')
    return
  }

  const partitionKeys = Object.keys(pattern.operationPartition)

  if (partitionKeys.length < 2) {
    issues.push('Partition must have at least 2 categories')
  }

  // Validate that partition actually divides the space
  const allVerbs = new Set()
  Object.values(pattern.operationPartition).forEach(value => {
    if (Array.isArray(value)) {
      value.forEach(v => allVerbs.add(v))
    } else if (typeof value === 'string') {
      // Extract verbs from string
      BASE_VERBS.forEach(verb => {
        if (value.toUpperCase().includes(verb)) {
          allVerbs.add(verb)
        }
      })
    }
  })

  if (allVerbs.size === 0) {
    warnings.push('Could not extract verb references from partition')
  }
}

/**
 * Validate MAPPING type pattern
 */
function validateMappingPattern(pattern, issues, warnings) {
  if (!pattern.operationMapping) {
    issues.push('MAPPING type missing operationMapping field')
    return
  }

  // Check if all base verbs are mapped
  const mappedVerbs = Object.keys(pattern.operationMapping).filter(key =>
    BASE_VERBS.includes(key)
  )

  if (mappedVerbs.length !== 4) {
    warnings.push(`Mapping covers ${mappedVerbs.length}/4 base verbs`)
  }

  // Validate categories are distinct
  const categories = Object.values(pattern.operationMapping)
  const uniqueCategories = new Set(categories)

  if (uniqueCategories.size < categories.length) {
    warnings.push('Some category labels are duplicated')
  }
}

/**
 * Validate RHYTHM type pattern
 */
function validateRhythmPattern(pattern, issues, warnings) {
  // RHYTHM patterns should have both sequence and partition aspects
  if (!pattern.operationSequence && !pattern.operationPartition) {
    warnings.push('RHYTHM type should have operationSequence and/or operationPartition')
  }

  // Check for oscillation/alternation structure
  if (pattern.operationPartition) {
    const partitionKeys = Object.keys(pattern.operationPartition)
    if (partitionKeys.length !== 2) {
      warnings.push('RHYTHM patterns typically partition into 2 alternating phases')
    }
  }
}

/**
 * Validate MIXED type pattern
 */
function validateMixedPattern(pattern, issues, warnings) {
  // MIXED patterns should have multiple derived structures
  const hasSequence = !!pattern.operationSequence
  const hasPartition = !!pattern.operationPartition
  const hasMapping = !!pattern.operationMapping

  const structureCount = [hasSequence, hasPartition, hasMapping].filter(Boolean).length

  if (structureCount < 2) {
    warnings.push('MIXED type should exhibit at least 2 different structural patterns')
  }
}

/**
 * Validate operation key references
 */
function validateOperationReferences(pattern, validOperationKeys, issues, warnings) {
  // Check if pattern references any operation keys in its data
  const patternText = JSON.stringify(pattern)

  // Extract potential operation key references
  const potentialKeys = patternText.match(/[A-Z]+-[A-Z]+/g) || []

  potentialKeys.forEach(key => {
    if (OPERATION_KEY_REGEX.test(key)) {
      if (!validOperationKeys.includes(key)) {
        issues.push(`References invalid operation key: ${key}`)
      }
    }
  })
}

export { validationResults }
