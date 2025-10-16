export default function QuoteDisplay({ selectedFocus, selectedAxis }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white mb-4"
            style={{ backgroundColor: selectedFocus.color }}
          >
            {selectedFocus.name}
          </div>
        </div>

        <blockquote className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-stone-800">
          <p className="italic">
            "Anytime we do anything that helps anyone{' '}
            {selectedAxis.right ? (
              <>
                <span className="font-semibold not-italic text-stone-900">{selectedAxis.left}</span>
                {' '}or{' '}
                <span className="font-semibold not-italic text-stone-900">{selectedAxis.right}</span>
              </>
            ) : (
              <span className="font-semibold not-italic text-stone-900">{selectedAxis.left}</span>
            )}
            {' '}to{' '}
            <span
              className="font-semibold not-italic px-2 py-1 rounded"
              style={{
                backgroundColor: selectedFocus.color + '20',
                color: selectedFocus.color
              }}
            >
              {selectedFocus.covenant}
            </span>
            , we are helping to{' '}
            <span
              className="font-semibold not-italic px-2 py-1 rounded"
              style={{
                backgroundColor: selectedFocus.color + '20',
                color: selectedFocus.color
              }}
            >
              {selectedFocus.gather}
            </span>
            ."
          </p>
        </blockquote>

        <footer className="mt-8 text-right text-stone-600">
          <p className="text-sm">— President Russell M. Nelson</p>
          {selectedFocus.id !== 'lds' && (
            <p className="text-xs mt-2 italic">Translated through the {selectedFocus.name} focus</p>
          )}
        </footer>

        <div className="mt-8 pt-8 border-t border-stone-200">
          <p className="text-stone-600 text-sm leading-relaxed">
            {selectedFocus.id === 'lds' ? (
              <>
                This is President Nelson's original teaching. The phrase{' '}
                <span className="font-semibold">"{selectedAxis.left}{selectedAxis.right ? ` or ${selectedAxis.right}` : ''}"</span>
                {' '}invites us to see reality across multiple dimensions. Use the Axis selector above to explore different polarities.
              </>
            ) : (
              <>
                The same pattern expressed through a different vocabulary. The invitation remains the same:
                honor what's sacred, work toward wholeness. Different words, same truth. Use the Axis selector to explore different dimensions.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
