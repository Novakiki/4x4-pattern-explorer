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

        <blockquote className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-stone-800">
          <p className="italic">
            "Anytime we do anything that helps anyone{' '}
            <span className="font-semibold not-italic text-stone-900">on either side of the veil</span>{' '}
            to{' '}
            <span
              className="font-semibold not-italic px-2 py-1 rounded"
              style={{
                backgroundColor: selectedLens.color + '20',
                color: selectedLens.color
              }}
            >
              {selectedLens.covenant}
            </span>
            , we are helping to{' '}
            <span
              className="font-semibold not-italic px-2 py-1 rounded"
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

        <div className="mt-8 pt-8 border-t border-stone-200">
          <p className="text-stone-600 text-sm leading-relaxed">
            {selectedLens.id === 'lds' ? (
              <>
                This is President Nelson's original teaching. Notice the phrase{' '}
                <span className="font-semibold">"on either side of the veil"</span> — it invites us 
                to see reality as having both visible and invisible dimensions, both outer and inner worlds.
              </>
            ) : (
              <>
                The same pattern expressed through a different vocabulary. The invitation remains the same: 
                honor what's sacred, work toward wholeness. Different words, same truth.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
