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
    derivation: {
      confidence: classification.confidence,
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

  console.log(`✓ Pattern #${pattern.id}: ${pattern.title} -> ${classification.type}`)

  return enriched
})

// Write updated patterns back to file
const updatedData = {
  ...patternsData,
  patterns: enrichedPatterns,
  _metadata: {
    lastUpdated: new Date().toISOString(),
    classificationVersion: '1.0.0',
    note: 'Type classifications are computationally derived from structural signals'
  }
}

writeFileSync(
  patternsPath,
  JSON.stringify(updatedData, null, 2) + '\n',
  'utf-8'
)

console.log('\n✅ patterns.json updated successfully!')
console.log(`   ${enrichedPatterns.length} patterns enriched with type data`)
