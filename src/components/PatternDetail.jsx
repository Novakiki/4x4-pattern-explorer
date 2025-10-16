export default function PatternDetail({ pattern }) {
  return (
    <div className="max-w-3xl mx-auto">
      <article className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-stone-100 to-stone-50 px-8 py-12 border-b border-stone-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center text-xl font-bold">
              {pattern.id}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                {pattern.title}
              </h1>
              <p className="text-lg text-stone-600 mt-1">{pattern.subtitle}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-8 py-8 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">The Pattern</h2>
            <p className="text-stone-700 leading-relaxed">{pattern.description}</p>
          </section>

          {/* Mapping */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">In the 4×4 Framework</h2>
            <div className="bg-stone-50 rounded-lg p-6 space-y-3">
              {Object.entries(pattern.mapping).map(([key, value]) => (
                <div key={key} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-stone-400 mt-2"></div>
                  </div>
                  <div>
                    <span className="font-medium text-stone-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:{' '}
                    </span>
                    <span className="text-stone-700">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why It Matters */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">Why It Matters</h2>
            <p className="text-stone-700 leading-relaxed">{pattern.whyItMatters}</p>
          </section>

          {/* Reflection */}
          <section className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-400">
            <h2 className="text-lg font-semibold text-amber-900 mb-3">Reflection Question</h2>
            <p className="text-amber-800 italic leading-relaxed">{pattern.reflection}</p>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-stone-50 px-8 py-6 border-t border-stone-200">
          <p className="text-sm text-stone-600 text-center">
            This pattern reveals one dimension of how the framework works. 
            Together, all 12 patterns create a complete map of consciousness.
          </p>
        </footer>
      </article>

      {/* Navigation hint */}
      <div className="mt-8 text-center text-stone-600 text-sm">
        <p>Click "Back" to explore more patterns</p>
      </div>
    </div>
  )
}
