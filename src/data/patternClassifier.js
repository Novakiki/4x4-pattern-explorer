/**
 * Pattern Classifier - Derives pattern types from structural signals
 *
 * This module implements the rule-first approach to pattern classification,
 * ensuring LLM cognitive consistency by making pattern types computationally
 * derivable rather than manually assigned.
 *
 * @module patternClassifier
 */

import {
  BASE_VERBS,
  CATEGORY_KEYWORDS,
  CONFIDENCE_LEVELS,
  DETECTION_SIGNALS,
  PATTERN_CATEGORIES,
  PATTERN_TYPES,
  TYPE_KEYWORDS
} from './patternTypes.js'

/**
 * Classifies a single pattern based on structural signals
 * @param {Object} pattern - Pattern object from patterns.json
 * @returns {Object} Classification result with type, confidence, signals, ambiguities, and category
 */
export function classifyPattern(pattern) {
  const signals = detectSignals(pattern)
  const type = determineType(signals)
  const confidence = calculateConfidence(signals, type)
  const ambiguities = findAmbiguities(signals, type)
  const categoryResult = deriveCategory(pattern, type, signals)

  return {
    id: pattern.id,
    title: pattern.title,
    type,
    category: categoryResult.category,
    categoryConfidence: categoryResult.confidence,
    confidence,
    signals,
    ambiguities,
    derivedData: derivePatternData(pattern, type, signals)
  }
}

/**
 * Detects structural signals in a pattern
 * @param {Object} pattern - Pattern object
 * @returns {Array<string>} Detected signal identifiers
 */
function detectSignals(pattern) {
  const signals = []
  const textToAnalyze = [
    pattern.title,
    pattern.subtitle,
    pattern.description,
    pattern.whyItMatters,
    JSON.stringify(pattern.mapping)
  ].join(' ').toLowerCase()

  // Check for SEQUENCE signals
  if (hasExplicitSteps(pattern.mapping)) {
    signals.push(DETECTION_SIGNALS.EXPLICIT_STEPS)
  }

  if (hasTemporalLanguage(textToAnalyze)) {
    signals.push(DETECTION_SIGNALS.TEMPORAL_LANGUAGE)
  }

  if (hasCyclePattern(textToAnalyze, pattern.mapping)) {
    signals.push(DETECTION_SIGNALS.CYCLE_PATTERN)
  }

  if (hasSequentialVerbs(pattern.mapping)) {
    signals.push(DETECTION_SIGNALS.SEQUENTIAL_VERBS)
  }

  // Check for PARTITION signals
  if (hasAxisLanguage(textToAnalyze)) {
    signals.push(DETECTION_SIGNALS.AXIS_LANGUAGE)
  }

  if (hasDichotomy(textToAnalyze, pattern.mapping)) {
    signals.push(DETECTION_SIGNALS.DICHOTOMY)
  }

  if (hasComplementaryPairs(pattern.mapping)) {
    signals.push(DETECTION_SIGNALS.COMPLEMENTARY_PAIRS)
  }

  // Check for MAPPING signals
  if (hasFourVerbMapping(pattern.mapping)) {
    signals.push(DETECTION_SIGNALS.FOUR_VERB_MAPPING)
  }

  if (hasCategoricalLabels(pattern.mapping)) {
    signals.push(DETECTION_SIGNALS.CATEGORICAL_LABELS)
  }

  if (hasExternalFramework(textToAnalyze, pattern)) {
    signals.push(DETECTION_SIGNALS.EXTERNAL_FRAMEWORK)
  }

  return signals
}

/**
 * Check if pattern mapping has explicit step markers
 */
function hasExplicitSteps(mapping) {
  if (!mapping) return false
  const keys = Object.keys(mapping)
  return keys.some(key => /step\d+/i.test(key))
}

/**
 * Check for temporal/sequential language
 * Uses word boundaries to avoid false positives (e.g., "stepping" vs "step")
 */
function hasTemporalLanguage(text) {
  const keywords = TYPE_KEYWORDS.sequence
  return keywords.some(keyword => {
    // Use word boundary regex to match whole words only
    const regex = new RegExp(`\\b${keyword}\\b`, 'i')
    return regex.test(text)
  })
}

/**
 * Check for cycle/rhythm patterns
 */
function hasCyclePattern(text, mapping) {
  const cycleWords = ['cycle', 'rhythm', 'breath', 'alternates', 'repeats']
  return cycleWords.some(word => text.includes(word))
}

/**
 * Check if mapping contains sequential verb references
 */
function hasSequentialVerbs(mapping) {
  if (!mapping) return false
  const values = Object.values(mapping).join(' ')
  // Check if multiple base verbs appear in sequential context
  const verbMatches = BASE_VERBS.filter(verb =>
    values.toUpperCase().includes(verb)
  )
  return verbMatches.length >= 3
}

/**
 * Check for axis/cross/spatial language
 */
function hasAxisLanguage(text) {
  const keywords = TYPE_KEYWORDS.partition
  return keywords.some(keyword => text.includes(keyword))
}

/**
 * Check for dichotomous/binary structure
 */
function hasDichotomy(text, mapping) {
  if (!mapping) return false

  // Check for exactly 2 categories that cover all 4 verbs
  const keys = Object.keys(mapping)
  if (keys.length === 2) {
    const dichotomyWords = ['opposite', 'contrast', 'between', 'alternate']
    return dichotomyWords.some(word => text.includes(word))
  }

  return false
}

/**
 * Check for complementary pairing structure
 */
function hasComplementaryPairs(mapping) {
  if (!mapping) return false
  const keys = Object.keys(mapping)

  // Look for paired structure (e.g., horizontal/vertical, active/receptive)
  if (keys.length === 2) {
    return true
  }

  return false
}

/**
 * Check if pattern maps all four base verbs
 */
function hasFourVerbMapping(mapping) {
  if (!mapping) return false
  const keys = Object.keys(mapping)

  // Check if mapping has entries for all 4 base verbs (case-insensitive)
  const verbKeys = keys.filter(key =>
    BASE_VERBS.some(verb => key.toLowerCase() === verb.toLowerCase())
  )

  return verbKeys.length === 4
}

/**
 * Check for categorical label structure
 */
function hasCategoricalLabels(mapping) {
  if (!mapping) return false
  const keys = Object.keys(mapping)

  // Mapping with 4 distinct categorical keys (not steps, not pairs)
  return keys.length === 4 && !hasExplicitSteps(mapping) && !hasComplementaryPairs(mapping)
}

/**
 * Check for external framework overlay
 */
function hasExternalFramework(text, pattern) {
  // Patterns that explicitly reference external systems
  const externalSystems = [
    'jung', 'psychological', 'epistemo', 'relationship',
    'function', 'dimension', 'threshold', 'position'
  ]

  return externalSystems.some(system => text.includes(system))
}

/**
 * Determine primary pattern type from signals
 */
function determineType(signals) {
  const sequenceScore = signals.filter(s =>
    [DETECTION_SIGNALS.EXPLICIT_STEPS,
     DETECTION_SIGNALS.TEMPORAL_LANGUAGE,
     DETECTION_SIGNALS.CYCLE_PATTERN,
     DETECTION_SIGNALS.SEQUENTIAL_VERBS].includes(s)
  ).length

  const partitionScore = signals.filter(s =>
    [DETECTION_SIGNALS.AXIS_LANGUAGE,
     DETECTION_SIGNALS.DICHOTOMY,
     DETECTION_SIGNALS.COMPLEMENTARY_PAIRS,
     DETECTION_SIGNALS.SPATIAL_SPLIT].includes(s)
  ).length

  const mappingScore = signals.filter(s =>
    [DETECTION_SIGNALS.CATEGORICAL_LABELS,
     DETECTION_SIGNALS.EXTERNAL_FRAMEWORK,
     DETECTION_SIGNALS.FOUR_VERB_MAPPING].includes(s)
  ).length

  // If multiple types score highly, flag as MIXED
  const scores = [
    { type: PATTERN_TYPES.SEQUENCE, score: sequenceScore },
    { type: PATTERN_TYPES.PARTITION, score: partitionScore },
    { type: PATTERN_TYPES.MAPPING, score: mappingScore }
  ].sort((a, b) => b.score - a.score)

  // MIXED if top two scores are equal and non-zero
  if (scores[0].score > 0 && scores[0].score === scores[1].score) {
    return PATTERN_TYPES.MIXED
  }

  // Otherwise return highest scoring type, or MAPPING as default
  return scores[0].score > 0 ? scores[0].type : PATTERN_TYPES.MAPPING
}

/**
 * Calculate confidence level based on signal clarity
 */
function calculateConfidence(signals, type) {
  const relevantSignals = signals.filter(signal => {
    if (type === PATTERN_TYPES.SEQUENCE) {
      return [DETECTION_SIGNALS.EXPLICIT_STEPS,
              DETECTION_SIGNALS.TEMPORAL_LANGUAGE,
              DETECTION_SIGNALS.CYCLE_PATTERN,
              DETECTION_SIGNALS.SEQUENTIAL_VERBS].includes(signal)
    } else if (type === PATTERN_TYPES.PARTITION) {
      return [DETECTION_SIGNALS.AXIS_LANGUAGE,
              DETECTION_SIGNALS.DICHOTOMY,
              DETECTION_SIGNALS.COMPLEMENTARY_PAIRS].includes(signal)
    } else if (type === PATTERN_TYPES.MAPPING) {
      return [DETECTION_SIGNALS.CATEGORICAL_LABELS,
              DETECTION_SIGNALS.FOUR_VERB_MAPPING,
              DETECTION_SIGNALS.EXTERNAL_FRAMEWORK].includes(signal)
    }
    return false
  })

  if (type === PATTERN_TYPES.MIXED) return CONFIDENCE_LEVELS.MEDIUM
  if (relevantSignals.length >= 3) return CONFIDENCE_LEVELS.HIGH
  if (relevantSignals.length >= 2) return CONFIDENCE_LEVELS.MEDIUM
  return CONFIDENCE_LEVELS.LOW
}

/**
 * Find ambiguities in classification
 */
function findAmbiguities(signals, type) {
  const ambiguities = []

  // Check for conflicting signals
  const hasSequenceSignals = signals.some(s =>
    [DETECTION_SIGNALS.EXPLICIT_STEPS,
     DETECTION_SIGNALS.TEMPORAL_LANGUAGE,
     DETECTION_SIGNALS.CYCLE_PATTERN].includes(s)
  )

  const hasPartitionSignals = signals.some(s =>
    [DETECTION_SIGNALS.AXIS_LANGUAGE,
     DETECTION_SIGNALS.DICHOTOMY,
     DETECTION_SIGNALS.COMPLEMENTARY_PAIRS].includes(s)
  )

  const hasMappingSignals = signals.some(s =>
    [DETECTION_SIGNALS.CATEGORICAL_LABELS,
     DETECTION_SIGNALS.FOUR_VERB_MAPPING,
     DETECTION_SIGNALS.EXTERNAL_FRAMEWORK].includes(s)
  )

  const signalTypes = [hasSequenceSignals, hasPartitionSignals, hasMappingSignals]
    .filter(Boolean).length

  if (signalTypes > 1) {
    ambiguities.push('Multiple pattern type signals detected')
  }

  if (signals.length === 0) {
    ambiguities.push('No clear structural signals detected')
  }

  if (type === PATTERN_TYPES.MIXED) {
    ambiguities.push('Pattern exhibits characteristics of multiple types')
  }

  return ambiguities
}

/**
 * Derive pattern category (STRUCTURAL vs COMPLETENESS) based on signals
 * Uses hybrid auto-detection with manual override capability
 * @param {Object} pattern - Pattern object
 * @param {string} type - Pattern type (SEQUENCE, PARTITION, MAPPING, etc.)
 * @param {Array<string>} signals - Detected signals
 * @returns {Object} Category and confidence level
 */
function deriveCategory(pattern, type, signals) {
  const textToAnalyze = [
    pattern.title,
    pattern.subtitle,
    pattern.description,
    pattern.whyItMatters
  ].join(' ').toLowerCase()

  // STRUCTURAL signals
  const structuralSignals = [
    // Geometric language
    hasKeywords(textToAnalyze, CATEGORY_KEYWORDS.structural),
    // PARTITION types are inherently structural (they describe geometry)
    type === PATTERN_TYPES.PARTITION,
    // Axis/spatial split signals indicate geometry
    signals.includes(DETECTION_SIGNALS.AXIS_LANGUAGE),
    signals.includes(DETECTION_SIGNALS.SPATIAL_SPLIT),
    signals.includes(DETECTION_SIGNALS.DICHOTOMY),
    signals.includes(DETECTION_SIGNALS.COMPLEMENTARY_PAIRS)
  ].filter(Boolean).length

  // COMPLETENESS signals
  const completenessSignals = [
    // External framework references (Jung, epistemology, etc.)
    signals.includes(DETECTION_SIGNALS.EXTERNAL_FRAMEWORK),
    // Exhaustive/completeness language
    hasKeywords(textToAnalyze, CATEGORY_KEYWORDS.completeness),
    // Domain-specific terms
    hasDomainSpecificTerms(textToAnalyze),
    // MAPPING types often represent completeness arguments
    type === PATTERN_TYPES.MAPPING
  ].filter(Boolean).length

  // Calculate scores
  if (structuralSignals > completenessSignals) {
    return {
      category: PATTERN_CATEGORIES.STRUCTURAL,
      confidence: structuralSignals >= 3 ? CONFIDENCE_LEVELS.HIGH : CONFIDENCE_LEVELS.MEDIUM
    }
  } else if (completenessSignals > structuralSignals) {
    return {
      category: PATTERN_CATEGORIES.COMPLETENESS,
      confidence: completenessSignals >= 3 ? CONFIDENCE_LEVELS.HIGH : CONFIDENCE_LEVELS.MEDIUM
    }
  } else {
    // Equal scores - flag for manual review
    return {
      category: null,
      confidence: 'MANUAL_REVIEW_REQUIRED'
    }
  }
}

/**
 * Check if text contains keywords from a list
 * @param {string} text - Text to analyze
 * @param {Array<string>} keywords - Keywords to search for
 * @returns {boolean} True if any keyword found
 */
function hasKeywords(text, keywords) {
  return keywords.some(keyword => {
    const regex = new RegExp(`\\b${keyword}`, 'i')
    return regex.test(text)
  })
}

/**
 * Check for domain-specific terminology indicating completeness arguments
 * @param {string} text - Text to analyze
 * @returns {boolean} True if domain-specific terms found
 */
function hasDomainSpecificTerms(text) {
  const domains = [
    'jung', 'psychological', 'epistemo', 'relationship',
    'time', 'temporal', 'discovery', 'scientific',
    'breath', 'physiolog', 'contemplation'
  ]
  return domains.some(domain => text.includes(domain))
}

/**
 * Derive pattern-specific data based on type
 * For MIXED patterns, derives all applicable structures
 */
function derivePatternData(pattern, type, signals) {
  const data = {}

  // For MIXED patterns, check which structures are actually present
  const hasSequenceSignals = type === PATTERN_TYPES.MIXED && signals.some(s =>
    [DETECTION_SIGNALS.EXPLICIT_STEPS,
     DETECTION_SIGNALS.TEMPORAL_LANGUAGE,
     DETECTION_SIGNALS.CYCLE_PATTERN].includes(s)
  )

  const hasPartitionSignals = type === PATTERN_TYPES.MIXED && signals.some(s =>
    [DETECTION_SIGNALS.AXIS_LANGUAGE,
     DETECTION_SIGNALS.DICHOTOMY,
     DETECTION_SIGNALS.COMPLEMENTARY_PAIRS].includes(s)
  )

  const hasMappingSignals = type === PATTERN_TYPES.MIXED && signals.some(s =>
    [DETECTION_SIGNALS.FOUR_VERB_MAPPING,
     DETECTION_SIGNALS.CATEGORICAL_LABELS].includes(s)
  )

  // Derive structures based on type or signals
  if (type === PATTERN_TYPES.SEQUENCE || hasSequenceSignals) {
    const sequence = deriveOperationSequence(pattern)
    if (sequence) {
      data.operationSequence = sequence
    }
  }

  if (type === PATTERN_TYPES.PARTITION || hasPartitionSignals) {
    const partition = deriveOperationPartition(pattern)
    if (partition) {
      data.operationPartition = partition
    }
  }

  if (type === PATTERN_TYPES.MAPPING || hasMappingSignals) {
    const mapping = deriveOperationMapping(pattern)
    if (mapping) {
      data.operationMapping = mapping
    }
  }

  return data
}

/**
 * Derive operation sequence for SEQUENCE type patterns
 */
function deriveOperationSequence(pattern) {
  const mapping = pattern.mapping
  if (!mapping) return null

  // Look for explicit step ordering
  const stepKeys = Object.keys(mapping)
    .filter(key => /step\d+/i.test(key))
    .sort()

  if (stepKeys.length > 0) {
    // Extract verbs from step descriptions
    return stepKeys.map(key => {
      const value = mapping[key].toUpperCase()
      // Try to match operation names or base verbs
      for (const verb of BASE_VERBS) {
        if (value.includes(verb)) {
          return verb
        }
      }
      return null
    }).filter(Boolean)
  }

  // Fallback: check if mapping keys are the base verbs in order
  const orderedVerbs = BASE_VERBS.filter(verb =>
    Object.keys(mapping).some(key => key.toLowerCase() === verb.toLowerCase())
  )

  if (orderedVerbs.length > 0) {
    return orderedVerbs
  }

  // Fallback 2: For fractal/scale patterns, extract sequence from pattern text
  // Check ldsExample, description, and mapping values for verb sequences
  const textSources = [
    pattern.ldsExample || '',
    pattern.description || '',
    pattern.whyItMatters || '',
    ...Object.values(mapping)
  ].join(' ')

  const verbSequence = []

  // Try to find verbs in order by looking for them in the combined text
  for (const verb of BASE_VERBS) {
    const regex = new RegExp(verb, 'i')
    if (regex.test(textSources)) {
      // Find first occurrence position
      const match = textSources.match(regex)
      if (match) {
        verbSequence.push({ verb, position: match.index })
      }
    }
  }

  // Sort by position and return just the verbs
  if (verbSequence.length >= 3) {
    return verbSequence
      .sort((a, b) => a.position - b.position)
      .map(v => v.verb)
  }

  return null
}

/**
 * Derive operation partition for PARTITION type patterns
 */
function deriveOperationPartition(pattern) {
  const mapping = pattern.mapping
  if (!mapping) return null

  const keys = Object.keys(mapping)
  if (keys.length === 2) {
    // Binary partition
    return {
      [keys[0]]: extractVerbs(mapping[keys[0]]),
      [keys[1]]: extractVerbs(mapping[keys[1]])
    }
  }

  return mapping
}

/**
 * Derive operation mapping for MAPPING type patterns
 */
function deriveOperationMapping(pattern) {
  const mapping = pattern.mapping
  if (!mapping) return null

  // For mapping types, the structure is typically verb -> category
  const verbMapping = {}

  for (const verb of BASE_VERBS) {
    const key = Object.keys(mapping).find(k =>
      k.toLowerCase() === verb.toLowerCase()
    )
    if (key) {
      verbMapping[verb] = mapping[key]
    }
  }

  return Object.keys(verbMapping).length > 0 ? verbMapping : mapping
}

/**
 * Extract base verbs from text
 */
function extractVerbs(text) {
  const upperText = text.toUpperCase()
  return BASE_VERBS.filter(verb => upperText.includes(verb))
}

/**
 * Classify all patterns
 * @param {Array} patterns - Array of pattern objects
 * @returns {Array} Array of classification results
 */
export function classifyAllPatterns(patterns) {
  return patterns.map(classifyPattern)
}

/**
 * Generate classification report
 * @param {Array} classifications - Array of classification results
 * @returns {Object} Summary report
 */
export function generateReport(classifications) {
  const typeCounts = {
    [PATTERN_TYPES.SEQUENCE]: 0,
    [PATTERN_TYPES.PARTITION]: 0,
    [PATTERN_TYPES.MAPPING]: 0,
    [PATTERN_TYPES.MIXED]: 0
  }

  const confidenceCounts = {
    [CONFIDENCE_LEVELS.HIGH]: 0,
    [CONFIDENCE_LEVELS.MEDIUM]: 0,
    [CONFIDENCE_LEVELS.LOW]: 0
  }

  const ambiguousPatterns = []

  classifications.forEach(classification => {
    typeCounts[classification.type]++
    confidenceCounts[classification.confidence]++

    if (classification.ambiguities.length > 0 ||
        classification.confidence === CONFIDENCE_LEVELS.LOW) {
      ambiguousPatterns.push({
        id: classification.id,
        title: classification.title,
        type: classification.type,
        confidence: classification.confidence,
        ambiguities: classification.ambiguities
      })
    }
  })

  return {
    summary: {
      total: classifications.length,
      byType: typeCounts,
      byConfidence: confidenceCounts
    },
    ambiguousPatterns,
    classifications
  }
}
