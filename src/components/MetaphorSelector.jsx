import { useState } from 'react'

const observationOrientations = [
  { id: 'default', name: 'MM4 Ward (Original)', description: 'Original mission actions' },
  { id: 'inward-outward', name: 'Inward | Outward', description: 'Observe within and without' },
  { id: 'self-other', name: 'Self | Other', description: 'Observe your center and their world' },
  { id: 'visible-hidden', name: 'Visible | Hidden', description: 'Observe what shows and what hides' },
  { id: 'close-distant', name: 'Close | Distant', description: 'Observe near and far' },
  { id: 'part-whole', name: 'Part | Whole', description: 'Observe the one and the many' },
  { id: 'seed-fruit', name: 'Seed | Fruit', description: 'Observe becoming and arrived' },
  { id: 'root-branch', name: 'Root | Branch', description: 'Observe foundation and expression' },
  { id: 'rhythm-flow', name: 'Rhythm | Flow', description: 'Observe pattern and movement' },
  { id: 'still-moving', name: 'Still | Moving', description: 'Observe rest and action' },
  { id: 'receiving-giving', name: 'Receiving | Giving', description: 'Observe taking in and offering out' },
  { id: 'knowing-wondering', name: 'Knowing | Wondering', description: 'Observe certainty and curiosity' },
  { id: 'form-essence', name: 'Form | Essence', description: 'Observe structure and spirit' }
]

export default function MetaphorSelector({ selectedMetaphor, onMetaphorChange }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-stone-100 border border-stone-300 rounded-lg hover:border-stone-400 transition-colors text-sm"
        >
          <div className="text-left">
            <div className="font-semibold text-stone-900">{selectedMetaphor.name}</div>
          </div>
          <svg
            className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-stone-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {observationOrientations.map((metaphor) => (
              <button
                key={metaphor.id}
                onClick={() => {
                  onMetaphorChange(metaphor)
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-b-0 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-stone-900 text-sm">{metaphor.name}</div>
                </div>
                {metaphor.id === selectedMetaphor.id && (
                  <svg className="w-4 h-4 text-stone-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
