import PropTypes from 'prop-types'

export default function PatternDetail({ pattern }) {
  const getTypeColor = (type) => {
    if (type === 'SEQUENCE') return 'bg-purple-100 text-purple-700 border-purple-200'
    if (type === 'PARTITION') return 'bg-blue-100 text-blue-700 border-blue-200'
    if (type === 'MAPPING') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    if (type === 'RHYTHM') return 'bg-orange-100 text-orange-700 border-orange-200'
    return 'bg-stone-100 text-stone-600 border-stone-200'
  }

  const getCategoryColor = (category) => {
    if (category === 'STRUCTURAL') return 'bg-blue-100 text-blue-700 border-blue-200'
    if (category === 'COMPLETENESS') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    return 'bg-stone-100 text-stone-600 border-stone-200'
  }

  return (
    <div className="max-w-3xl mx-auto">
      <article className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-stone-100 to-stone-50 px-8 py-12 border-b border-stone-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
              {pattern.id}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                {pattern.title}
              </h1>
              <p className="text-lg text-stone-600 mt-1">{pattern.subtitle}</p>

              {/* Type and Category Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {pattern.type && (
                  <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${getTypeColor(pattern.type)}`}>
                    Type: {pattern.type}
                  </span>
                )}
                {pattern.category && (
                  <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${getCategoryColor(pattern.category)}`}>
                    {pattern.category === 'STRUCTURAL' ? 'Structural Pattern' : 'Completeness Proof'}
                  </span>
                )}
              </div>
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

          {/* Structure Panel - Type-Specific */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">Mathematical Structure</h2>

            {/* SEQUENCE type */}
            {pattern.type === 'SEQUENCE' && pattern.operationSequence && (
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wide mb-3">
                  Temporal Sequence
                </h3>
                <ol className="space-y-2">
                  {pattern.operationSequence.map((verb, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-mono text-sm text-purple-900 font-semibold">
                        {verb}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* PARTITION type */}
            {pattern.type === 'PARTITION' && pattern.operationPartition && (
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-3">
                  Spatial Partition
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(pattern.operationPartition).map(([category, verbs]) => (
                    <div key={category} className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2 text-sm uppercase tracking-wide">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      {Array.isArray(verbs) ? (
                        <ul className="space-y-1">
                          {verbs.map((verb, idx) => (
                            <li key={idx} className="font-mono text-sm text-blue-900 font-semibold">
                              • {verb}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-blue-800">{verbs}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MAPPING type */}
            {pattern.type === 'MAPPING' && pattern.operationMapping && (
              <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                <h3 className="text-sm font-semibold text-emerald-900 uppercase tracking-wide mb-3">
                  Categorical Mapping
                </h3>
                <div className="space-y-2">
                  {Object.entries(pattern.operationMapping).map(([verb, category]) => (
                    <div key={verb} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-emerald-200">
                      <span className="font-mono text-sm font-bold text-emerald-900 min-w-[100px]">
                        {verb}
                      </span>
                      <span className="text-stone-400">→</span>
                      <span className="text-sm text-emerald-800">
                        {category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RHYTHM type */}
            {pattern.type === 'RHYTHM' && (
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <h3 className="text-sm font-semibold text-orange-900 uppercase tracking-wide mb-3">
                  Rhythmic Oscillation
                </h3>

                {/* Show partition if available (typically 2 alternating phases) */}
                {pattern.operationPartition && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {Object.entries(pattern.operationPartition).map(([phase, verbs]) => (
                      <div key={phase} className="bg-white rounded-lg p-4 border border-orange-200">
                        <h4 className="font-semibold text-orange-900 mb-2 text-sm uppercase tracking-wide">
                          {phase.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        {Array.isArray(verbs) ? (
                          <ul className="space-y-1">
                            {verbs.map((verb, idx) => (
                              <li key={idx} className="font-mono text-sm text-orange-900 font-semibold">
                                • {verb}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-orange-800">{verbs}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Show sequence if available */}
                {pattern.operationSequence && (
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2 text-sm">Cycle:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pattern.operationSequence.map((verb, idx) => (
                        <span key={idx} className="font-mono text-sm text-orange-900 font-semibold">
                          {verb}
                          {idx < pattern.operationSequence.length - 1 && (
                            <span className="text-orange-400 mx-1">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show examples if available */}
                {pattern.examples && (
                  <div className="mt-4 space-y-3">
                    <h4 className="font-semibold text-orange-900 text-sm">Examples:</h4>
                    {Object.entries(pattern.examples).map(([exampleName, exampleData]) => (
                      <details key={exampleName} className="bg-white rounded-lg border border-orange-200">
                        <summary className="cursor-pointer px-4 py-2 font-medium text-orange-900 text-sm hover:bg-orange-50">
                          {exampleName.charAt(0).toUpperCase() + exampleName.slice(1)}
                        </summary>
                        <div className="px-4 pb-3 pt-1 space-y-1">
                          {Object.entries(exampleData).map(([verb, description]) => (
                            <div key={verb} className="text-sm">
                              <span className="font-mono font-semibold text-orange-900">{verb.toUpperCase()}:</span>
                              <span className="text-orange-800 ml-2">{description}</span>
                            </div>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fallback to generic mapping if no type-specific data */}
            {!pattern.operationSequence && !pattern.operationPartition && !pattern.operationMapping && pattern.mapping && (
              <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
                <div className="space-y-3">
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
              </div>
            )}

            {/* Matrix reference for structural patterns */}
            {pattern.category === 'STRUCTURAL' && pattern.structure && (
              <div className="mt-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                  Matrix References
                </h3>
                <div className="text-xs text-slate-700 font-mono space-y-1">
                  {pattern.structure.mainDiagonal && (
                    <div>
                      <strong>Main Diagonal:</strong> {Object.keys(pattern.structure.mainDiagonal).join(', ')}
                    </div>
                  )}
                  {pattern.structure.offDiagonal && (
                    <div>
                      <strong>Off-Diagonal:</strong> {pattern.structure.offDiagonal.count || '12 hybrid operations'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Application Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-stone-900">Application</h2>

            {/* Why It Matters */}
            <div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Why It Matters</h3>
              <p className="text-stone-700 leading-relaxed">{pattern.whyItMatters}</p>
            </div>

            {/* LDS Example */}
            {pattern.ldsExample && (
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">In the MM4Ward Plan</h3>
                <p className="text-blue-800 leading-relaxed">{pattern.ldsExample}</p>
              </div>
            )}

            {/* Reflection */}
            <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-400">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">Reflection Question</h3>
              <p className="text-amber-800 italic leading-relaxed">{pattern.reflection}</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-stone-50 px-8 py-6 border-t border-stone-200">
          <p className="text-sm text-stone-600 text-center">
            {pattern.category === 'STRUCTURAL' && (
              <span>This pattern reveals the <strong>geometric structure</strong> inherent to the 4×4 matrix.</span>
            )}
            {pattern.category === 'COMPLETENESS' && (
              <span>This pattern proves the 4×4 framework is <strong>complete</strong> by mapping to independently-validated systems.</span>
            )}
            {!pattern.category && (
              <span>This pattern reveals one dimension of how the framework works.</span>
            )}
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

PatternDetail.propTypes = {
  pattern: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['SEQUENCE', 'PARTITION', 'MAPPING', 'RHYTHM', 'MIXED']),
    category: PropTypes.oneOf(['STRUCTURAL', 'COMPLETENESS']),
    operationSequence: PropTypes.arrayOf(PropTypes.string),
    operationPartition: PropTypes.object,
    operationMapping: PropTypes.object,
    mapping: PropTypes.object,
    structure: PropTypes.object,
    examples: PropTypes.object,
    whyItMatters: PropTypes.string.isRequired,
    ldsExample: PropTypes.string,
    reflection: PropTypes.string.isRequired
  }).isRequired
}
