import PropTypes from 'prop-types'

export default function PatternMatrix({
  patterns,
  onPatternClick,
  highlightedPatternIds = []
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {patterns.map((pattern) => (
        <button
          key={pattern.id}
          onClick={() => onPatternClick(pattern)}
          className={`group bg-white rounded-lg border-2 p-6 hover:border-stone-400 hover:shadow-lg transition-all text-left ${
            highlightedPatternIds.includes(pattern.id)
              ? 'border-amber-400 shadow-md'
              : 'border-stone-200'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-bold group-hover:bg-stone-200 transition-colors">
              {pattern.id}
            </div>
            <div className="flex flex-col items-end gap-1">
              <svg
                className="w-5 h-5 text-stone-400 group-hover:text-stone-600 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {highlightedPatternIds.includes(pattern.id) && (
                <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                  Focus
                </span>
              )}
            </div>
          </div>
          
          <h3 className="font-semibold text-stone-900 mb-2 group-hover:text-stone-700 transition-colors">
            {pattern.title}
          </h3>
          
          <p className="text-sm text-stone-600 mb-3">
            {pattern.subtitle}
          </p>
          
          <p className="text-xs text-stone-500 line-clamp-2">
            {pattern.description}
          </p>
        </button>
      ))}
    </div>
  )
}

PatternMatrix.propTypes = {
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  onPatternClick: PropTypes.func.isRequired,
  highlightedPatternIds: PropTypes.arrayOf(PropTypes.number)
}
