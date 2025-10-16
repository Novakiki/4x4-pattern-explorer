import { useState } from 'react'

export default function AxisSelector({ axes, selectedAxis, onAxisChange }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
      <label className="block text-sm font-medium text-stone-700 mb-3">
        Choose Your Axis
      </label>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-stone-50 border-2 border-stone-300 rounded-lg hover:border-stone-400 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="text-left">
              <div className="font-semibold text-stone-900">{selectedAxis.name}</div>
              <div className="text-sm text-stone-600">{selectedAxis.description}</div>
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
            {axes.map((axis) => (
              <button
                key={axis.id}
                onClick={() => {
                  onAxisChange(axis)
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-b-0 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-stone-900">{axis.name}</div>
                  <div className="text-sm text-stone-600 line-clamp-1">{axis.description}</div>
                </div>
                {axis.id === selectedAxis.id && (
                  <svg className="w-5 h-5 text-stone-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-stone-600">
        Each axis reveals a different polarity within the pattern.
        Choose how you want to orient the dimension.
      </p>
    </div>
  )
}
