/**
 * Pattern Classification Runner
 *
 * Runs the pattern classifier on all patterns and generates a detailed report.
 * This script validates the derivation rules and identifies patterns requiring review.
 *
 * Usage: node src/data/runPatternClassifier.js
 */

import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { classifyAllPatterns, generateReport } from './patternClassifier.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load patterns
const patternsPath = join(__dirname, 'patterns.json')
const patternsData = JSON.parse(readFileSync(patternsPath, 'utf-8'))
const patterns = patternsData.patterns

// Run classification
console.log('🔍 Running Pattern Classifier...\n')
console.log('=' .repeat(80))

const classifications = classifyAllPatterns(patterns)
const report = generateReport(classifications)

// Display summary
console.log('\n📊 CLASSIFICATION SUMMARY')
console.log('=' .repeat(80))
console.log(`Total patterns analyzed: ${report.summary.total}`)
console.log('\nBy Type:')
Object.entries(report.summary.byType).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`)
})
console.log('\nBy Confidence:')
Object.entries(report.summary.byConfidence).forEach(([confidence, count]) => {
  console.log(`  ${confidence}: ${count}`)
})

// Display individual classifications
console.log('\n\n📋 DETAILED CLASSIFICATIONS')
console.log('=' .repeat(80))

classifications.forEach(classification => {
  console.log(`\n#${classification.id}: ${classification.title}`)
  console.log(`  Type: ${classification.type}`)
  console.log(`  Confidence: ${classification.confidence}`)
  console.log(`  Signals: ${classification.signals.length > 0 ? classification.signals.join(', ') : 'None'}`)

  if (classification.ambiguities.length > 0) {
    console.log(`  ⚠️  Ambiguities:`)
    classification.ambiguities.forEach(amb => {
      console.log(`    - ${amb}`)
    })
  }

  if (classification.derivedData) {
    const dataKeys = Object.keys(classification.derivedData)
    if (dataKeys.length > 0) {
      console.log(`  Derived data: ${dataKeys.join(', ')}`)
    }
  }
})

// Display patterns requiring review
if (report.ambiguousPatterns.length > 0) {
  console.log('\n\n⚠️  PATTERNS REQUIRING HUMAN REVIEW')
  console.log('=' .repeat(80))

  report.ambiguousPatterns.forEach(pattern => {
    console.log(`\n#${pattern.id}: ${pattern.title}`)
    console.log(`  Type: ${pattern.type} (Confidence: ${pattern.confidence})`)
    console.log(`  Issues:`)
    pattern.ambiguities.forEach(amb => {
      console.log(`    - ${amb}`)
    })
  })
} else {
  console.log('\n\n✅ All patterns classified with high confidence!')
}

// Export results for programmatic use
console.log('\n\n💾 Classification results available for export')
console.log('=' .repeat(80))

export { classifications, report }
