import PropTypes from 'prop-types'

export default function QuoteDisplay({ selectedLens }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white mb-4"
            style={{ backgroundColor: selectedLens.color }}
          >
            {selectedLens.name}
          </div>
        </div>

        <blockquote className="font-serif text-lg sm:text-xl md:text-2xl leading-loose text-stone-800">
          <p className="italic">
            "Anytime we do anything that helps anyone{' '}
            <span className="font-semibold not-italic text-stone-900 whitespace-nowrap">on either side of the veil</span>{' '}
            to{' '}
            <span
              className="font-semibold not-italic px-2 py-1 rounded inline-block my-1"
              style={{
                backgroundColor: selectedLens.color + '20',
                color: selectedLens.color
              }}
            >
              {selectedLens.covenant}
            </span>
            , we are helping to{' '}
            <span
              className="font-semibold not-italic px-2 py-1 rounded inline-block my-1"
              style={{
                backgroundColor: selectedLens.color + '20',
                color: selectedLens.color
              }}
            >
              {selectedLens.gather}
            </span>
            ."
          </p>
        </blockquote>

        <footer className="mt-8 text-right text-stone-600">
          <p className="text-sm">— President Russell M. Nelson</p>
          {selectedLens.id !== 'lds' && (
            <p className="text-xs mt-2 italic">Translated through the {selectedLens.name} lens</p>
          )}
        </footer>

        {selectedLens.id !== 'lds' && (
          <div className="mt-8 pt-8 border-t border-stone-200">
            <p className="text-stone-600 text-sm leading-relaxed">
              The same truth, translated. Each lens illuminates a different facet of wholeness,
              helping different people recognize the same invitation.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

QuoteDisplay.propTypes = {
  selectedLens: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    covenant: PropTypes.string.isRequired,
    gather: PropTypes.string.isRequired
  }).isRequired
}
