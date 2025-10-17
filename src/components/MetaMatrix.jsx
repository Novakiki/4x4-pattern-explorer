import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { operationsData } from '../data/operationsData'
import OperationDetailModal from './OperationDetailModal'

export default function MetaMatrix({ selectedLens }) {
  const [selectedCell, setSelectedCell] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [hoveredCol, setHoveredCol] = useState(null)
  const [hoveredCellKey, setHoveredCellKey] = useState(null)
  const [priorityFocus, setPriorityFocus] = useState('inward')

  const getCellKey = (row, col) => `${row}-${col}`

  const getCellData = (row, col) => {
    return operationsData.operations[getCellKey(row, col)]
  }

  const isCellHighlighted = (rowIdx, colIdx) => {
    return hoveredRow === rowIdx || hoveredCol === colIdx
  }

  const openOperationModal = (key, { updateHistory = true } = {}) => {
    const data = operationsData.operations[key]
    if (!data) return
    const [row, col] = key.split('-')

    setSelectedCell({
      key,
      row,
      col,
      data
    })

    if (updateHistory) {
      const params = new URLSearchParams(window.location.search)
      params.set('operation', key)
      const search = params.toString()
      const newUrl = `${window.location.pathname}${search ? `?${search}` : ''}`
      window.history.pushState({}, '', newUrl)
    }
  }

  const closeOperationModal = ({ updateHistory = true } = {}) => {
    setSelectedCell(null)

    if (updateHistory) {
      const params = new URLSearchParams(window.location.search)
      params.delete('operation')
      const search = params.toString()
      const newUrl = `${window.location.pathname}${search ? `?${search}` : ''}`
      window.history.replaceState({}, '', newUrl)
    }
  }

  const handleCellClick = (row, col) => {
    const key = getCellKey(row, col)
    openOperationModal(key)
  }

  const handleConnectedOperationSelect = (operationKey) => {
    openOperationModal(operationKey)
  }

  useEffect(() => {
    const syncOperationSelectionFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const key = params.get('operation')

      if (!key) {
        setSelectedCell(null)
        return
      }

      const data = operationsData.operations[key]
      if (!data) return

      const [row, col] = key.split('-')
      setSelectedCell({
        key,
        row,
        col,
        data
      })
    }

    window.addEventListener('popstate', syncOperationSelectionFromUrl)
    syncOperationSelectionFromUrl()

    return () => {
      window.removeEventListener('popstate', syncOperationSelectionFromUrl)
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
          The Meta-Matrix
        </h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-2">
          The 16 Fundamental Cognitive Operations
        </p>
        <p className="text-sm text-stone-500 max-w-2xl mx-auto">
          Four verbs combining with themselves and each other. Click any cell to see how it manifests through different lenses.
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-3xl mx-auto">
        <p className="text-sm text-amber-900 text-center">
          <span className="font-semibold">Hover</span> over rows or columns to highlight families of operations.
          <span className="font-semibold ml-2">Choose</span> Inward or Outward focus when you hover a cell.
          <span className="font-semibold ml-2">Click</span> any cell to explore it through all 12 lenses.
        </p>
      </div>

      {/* The Matrix Grid */}
      <div className="space-y-4">
        <div className={`text-center text-sm sm:text-base font-semibold uppercase tracking-[0.2em] transition-colors ${
          priorityFocus === 'outward' ? 'text-stone-900' : 'text-stone-400'
        }`}>
          Outward
        </div>
        <div className="flex items-stretch gap-4">
          <div className="flex-shrink-0 flex flex-col items-center justify-center">
            <div
              className={`text-sm sm:text-base font-semibold uppercase tracking-[0.25em] mb-2 transition-colors ${
                priorityFocus === 'inward' ? 'text-stone-900' : 'text-stone-400'
              }`}
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Inward
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2"></th>
                    {operationsData.cols.map((col, idx) => (
                      <th
                        key={col}
                        className="p-2"
                        onMouseEnter={() => setHoveredCol(idx)}
                        onMouseLeave={() => setHoveredCol(null)}
                      >
                        <div className={`font-bold text-sm transition-all ${
                          hoveredCol === idx ? 'text-stone-900 scale-110' : 'text-stone-600'
                        }`}>
                          {col}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {operationsData.rows.map((row, rowIdx) => (
                    <tr key={row}>
                      <td
                        className="p-2 text-right"
                        onMouseEnter={() => setHoveredRow(rowIdx)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <div className={`font-bold text-sm transition-all ${
                          hoveredRow === rowIdx ? 'text-stone-900 scale-110' : 'text-stone-600'
                        }`}>
                          {row}
                        </div>
                      </td>
                  {operationsData.cols.map((col, colIdx) => {
                    const cellData = getCellData(row, col)
                    const isHighlighted = isCellHighlighted(rowIdx, colIdx)
                    const cellKey = getCellKey(row, col)
                    const focusCopy = cellData.focusStatements?.[priorityFocus] ?? cellData.description

                    return (
                      <td
                        key={cellKey}
                        className="p-2"
                        onMouseEnter={() => {
                          setHoveredRow(rowIdx)
                          setHoveredCol(colIdx)
                          setHoveredCellKey(cellKey)
                        }}
                        onMouseLeave={() => {
                          setHoveredRow(null)
                          setHoveredCol(null)
                          setHoveredCellKey(null)
                        }}
                      >
                        <button
                          onClick={() => handleCellClick(row, col)}
                          className={`relative w-full h-24 rounded-lg border-2 transition-all transform hover:scale-105 hover:shadow-lg ${
                            isHighlighted
                              ? 'border-stone-400 shadow-md scale-105'
                              : 'border-stone-200'
                          }`}
                          style={{
                                backgroundColor: isHighlighted
                                  ? cellData.color + '20'
                                  : cellData.color + '10'
                          }}
                        >
                          {hoveredCellKey === cellKey && (
                            <div className="absolute -top-3 right-3 flex gap-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setPriorityFocus('inward')
                                }}
                                className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-widest transition-colors ${
                                  priorityFocus === 'inward'
                                    ? 'bg-stone-900 text-white shadow'
                                    : 'bg-white/80 text-stone-500 border border-stone-200'
                                }`}
                              >
                                In
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setPriorityFocus('outward')
                                }}
                                className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-widest transition-colors ${
                                  priorityFocus === 'outward'
                                    ? 'bg-stone-900 text-white shadow'
                                    : 'bg-white/80 text-stone-500 border border-stone-200'
                                }`}
                              >
                                Out
                              </button>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="font-bold text-base text-stone-900 mb-1">
                              {cellData.name}
                            </div>
                            <div className="text-xs text-stone-600 px-2 line-clamp-2">
                              {focusCopy}
                            </div>
                          </div>
                        </button>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
      </div>
    </div>
  </div>

      {/* Detail Modal */}
      {selectedCell && (
        <OperationDetailModal
          operation={selectedCell.data}
          rowVerb={selectedCell.row}
          colVerb={selectedCell.col}
          onClose={() => closeOperationModal()}
          onSelectOperation={handleConnectedOperationSelect}
        />
      )}
    </div>
  )
}

MetaMatrix.propTypes = {
  selectedLens: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}
