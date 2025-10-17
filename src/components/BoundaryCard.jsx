import { useState } from 'react'
import {
  TextEntrySection,
  MultiSelectSection,
  SingleSelectSection,
  SingleSelectWithRewriteSection,
  SliderSection,
  ConditionalFieldSection,
  BreathPracticeSection,
  RecapSection
} from './BoundaryCardSections'

/**
 * BoundaryCard - renders a complete boundary card flow
 * @param {Object} cardData - The boundary card data from boundaryContent.js
 * @param {Function} onClose - Callback when user closes the card
 * @param {Function} onComplete - Callback when user completes the flow
 */
export default function BoundaryCard({ cardData, onClose, onComplete }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [boundaryData, setBoundaryData] = useState({
    belief_text: '',
    rewrite_text: '',
    origins: [],
    permeability: '',
    function_now: '',
    placement: 50,
    experiment: { text: '', reminder: false }
  })

  const currentSection = cardData.sections[currentSectionIndex]
  const isLastSection = currentSectionIndex === cardData.sections.length - 1

  // Update a field in the boundary data
  const updateField = (key, value) => {
    setBoundaryData(prev => ({ ...prev, [key]: value }))
  }

  // Handle section action (typically "next" or "save")
  const handleAction = (actionId) => {
    if (actionId === 'adopt-rewrite') {
      // Replace belief with rewrite
      updateField('belief_text', boundaryData.rewrite_text)
    }

    if (currentSection.type === 'recap') {
      if (actionId === 'archive' || actionId === 'duplicate') {
        // Handle these actions as completion
        if (onComplete) onComplete(boundaryData, actionId)
        return
      }
    }

    // Move to next section
    if (!isLastSection) {
      setCurrentSectionIndex(prev => prev + 1)
    } else {
      // Flow complete
      if (onComplete) onComplete(boundaryData, actionId)
    }
  }

  // Handle editing a specific field from recap
  const handleEdit = (fieldKey) => {
    // Find the section that edits this field
    const sectionIndex = cardData.sections.findIndex(section => {
      if (section.type === 'textEntry' && fieldKey === 'belief_text') return true
      if (section.type === 'multiSelect' && fieldKey === 'origins') return true
      if (section.type === 'singleSelect' && fieldKey === 'permeability') return true
      if (section.type === 'singleSelectWithOptionalRewrite' && fieldKey === 'function_now') return true
      if (section.type === 'slider' && fieldKey === 'placement') return true
      if (section.type === 'conditionalField' && fieldKey === 'experiment') return true
      return false
    })
    if (sectionIndex >= 0) {
      setCurrentSectionIndex(sectionIndex)
    }
  }

  // Go back to previous section
  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1)
    } else {
      onClose()
    }
  }

  // Render the appropriate section component
  const renderSection = () => {
    const section = currentSection

    switch (section.type) {
      case 'textEntry':
        return (
          <TextEntrySection
            section={section}
            value={boundaryData.belief_text}
            onChange={(val) => updateField('belief_text', val)}
            onAction={handleAction}
          />
        )

      case 'multiSelect':
        return (
          <MultiSelectSection
            section={section}
            value={boundaryData.origins}
            onChange={(val) => updateField('origins', val)}
            onAction={handleAction}
          />
        )

      case 'singleSelect':
        return (
          <SingleSelectSection
            section={section}
            value={boundaryData.permeability}
            onChange={(val) => updateField('permeability', val)}
            onAction={handleAction}
          />
        )

      case 'singleSelectWithOptionalRewrite':
        return (
          <SingleSelectWithRewriteSection
            section={section}
            value={boundaryData.function_now}
            rewriteValue={boundaryData.rewrite_text}
            onChange={(val) => updateField('function_now', val)}
            onRewriteChange={(val) => updateField('rewrite_text', val)}
            onAction={handleAction}
          />
        )

      case 'slider':
        return (
          <SliderSection
            section={section}
            value={boundaryData.placement}
            onChange={(val) => updateField('placement', val)}
            onAction={handleAction}
          />
        )

      case 'conditionalField':
        return (
          <ConditionalFieldSection
            section={section}
            value={boundaryData.experiment.text}
            reminder={boundaryData.experiment.reminder}
            onChange={(val) => updateField('experiment', { ...boundaryData.experiment, text: val })}
            onReminderChange={(val) => updateField('experiment', { ...boundaryData.experiment, reminder: val })}
            onAction={handleAction}
            permeability={boundaryData.permeability}
          />
        )

      case 'breathPractice':
        return (
          <BreathPracticeSection
            section={section}
            onAction={handleAction}
          />
        )

      case 'recap':
        return (
          <RecapSection
            section={section}
            data={boundaryData}
            onEdit={handleEdit}
            onAction={handleAction}
          />
        )

      default:
        return (
          <div className="text-stone-600">
            Unknown section type: {section.type}
          </div>
        )
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="relative px-6 sm:px-8 py-6 border-b border-stone-200">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-stone-600 hover:text-stone-900 transition-colors text-xl leading-none"
            aria-label={currentSectionIndex === 0 ? 'Close' : 'Go back'}
          >
            {currentSectionIndex === 0 ? '×' : '←'}
          </button>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-600 hover:text-stone-900 transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <div className="text-center space-y-2 pt-6">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-500">
              {cardData.meta.title}
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              {cardData.meta.intro}
            </h2>
            <p className="text-sm text-stone-600">
              {cardData.meta.subtitle}
            </p>
          </div>
        </header>

        {/* Progress indicator */}
        <div className="px-6 sm:px-8 py-4 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center gap-2">
            {cardData.sections.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  idx <= currentSectionIndex ? 'bg-stone-900' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-stone-500 text-center mt-2">
            Step {currentSectionIndex + 1} of {cardData.sections.length}
          </div>
        </div>

        {/* Main content */}
        <main className="px-6 sm:px-8 py-8">
          {renderSection()}
        </main>

        {/* Optional membrane animation hint */}
        {currentSection.type === 'singleSelect' && currentSection.ui?.animation === 'membraneEdge' && (
          <div className="absolute inset-0 pointer-events-none rounded-2xl border-4 border-transparent animate-pulse"
               style={{
                 borderColor: boundaryData.permeability === 'rigid' ? 'rgba(120, 113, 108, 0.3)' :
                              boundaryData.permeability === 'semi_permeable' ? 'rgba(120, 113, 108, 0.15)' :
                              'rgba(120, 113, 108, 0.05)'
               }}
          />
        )}
      </div>
    </div>
  )
}
