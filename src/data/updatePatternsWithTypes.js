/**
 * Update patterns.json with derived type classifications
 *
 * This script takes the classification results and enriches patterns.json
 * with the derived type information while preserving all original data.
 *
 * Usage: node src/data/updatePatternsWithTypes.js
 */

import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { classifyAllPatterns } from './patternClassifier.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load patterns
const patternsPath = join(__dirname, 'patterns.json')
const patternsData = JSON.parse(readFileSync(patternsPath, 'utf-8'))
const patterns = patternsData.patterns

console.log('🔄 Updating patterns.json with type classifications...\n')

// Run classification
const classifications = classifyAllPatterns(patterns)

// Check if classifications actually changed
let hasChanges = false

// Merge classifications back into patterns
const enrichedPatterns = patterns.map(pattern => {
  const classification = classifications.find(c => c.id === pattern.id)

  if (!classification) {
    console.warn(`⚠️  No classification found for pattern #${pattern.id}`)
    return pattern
  }

  // Add derivation metadata
  const enriched = {
    ...pattern,
    type: classification.type,
    category: classification.category,
    derivation: {
      confidence: classification.confidence,
      categoryConfidence: classification.categoryConfidence,
      signals: classification.signals,
      ambiguities: classification.ambiguities
    }
  }

  // Add type-specific derived data
  if (classification.derivedData.operationSequence) {
    enriched.operationSequence = classification.derivedData.operationSequence
  }

  if (classification.derivedData.operationPartition) {
    enriched.operationPartition = classification.derivedData.operationPartition
  }

  if (classification.derivedData.operationMapping) {
    enriched.operationMapping = classification.derivedData.operationMapping
  }

  // Check if this pattern actually changed
  const originalJson = JSON.stringify({
    type: pattern.type,
    category: pattern.category,
    derivation: pattern.derivation,
    operationSequence: pattern.operationSequence,
    operationPartition: pattern.operationPartition,
    operationMapping: pattern.operationMapping
  })

  const enrichedJson = JSON.stringify({
    type: enriched.type,
    category: enriched.category,
    derivation: enriched.derivation,
    operationSequence: enriched.operationSequence,
    operationPartition: enriched.operationPartition,
    operationMapping: enriched.operationMapping
  })

  if (originalJson !== enrichedJson) {
    hasChanges = true
    const categoryLabel = classification.category || 'MANUAL_REVIEW_REQUIRED'
    console.log(`✓ Pattern #${pattern.id}: ${pattern.title} -> ${classification.type} (${categoryLabel})`)
  } else {
    console.log(`  Pattern #${pattern.id}: ${pattern.title} (unchanged)`)
  }

  return enriched
})

// Only write if there are actual changes
if (hasChanges) {
  // Write updated patterns back to file
  const updatedData = {
    ...patternsData,
    patterns: enrichedPatterns,
    _metadata: {
      lastUpdated: new Date().toISOString(),
      classificationVersion: '2.0.0',
      note: 'Type classifications and categories are computationally derived from structural signals',
      categories: {
        STRUCTURAL: 'Geometric properties inherent to the 4×4 matrix',
        COMPLETENESS: 'Proofs that the 4×4 maps exhaustive category systems'
      }
    }
  }

  writeFileSync(
    patternsPath,
    JSON.stringify(updatedData, null, 2) + '\n',
    'utf-8'
  )

  console.log('\n✅ patterns.json updated successfully!')
  console.log(`   ${enrichedPatterns.length} patterns enriched with type data`)
} else {
  console.log('\n✓ No changes detected - patterns.json unchanged')
  console.log('  All patterns already have current classifications')
}
