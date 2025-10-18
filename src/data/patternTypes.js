/**
 * Pattern Type System - Type Definitions and Constants
 *
 * Defines the three fundamental pattern types that emerge from the 4×4 matrix structure:
 * - SEQUENCE: Temporal progression through operations
 * - PARTITION: Structural division of the operation space
 * - MAPPING: Categorical overlay onto the four base verbs
 *
 * @module patternTypes
 */

/**
 * Pattern type constants
 */
export const PATTERN_TYPES = {
  SEQUENCE: 'SEQUENCE',
  PARTITION: 'PARTITION',
  MAPPING: 'MAPPING',
  MIXED: 'MIXED'
}

/**
 * Confidence levels for pattern classification
 */
export const CONFIDENCE_LEVELS = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
}

/**
 * Detection signals for pattern classification
 */
export const DETECTION_SIGNALS = {
  // SEQUENCE signals
  EXPLICIT_STEPS: 'explicit_steps',
  TEMPORAL_LANGUAGE: 'temporal_language',
  SEQUENTIAL_VERBS: 'sequential_verbs',
  CYCLE_PATTERN: 'cycle_pattern',

  // PARTITION signals
  AXIS_LANGUAGE: 'axis_language',
  DICHOTOMY: 'dichotomy',
  COMPLEMENTARY_PAIRS: 'complementary_pairs',
  SPATIAL_SPLIT: 'spatial_split',

  // MAPPING signals
  CATEGORICAL_LABELS: 'categorical_labels',
  EXTERNAL_FRAMEWORK: 'external_framework',
  FOUR_VERB_MAPPING: 'four_verb_mapping',
  NO_TEMPORAL_STRUCTURE: 'no_temporal_structure'
}

/**
 * Keywords that indicate pattern types
 */
export const TYPE_KEYWORDS = {
  sequence: [
    'step', 'cycle', 'rhythm', 'phases', 'breath', 'then',
    'progression', 'transformation', 'growth', 'development',
    'first', 'second', 'third', 'fourth', 'next', 'follows'
  ],
  partition: [
    'axis', 'horizontal', 'vertical', 'cross', 'dichotomy',
    'opposite', 'complementary', 'contrast', 'balance',
    'alternate', 'between', 'split', 'divide', 'half'
  ],
  mapping: [
    'each', 'represents', 'dimension', 'type', 'way',
    'knowing', 'function', 'relationship', 'position'
  ]
}

/**
 * The four base verbs of the matrix
 */
export const BASE_VERBS = ['OBSERVE', 'ASK', 'REMEMBER', 'IMAGINE']

/**
 * Operation key format: VERB-VERB (e.g., "OBSERVE-OBSERVE")
 */
export const OPERATION_KEY_REGEX = /^(OBSERVE|ASK|REMEMBER|IMAGINE)-(OBSERVE|ASK|REMEMBER|IMAGINE)$/
