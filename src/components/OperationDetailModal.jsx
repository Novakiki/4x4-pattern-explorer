import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import lensesData from '../data/lenses.json'
import patternsData from '../data/patterns.json'
import { operationsData, boundaryCards } from '../data/operationsData'
import { operationPlanConnections } from '../data/operationPlanConnections'
import BoundaryCard from './BoundaryCard'

const baseVerbColors = {
  OBSERVE: '#3b82f6',
  ASK: '#ef4444',
  REMEMBER: '#f97316',
  IMAGINE: '#10b981'
}

const quadrantColors = {
  Mission: baseVerbColors.OBSERVE,
  Temple: baseVerbColors.ASK,
  'Family History': baseVerbColors.REMEMBER,
  Invite: baseVerbColors.IMAGINE
}

const operationLookup = Object.entries(operationsData.operations).reduce(
  (acc, [key, value]) => {
    acc[value.name] = { data: value, key }
    return acc
  },
  {}
)

const toTitleCase = (verb = '') =>
  verb.charAt(0) + verb.slice(1).toLowerCase()

const getLensEntries = (examples) => {
  if (!examples) return []
  return lensesData.lenses
    .map((lens) => {
      if (!examples[lens.id]) return null
      return {
        id: lens.id,
        name: lens.name,
        color: lens.color,
        description: examples[lens.id]
      }
    })
    .filter(Boolean)
}

const patternMap = new Map(
  patternsData.patterns.map((pattern) => [pattern.id, pattern])
)

export default function OperationDetailModal({
  operation,
  rowVerb,
  colVerb,
  onClose,
  onSelectOperation
}) {
  const [showAllLenses, setShowAllLenses] = useState(false)
  const [showBoundaryCard, setShowBoundaryCard] = useState(false)

  if (!operation) return null

  // Check if there's a boundary card for this operation
  const boundaryCardKey = `${rowVerb}-BOUNDARY`
  const boundaryCardData = boundaryCards[boundaryCardKey]

  const rowTitle = toTitleCase(rowVerb)
  const colTitle = toTitleCase(colVerb)
  const combinationLabel = `${rowTitle} × ${colTitle}`

  const rowColor = baseVerbColors[rowVerb] ?? operation.color
  const colColor = baseVerbColors[colVerb] ?? operation.color

  const gradientBackground = `linear-gradient(135deg, ${rowColor} 0%, ${colColor} 100%)`

  const lensEntries = useMemo(
    () => getLensEntries(operation.lensExamples),
    [operation.lensExamples]
  )

  const lensPreviewCount = 6
  const visibleLensEntries = showAllLenses
    ? lensEntries
    : lensEntries.slice(0, lensPreviewCount)

  const planConnections = operationPlanConnections[operation.name] ??
    (operation.mm4Example
      ? [
          {
            quadrant: combinationLabel,
            action: operation.mm4Example.action,
            description: operation.mm4Example.bridge
          }
        ]
      : [])

  const relatedPatterns = (operation.relatedPatterns ?? [])
    .map((patternId) => patternMap.get(patternId))
    .filter(Boolean)

  const connectedOps = (operation.connectedOperations ?? [])
    .map((name) => ({
      name,
      detail: operationLookup[name]
    }))
    .filter((item) => !!item.detail)

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header
          className="relative px-6 sm:px-8 py-8 text-white rounded-t-2xl"
          style={{ background: gradientBackground }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors text-3xl leading-none"
            aria-label="Close operation details"
          >
            ×
          </button>
          <div className="flex flex-col gap-3">
            <div className="text-sm uppercase tracking-widest font-semibold text-white/80">
              {combinationLabel}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              {operation.name}
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-white/90 leading-relaxed">
              {operation.description}
            </p>
            {boundaryCardData && (
              <button
                onClick={() => setShowBoundaryCard(true)}
                className="mt-4 px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium text-sm backdrop-blur-sm border border-white/30"
              >
                → Enter Boundary Mode
              </button>
            )}
          </div>
        </header>

        <main className="px-6 sm:px-8 py-8 space-y-10">
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-stone-900">The Essence</h3>
            <p className="text-stone-700 leading-relaxed">
              {operation.essence}
            </p>
          </section>

          {operation.inquiry && (
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-stone-900">
                The Deeper Inquiry
              </h3>
              <div className="bg-stone-100 border border-stone-200 rounded-xl p-5">
                <p className="text-stone-800 italic text-base leading-relaxed">
                  {operation.inquiry}
                </p>
              </div>
            </section>
          )}

          {!!lensEntries.length && (
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">
                    Through 13 Lenses
                  </h3>
                  <p className="text-sm text-stone-600">
                    See how this operation manifests across every perspective.
                  </p>
                </div>
                {lensEntries.length > lensPreviewCount && (
                  <button
                    onClick={() => setShowAllLenses(!showAllLenses)}
                    className="text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {showAllLenses ? 'Collapse' : `Show all ${lensEntries.length}`}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visibleLensEntries.map((lens) => (
                  <article
                    key={lens.id}
                    className="border border-stone-200 rounded-lg p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: lens.color }}
                      />
                      <h4 className="text-sm font-semibold text-stone-900">
                        {lens.name}
                      </h4>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {lens.description}
                    </p>
                  </article>
                ))}
              </div>
              {!showAllLenses && lensEntries.length > lensPreviewCount && (
                <button
                  onClick={() => setShowAllLenses(true)}
                  className="text-sm font-semibold text-stone-700 hover:text-stone-900"
                >
                  Show all {lensEntries.length} lenses →
                </button>
              )}
            </section>
          )}

          {!!planConnections.length && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-900">
                In the 4×4 Plan
              </h3>
              <div className="space-y-3">
                {planConnections.map(({ quadrant, action, description }) => {
                  const pillColor = quadrantColors[quadrant] ?? operation.color
                  return (
                    <div
                      key={`${quadrant}-${action}`}
                      className="bg-stone-50 border border-stone-200 rounded-xl p-4"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: pillColor }}
                        >
                          {quadrant}
                        </span>
                        <span className="text-sm font-semibold text-stone-700">
                          {action}
                        </span>
                      </div>
                      <p className="text-sm text-stone-700 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {!!relatedPatterns.length && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-900">
                Related Patterns
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {relatedPatterns.map((pattern) => (
                  <article
                    key={pattern.id}
                    className="border border-stone-200 rounded-xl p-4 bg-white"
                  >
                    <h4 className="text-sm font-semibold text-stone-900 mb-1">
                      Pattern {pattern.id}: {pattern.title}
                    </h4>
                    <p className="text-xs uppercase tracking-wide text-stone-500 mb-2">
                      {pattern.subtitle}
                    </p>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {pattern.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {!!connectedOps.length && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-900">
                Connected Operations
              </h3>
              <div className="flex flex-wrap gap-3">
                {connectedOps.map(({ name, detail }) => {
                  const [row, col] = detail.key.split('-')
                  const label = `${toTitleCase(row)} × ${toTitleCase(col)}`
                  const buttonColor =
                    baseVerbColors[row] ?? baseVerbColors[col] ?? operation.color

                  const handleClick = () => {
                    if (onSelectOperation) {
                      onSelectOperation(detail.key)
                    }
                  }

                  return (
                    <button
                      key={name}
                      onClick={handleClick}
                      type="button"
                      className="px-3 py-2 border border-stone-200 rounded-lg text-left hover:border-stone-300 transition-colors"
                    >
                      <span className="block text-sm font-semibold text-stone-900">
                        {name}
                      </span>
                      <span
                        className="block text-xs font-medium"
                        style={{ color: buttonColor }}
                      >
                        {label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Boundary Card Modal */}
      {showBoundaryCard && boundaryCardData && (
        <BoundaryCard
          cardData={boundaryCardData}
          onClose={() => setShowBoundaryCard(false)}
          onComplete={(data, action) => {
            console.log('Boundary card completed:', data, action)
            // TODO: Save the boundary data to localStorage or backend
            setShowBoundaryCard(false)
          }}
        />
      )}
    </div>
  )
}

OperationDetailModal.propTypes = {
  operation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    essence: PropTypes.string.isRequired,
    inquiry: PropTypes.string,
    color: PropTypes.string.isRequired,
    lensExamples: PropTypes.object,
    mm4Example: PropTypes.shape({
      action: PropTypes.string,
      bridge: PropTypes.string
    }),
    relatedPatterns: PropTypes.arrayOf(PropTypes.number),
    connectedOperations: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  rowVerb: PropTypes.string.isRequired,
  colVerb: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectOperation: PropTypes.func
}

