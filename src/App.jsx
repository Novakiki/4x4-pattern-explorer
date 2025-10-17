import { useEffect, useState } from 'react'
import FocusSelector from './components/FocusSelector'
import PatternDetail from './components/PatternDetail'
import PatternMatrix from './components/PatternMatrix'
import PlanView from './components/PlanView'
import QuoteDisplay from './components/QuoteDisplay'
import MetaMatrix from './components/MetaMatrix'
import lensesData from './data/lenses.json'
import patternsData from './data/patterns.json'
import { operationsData, planData } from './data/operationsData'

function App() {
  const [selectedFocus, setSelectedFocus] = useState(lensesData.lenses[0])
  const [selectedPattern, setSelectedPattern] = useState(null)
  const [view, setView] = useState('home') // 'home', 'pattern', 'matrix'

  // Handle URL parameters for sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const focusId = params.get('focus')
    const operationKey = params.get('operation')
    const patternId = params.get('pattern')

    if (focusId) {
      const focus = lensesData.lenses.find(f => f.id === focusId)
      if (focus) setSelectedFocus(focus)
    }

    if (operationKey && operationsData.operations[operationKey]) {
      setView('matrix')
    } else if (patternId) {
      const pattern = patternsData.patterns.find(p => p.id === parseInt(patternId))
      if (pattern) {
        setSelectedPattern(pattern)
        setView('pattern')
      }
    }
  }, [])

  // Update URL when focus changes
  const handleFocusChange = (focus) => {
    setSelectedFocus(focus)
    const params = new URLSearchParams(window.location.search)
    params.set('focus', focus.id)
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }

  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern)
    setView('pattern')
  }

  const handleBack = () => {
    const previousView = view
    setView('home')
    setSelectedPattern(null)

    const params = new URLSearchParams(window.location.search)
    if (previousView === 'pattern') {
      params.delete('pattern')
    }
    if (previousView === 'matrix') {
      params.delete('operation')
    }
    const search = params.toString()
    const newUrl = `${window.location.pathname}${search ? `?${search}` : ''}`
    window.history.replaceState({}, '', newUrl)
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
                The Pattern Behind the Plan
              </h1>
              <p className="text-sm text-stone-600 mt-1">MM4th Ward | Discover the deeper structures</p>
            </div>
            <div className="flex gap-4 items-center">
              {view === 'home' && (
                <button
                  onClick={() => setView('matrix')}
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
                >
                  Explore Meta-Matrix →
                </button>
              )}
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {view === 'home' && (
          <div className="space-y-12">
            {/* Focus Selector */}
            <section>
              <FocusSelector
                focuses={lensesData.lenses}
                selectedFocus={selectedFocus}
                onFocusChange={handleFocusChange}
              />
            </section>

            {/* Quote Display */}
            <section>
              <QuoteDisplay selectedFocus={selectedFocus} />
            </section>

            {/* 4x4 Plan */}
            <section>
              <PlanView
                plan={planData}
                selectedFocus={selectedFocus}
              />
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
                highlightedPatternIds={selectedFocus.highlightPatterns ?? []}
              />
            </section>
          </div>
        )}

        {view === 'pattern' && selectedPattern && (
          <PatternDetail
            pattern={selectedPattern}
            onBack={handleBack}
          />
        )}

        {view === 'matrix' && (
          <MetaMatrix 
            selectedFocus={selectedFocus}
            onFocusChange={handleFocusChange}
            allFocuses={lensesData.lenses}
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
            The pattern lives across all dimensions. The framework itself is a teacher.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
