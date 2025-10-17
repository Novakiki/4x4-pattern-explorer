import { useState } from 'react'
import PropTypes from 'prop-types'

// Color scheme for the four types of inquiry
// Represents the journey from questioning → discovery → integration → transformation
const INQUIRY_COLORS = {
  observation: { dot: 'text-purple-400', text: 'text-purple-700' },  // Initial disruption, questioning
  question: { dot: 'text-indigo-400', text: 'text-indigo-700' },     // Going inward, discovery
  unity: { dot: 'text-teal-400', text: 'text-teal-700' },            // Integration, synthesis
  shift: { dot: 'text-amber-400', text: 'text-amber-700' }           // Transformation, illumination
}

export default function PlanView({ plan, selectedLens }) {
  const [showPerspectives, setShowPerspectives] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-4"
          style={{ backgroundColor: selectedLens.color }}
        >
          Viewing the matrix through the {selectedLens.name} lens
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
          MM4th Ward 4×4 Plan
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-3">
          Mission, Temple, Family History, & Invite
        </p>

        <div className="flex items-center justify-center gap-3 mt-2">
            <button
              onClick={() => setShowExplanation(true)}
              className="text-sm text-stone-600 font-medium hover:text-stone-900 transition-colors flex items-center gap-1"
            >
              Go deeper
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={() => setShowPerspectives(!showPerspectives)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 ${
                showPerspectives ? 'bg-stone-900' : 'bg-stone-300'
              }`}
              role="switch"
              aria-checked={showPerspectives}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showPerspectives ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

        {/* Explanation Modal/Toast */}
        {showExplanation && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowExplanation(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-stone-900">Go deeper</h3>
                  <button
                    onClick={() => setShowExplanation(false)}
                    className="text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-stone-700 mb-4 leading-relaxed">
                  Toggle on to reveal contemplative inquiries under each action—perspectives that shift you from doing the action to understanding the deeper pattern beneath it.
                </p>

                <p className="text-sm text-stone-700 mb-3 font-semibold">
                  The goal is to have each quadrant reveal:
                </p>
                <ul className="space-y-2 text-sm text-stone-600 mb-4">
                  <li className="flex gap-2">
                    <span className={INQUIRY_COLORS.observation.dot}>•</span>
                    <span><span className={`font-semibold ${INQUIRY_COLORS.observation.text}`}>Observation</span> - "Wait, it could be the opposite?"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className={INQUIRY_COLORS.question.dot}>•</span>
                    <span><span className={`font-semibold ${INQUIRY_COLORS.question.text}`}>Question</span> - "What's beneath what I thought?"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className={INQUIRY_COLORS.unity.dot}>•</span>
                    <span><span className={`font-semibold ${INQUIRY_COLORS.unity.text}`}>Unity</span> - "These aren't separate after all"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className={INQUIRY_COLORS.shift.dot}>•</span>
                    <span><span className={`font-semibold ${INQUIRY_COLORS.shift.text}`}>Shift</span> - "I'm looking from a new place"</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-stone-200">
                  <p className="text-sm text-stone-700 mb-2">
                    <span className="font-semibold">Why this leads to seeing universal patterns:</span>
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    When you step back from the content of what you're doing to examine the structure of how you're thinking about it, patterns become visible. Each inquiry pulls you up one level—from the action itself to the underlying assumption. That's where you see the same pattern repeating across different domains.
                  </p>
                </div>

                <p className="text-xs text-stone-500 italic">
                  These inquiries invite you to look at familiar truths through new patterns.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Four Quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plan.quadrants.map((quadrant) => (
          <div
            key={quadrant.id}
            className="bg-white rounded-xl shadow-md border-2 border-stone-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Quadrant Header */}
            <div
              className="px-6 py-4 text-white"
              style={{ backgroundColor: quadrant.color }}
            >
              <h2 className="text-2xl font-bold">{quadrant.title}</h2>
              {showPerspectives && (
                <p className="text-sm opacity-90 mt-1 italic">{quadrant.subtitle}</p>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 space-y-4">
              {quadrant.actions.map((action, idx) => {
                const actionKey = `${quadrant.id}-${idx}`
                const isHighlighted =
                  !!selectedLens.highlightAxes?.includes(action.duality?.axisId ?? '')

                // For Mission quadrant, use originalVerb (BE, EXPAND, PRAY, REACH OUT)
                const isMission = quadrant.id === 'mission'
                const displayVerb = isMission && action.originalVerb
                  ? action.originalVerb
                  : action.verb

                return (
                  <div
                    key={actionKey}
                    className={`space-y-2 rounded-lg p-3 ${
                      isHighlighted
                        ? 'bg-amber-50 border border-amber-200 shadow-sm'
                        : 'bg-transparent'
                    }`}
                  >
                    <div className="flex gap-2 items-start">
                      <span
                        className="font-bold text-sm px-2 py-1 rounded mt-0.5"
                        style={{
                          color: quadrant.color,
                          backgroundColor: quadrant.color + '20'
                        }}
                      >
                        {displayVerb}
                      </span>
                      <span className="text-stone-700 text-sm leading-relaxed">
                        {action.action}
                      </span>
                    </div>

                    {showPerspectives && action.perspective && (
                      <div className="ml-2 pl-4 border-l-2 border-stone-200">
                        <p className="text-xs text-stone-600 italic">
                          → {action.perspective}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Goal Setting Section */}
      <div className="bg-amber-50 rounded-xl border-2 border-amber-200 p-8">
        <h2 className="text-2xl font-serif font-semibold text-amber-900 mb-4 text-center">
          Choose Your Own Goals
        </h2>
        <p className="text-amber-800 text-center mb-6 max-w-2xl mx-auto">
          Select one meaningful goal from each quadrant—or create your own.
          The practices that resonate with you are the right ones for this season of your life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {plan.quadrants.map((quadrant) => (
            <div key={quadrant.id} className="bg-white rounded-lg p-4 border border-amber-200">
              <h3 className="font-semibold text-stone-900 mb-2">{quadrant.title}</h3>
              <div className="border-t border-stone-200 pt-2 mt-2">
                <label className="text-xs text-stone-600 block mb-1">My goal:</label>
                <div className="h-16 bg-stone-50 rounded border border-stone-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remember */}
      <div className="text-center py-8">
        <p className="text-xl font-serif text-stone-700 italic">
          Remember that all great things take time,
          <br />
          unfolding through our patience and consistent effort
        </p>
      </div>
    </div>
  )
}

PlanView.propTypes = {
  plan: PropTypes.shape({
    quadrants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        actions: PropTypes.arrayOf(
          PropTypes.shape({
            verb: PropTypes.string.isRequired,
            action: PropTypes.string.isRequired,
            perspective: PropTypes.string,
            originalVerb: PropTypes.string,
            duality: PropTypes.shape({
              axisId: PropTypes.string
            })
          })
        ).isRequired
      })
    ).isRequired
  }).isRequired,
  selectedLens: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    highlightAxes: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}
