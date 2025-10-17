/**
 * @typedef {Object} BoundaryCard
 * @property {string} id
 * @property {string} verb
 * @property {string} mode
 * @property {{ title: string, intro: string, subtitle: string }} meta
 * @property {Array<Object>} sections
 * @property {{ afterHours: number, prompt: string, options: Array<{ value: string, label: string }>, notePlaceholder: string, suggestions?: Record<string, string> }} checkIn
 * @property {{ trackPermeabilityChanges: boolean, trackPlacementChanges: boolean }} timeline
 * @property {{ autoLog: boolean, fields: string[] }} journalEntry
 */

/** @type {Record<string, BoundaryCard>} */
export const boundaryCards = {
  'WITNESS-BOUNDARY': {
    id: 'witness-boundary',
    verb: 'WITNESS',
    mode: 'BOUNDARY',
    meta: {
      title: 'Witness · Boundary',
      intro: 'This is where seeing becomes believing.',
      subtitle: 'Map what you hold, where it came from, and how open it is.'
    },
    sections: [
      {
        id: 'belief-capture',
        type: 'textEntry',
        title: 'Write the sentence you’re currently living by.',
        placeholder: 'I should always be strong.',
        helper: 'It doesn’t have to be true—just honest.',
        suggestions: [
          'People are watching me.',
          'If I slow down, I’ll fall behind.',
          'God only speaks to certain people.',
          'I’m responsible for everyone’s feelings.'
        ],
        actions: [{ id: 'save-belief', label: 'Save belief' }]
      },
      {
        id: 'origin-tags',
        type: 'multiSelect',
        title: 'Where did this belief come from?',
        options: [
          {
            value: 'family',
            label: 'Family',
            coach: 'Whose voice do you hear when this belief speaks?'
          },
          {
            value: 'church',
            label: 'Church',
            coach: 'Which teaching or moment do you remember?'
          },
          {
            value: 'personal_experience',
            label: 'Personal Experience',
            coach: 'What happened that taught you this?'
          },
          {
            value: 'scripture',
            label: 'Scripture / Teaching',
            coach: 'What passage or talk shaped this?'
          },
          {
            value: 'culture',
            label: 'Culture / Internet',
            coach: 'Where do you hear this message most?'
          },
          {
            value: 'revelation',
            label: 'Revelation / Prayer',
            coach: 'How did it come—impression, warmth, words?'
          },
          {
            value: 'unknown',
            label: 'Not sure',
            coach: 'It’s okay not to know yet.'
          }
        ],
        actions: [{ id: 'set-origin', label: 'Set origin' }]
      },
      {
        id: 'permeability',
        type: 'singleSelect',
        title: 'How does this belief meet the world?',
        options: [
          {
            value: 'rigid',
            label: 'Rigid · Supportive wall',
            description: 'Holds me steady.',
            coach: 'What truth are you protecting?'
          },
          {
            value: 'semi_permeable',
            label: 'Semi-permeable · Living membrane',
            description: 'Lets me learn.',
            coach: 'What do you allow in to test it?'
          },
          {
            value: 'slippery',
            label: 'Slippery · Protective coating',
            description: 'Lets junk slide off.',
            coach: 'What doesn’t deserve a home in you?'
          }
        ],
        ui: { animation: 'membraneEdge' },
        actions: [{ id: 'set-permeability', label: 'Set permeability' }]
      },
      {
        id: 'function-check',
        type: 'singleSelectWithOptionalRewrite',
        title: 'In this season, is this belief mostly…',
        options: [
          { value: 'guiding', label: 'Guiding', description: 'Points me toward good.' },
          { value: 'guarding', label: 'Guarding', description: 'Keeps me from harm.' },
          { value: 'gripping', label: 'Gripping', description: 'Holding me back.' }
        ],
        rewritePrompt: 'What would a truer or kinder version sound like?',
        rewritePlaceholder: 'I can ask for help and still be strong.',
        actions: [
          { id: 'keep-original', label: 'Keep original' },
          { id: 'adopt-rewrite', label: 'Adopt rewrite' }
        ]
      },
      {
        id: 'placement',
        type: 'slider',
        title: 'Where does it live in you right now?',
        description: 'Core = identity; Edge = under review.',
        minLabel: 'Edge',
        maxLabel: 'Core',
        actions: [{ id: 'save-placement', label: 'Save placement' }]
      },
      {
        id: 'experiment',
        type: 'conditionalField',
        title: 'Try a 24-hour experiment.',
        variants: {
          rigid: {
            prompt: 'Name one situation where this can stay strong and kind.',
            placeholder: 'When ______ happens, I’ll hold the belief and listen for new light.'
          },
          semi_permeable: {
            prompt: 'Invite one new data point.',
            placeholder: 'I’ll ask ______ for their view and write what I learn.'
          },
          slippery: {
            prompt: 'Let one thing slide.',
            placeholder: 'When ______ shows up, I’ll breathe and let it pass.'
          }
        },
        reminderToggle: { label: 'Remind me tomorrow to check in.' },
        actions: [{ id: 'set-experiment', label: 'Set experiment' }]
      },
      {
        id: 'stillness',
        type: 'breathPractice',
        title: 'Just look—no label.',
        instructions: 'Notice how you feel when you don’t defend it.',
        cycles: 3,
        actions: [{ id: 'stillness-done', label: 'Done' }]
      },
      {
        id: 'summary',
        type: 'recap',
        title: 'Beliefs can breathe. You’re allowed to grow.',
        fields: [
          { key: 'belief_text', label: 'Belief' },
          { key: 'rewrite_text', label: 'Rewrite' },
          { key: 'origins', label: 'Origins' },
          { key: 'permeability', label: 'Permeability' },
          { key: 'function_now', label: 'Function' },
          { key: 'placement', label: 'Placement' },
          { key: 'experiment', label: 'Experiment' }
        ],
        actions: [
          { id: 'edit', label: 'Edit' },
          { id: 'duplicate', label: 'Duplicate' },
          { id: 'archive', label: 'Archive' }
        ],
        footer: '“Prove all things; hold fast that which is good.” — 1 Thessalonians 5:21'
      }
    ],
    checkIn: {
      afterHours: 24,
      prompt: 'How did your belief meet the world today?',
      options: [
        { value: 'held_steady', label: 'Held steady' },
        { value: 'learned', label: 'Learned something new' },
        { value: 'let_slide', label: 'Let something slide' },
        { value: 'deciding', label: 'Still deciding' }
      ],
      notePlaceholder: 'Add one sentence.',
      suggestions: {
        onLearned: 'Want to nudge permeability toward Semi-permeable?'
      }
    },
    timeline: {
      trackPermeabilityChanges: true,
      trackPlacementChanges: true
    },
    journalEntry: {
      autoLog: true,
      fields: [
        'belief_text',
        'rewrite_text',
        'origins',
        'permeability',
        'function_now',
        'placement',
        'experiment'
      ]
    }
  }
}
