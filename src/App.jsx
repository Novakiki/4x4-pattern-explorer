import { useState, useEffect } from 'react'
import LensSelector from './components/LensSelector'
import QuoteDisplay from './components/QuoteDisplay'
import PatternMatrix from './components/PatternMatrix'
import PatternDetail from './components/PatternDetail'
import PlanView from './components/PlanView'
import lensesData from './data/lenses.json'
import patternsData from './data/patterns.json'
import planData from './data/plan.json'

function App() {
  const [selectedLens, setSelectedLens] = useState(lensesData.lenses[0])
  const [selectedPattern, setSelectedPattern] = useState(null)
  const [view, setView] = useState('home') // 'home', 'pattern', 'plan'

  // Handle URL parameters for sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const lensId = params.get('lens')
    const patternId = params.get('pattern')
    
    if (lensId) {
      const lens = lensesData.lenses.find(l => l.id === lensId)
      if (lens) setSelectedLens(lens)
    }
    
    if (patternId) {
      const pattern = patternsData.patterns.find(p => p.id === parseInt(patternId))
      if (pattern) {
        setSelectedPattern(pattern)
        setView('pattern')
      }
    }
  }, [])

  // Update URL when lens changes
  const handleLensChange = (lens) => {
    setSelectedLens(lens)
    const params = new URLSearchParams(window.location.search)
    params.set('lens', lens.id)
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }

  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern)
    setView('pattern')
  }

  const handleBack = () => {
    setView('home')
    setSelectedPattern(null)
  }

  const handleViewPlan = () => {
    setView('plan')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
                4×4 Pattern Explorer
              </h1>
              <p className="text-sm text-stone-600 mt-1">MM4th Ward | Discover the deeper patterns</p>
            </div>
            {view !== 'home' && (
              <button
                onClick={handleBack}
                className="text-stone-600 hover:text-stone-900 transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {view === 'home' && (
          <div className="space-y-12">
            {/* Lens Selector */}
            <section>
              <LensSelector
                lenses={lensesData.lenses}
                selectedLens={selectedLens}
                onLensChange={handleLensChange}
              />
            </section>

            {/* Quote Display */}
            <section>
              <QuoteDisplay selectedLens={selectedLens} />
            </section>

            {/* Pattern Matrix */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 mb-3">
                  Explore the 12 Patterns
                </h2>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  These patterns reveal why the 4×4 framework feels so complete. 
                  Click any pattern to explore it in depth.
                </p>
              </div>
              <PatternMatrix
                patterns={patternsData.patterns}
                onPatternClick={handlePatternClick}
              />
            </section>

            {/* View Plan Button */}
            <section className="text-center">
              <button
                onClick={handleViewPlan}
                className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors text-lg font-medium"
              >
                View the 4×4 Plan in This Lens
                <span>→</span>
              </button>
            </section>
          </div>
        )}

        {view === 'pattern' && selectedPattern && (
          <PatternDetail
            pattern={selectedPattern}
            onBack={handleBack}
          />
        )}

        {view === 'plan' && (
          <PlanView
            plan={planData}
            selectedLens={selectedLens}
            onBack={handleBack}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-16">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center text-stone-600 text-sm">
          <p className="mb-2">
            <em>"Anytime we do anything that helps anyone on either side of the veil..."</em>
          </p>
          <p>
            The pattern lives on both sides. The framework itself is a teacher.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
