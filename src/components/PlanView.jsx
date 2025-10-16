export default function PlanView({ plan, selectedLens }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-4"
          style={{ backgroundColor: selectedLens.color }}
        >
          Viewing through the {selectedLens.name} lens
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
          MM4th Ward 4×4 Plan
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Mission, Temple, Family History, & Invite
        </p>
      </div>

      {/* Quote */}
      <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 sm:p-8">
        <blockquote className="font-serif text-base sm:text-lg leading-relaxed text-stone-700 text-center italic">
          "Anytime we do anything that helps anyone on either side of the veil to{' '}
          <span
            className="font-semibold not-italic"
            style={{ color: selectedLens.color }}
          >
            {selectedLens.covenant}
          </span>
          , we are helping to{' '}
          <span
            className="font-semibold not-italic"
            style={{ color: selectedLens.color }}
          >
            {selectedLens.gather}
          </span>
          ."
        </blockquote>
        <p className="text-center text-stone-600 text-sm mt-4">— President Russell M. Nelson</p>
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
              <p className="text-sm opacity-90 mt-1 italic">{quadrant.subtitle}</p>
            </div>

            {/* Actions */}
            <div className="p-6 space-y-4">
              {quadrant.actions.map((action, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex gap-2">
                    <span
                      className="font-bold text-sm px-2 py-1 rounded"
                      style={{
                        color: quadrant.color,
                        backgroundColor: quadrant.color + '20'
                      }}
                    >
                      {action.verb}
                    </span>
                    <span className="text-stone-700 text-sm leading-relaxed">
                      {action.action}
                    </span>
                  </div>
                  
                  {selectedLens.id !== 'lds' && (
                    <div className="ml-2 pl-4 border-l-2 border-stone-200">
                      <p className="text-xs text-stone-600 italic">
                        → {action.universal}
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
