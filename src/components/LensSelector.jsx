import { useState } from 'react'
import PropTypes from 'prop-types'

export default function LensSelector({ template, translations, selectedLens, onLensChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const allLenses = [template, ...translations]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
      <label className="block text-sm font-medium text-stone-700 mb-3">
        Choose Your Lens
      </label>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-stone-50 border-2 border-stone-300 rounded-lg hover:border-stone-400 transition-colors"
          style={{ borderColor: selectedLens.color }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedLens.color }}
            />
            <div className="text-left">
              <div className="font-semibold text-stone-900">{selectedLens.name}</div>
              <div className="text-sm text-stone-600">{selectedLens.description}</div>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-stone-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {/* Template */}
            <div className="px-3 py-2 bg-stone-50 border-b-2 border-stone-300">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">Template</div>
            </div>
            <button
              key={template.id}
              onClick={() => {
                onLensChange(template)
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors border-b border-stone-100 text-left"
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: template.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-stone-900">{template.name}</div>
                <div className="text-sm text-stone-600 line-clamp-1">{template.description}</div>
              </div>
              {template.id === selectedLens.id && (
                <svg className="w-5 h-5 text-stone-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* 12 Translations */}
            <div className="px-3 py-2 bg-stone-50 border-b-2 border-t-2 border-stone-300">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">12 Translations</div>
            </div>
            {translations.map((lens) => (
              <button
                key={lens.id}
                onClick={() => {
                  onLensChange(lens)
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-b-0 text-left"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lens.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-stone-900">{lens.name}</div>
                  <div className="text-sm text-stone-600 line-clamp-1">{lens.description}</div>
                </div>
                {lens.id === selectedLens.id && (
                  <svg className="w-5 h-5 text-stone-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedLens.id === 'lds' && (
        <div className="mt-4 pt-4 border-t border-stone-200">
          <h3 className="font-semibold text-stone-900 mb-2 text-sm">The Template & 12 Translations</h3>
          <p className="text-stone-600 text-xs leading-relaxed mb-2">
            President Nelson's teaching is the <strong>template</strong>—the original revelation containing the pattern.
          </p>
          <p className="text-stone-600 text-xs leading-relaxed">
            The <strong>12 translations</strong> express the same truth through different perspectives
            (psychological, ecological, mystical, etc.), like 12 tribes carrying the same DNA.
            Each translation helps different people recognize the universal structure through their own lens.
          </p>
        </div>
      )}
    </div>
  )
}

const lensShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  covenant: PropTypes.string.isRequired,
  gather: PropTypes.string.isRequired,
  veil: PropTypes.string.isRequired,
  highlightPatterns: PropTypes.arrayOf(PropTypes.number),
  isTemplate: PropTypes.bool
})

LensSelector.propTypes = {
  template: lensShape.isRequired,
  translations: PropTypes.arrayOf(lensShape).isRequired,
  selectedLens: lensShape.isRequired,
  onLensChange: PropTypes.func.isRequired
}
