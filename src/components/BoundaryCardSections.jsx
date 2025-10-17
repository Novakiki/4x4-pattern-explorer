import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * TextEntry section - for belief capture
 */
export function TextEntrySection({ section, value, onChange, onAction }) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{section.title}</h3>
        {section.helper && (
          <p className="text-sm text-stone-600 italic mb-3">{section.helper}</p>
        )}
      </div>

      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={section.placeholder}
        className="w-full min-h-[100px] p-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 resize-none"
      />

      {section.suggestions && (
        <div className="space-y-2">
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-sm text-stone-600 hover:text-stone-900 font-medium"
          >
            {showSuggestions ? '↑ Hide suggestions' : '→ Need a prompt?'}
          </button>
          {showSuggestions && (
            <div className="flex flex-wrap gap-2">
              {section.suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => onChange(suggestion)}
                  className="text-xs px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => onAction(section.actions[0].id)}
          disabled={!value}
          className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {section.actions[0].label}
        </button>
      </div>
    </div>
  )
}

TextEntrySection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    helper: PropTypes.string,
    placeholder: PropTypes.string,
    suggestions: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
}

/**
 * MultiSelect section - for origin tags
 */
export function MultiSelectSection({ section, value = [], onChange, onAction }) {
  const [selectedCoach, setSelectedCoach] = useState(null)

  const toggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)

    // Show coach for this option
    const option = section.options.find(opt => opt.value === optionValue)
    if (option && option.coach && newValue.includes(optionValue)) {
      setSelectedCoach(option.coach)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{section.title}</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {section.options.map((option) => (
          <button
            key={option.value}
            onClick={() => toggleOption(option.value)}
            className={`px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm ${
              value.includes(option.value)
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {selectedCoach && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900 italic">{selectedCoach}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => onAction(section.actions[0].id)}
          disabled={value.length === 0}
          className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {section.actions[0].label}
        </button>
      </div>
    </div>
  )
}

/**
 * SingleSelect section - for permeability
 */
export function SingleSelectSection({ section, value, onChange, onAction }) {
  const [hoveredOption, setHoveredOption] = useState(null)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{section.title}</h3>
      </div>

      <div className="space-y-3">
        {section.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            onMouseEnter={() => setHoveredOption(option.value)}
            onMouseLeave={() => setHoveredOption(null)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              value === option.value
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">{option.label}</span>
              {value === option.value && (
                <span className="text-xl">✓</span>
              )}
            </div>
            <p className={`text-sm ${value === option.value ? 'text-white/80' : 'text-stone-600'}`}>
              {option.description}
            </p>
          </button>
        ))}
      </div>

      {hoveredOption && section.options.find(o => o.value === hoveredOption)?.coach && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900 italic">
            {section.options.find(o => o.value === hoveredOption).coach}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => onAction(section.actions[0].id)}
          disabled={!value}
          className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {section.actions[0].label}
        </button>
      </div>
    </div>
  )
}

/**
 * SingleSelectWithOptionalRewrite section - for function check
 */
export function SingleSelectWithRewriteSection({ section, value, rewriteValue, onChange, onRewriteChange, onAction }) {
  const showRewrite = value === 'gripping'

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{section.title}</h3>
      </div>

      <div className="space-y-3">
        {section.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              value === option.value
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{option.label}</div>
                <div className={`text-sm ${value === option.value ? 'text-white/80' : 'text-stone-600'}`}>
                  {option.description}
                </div>
              </div>
              {value === option.value && (
                <span className="text-xl">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {showRewrite && (
        <div className="bg-stone-50 border border-stone-300 rounded-lg p-4 space-y-3">
          <p className="text-sm text-stone-700 font-medium">{section.rewritePrompt}</p>
          <textarea
            value={rewriteValue || ''}
            onChange={(e) => onRewriteChange(e.target.value)}
            placeholder={section.rewritePlaceholder}
            className="w-full min-h-[80px] p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 resize-none text-sm"
          />
        </div>
      )}

      <div className="flex justify-end gap-3">
        {showRewrite && rewriteValue && (
          <button
            onClick={() => onAction('adopt-rewrite')}
            className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
          >
            Adopt rewrite
          </button>
        )}
        <button
          onClick={() => onAction('keep-original')}
          disabled={!value}
          className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {showRewrite && rewriteValue ? 'Keep original' : section.actions[0].label}
        </button>
      </div>
    </div>
  )
}

/**
 * Slider section - for placement
 */
export function SliderSection({ section, value = 50, onChange, onAction }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{section.title}</h3>
        <p className="text-sm text-stone-600">{section.description}</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs text-stone-500 font-medium uppercase tracking-wider">
          <span>{section.minLabel}</span>
          <span>{section.maxLabel}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #d6d3d1 0%, #d6d3d1 ${value}%, #e7e5e4 ${value}%, #e7e5e4 100%)`
          }}
        />
        <div className="text-center">
          <span className="text-sm text-stone-700 font-medium">
            {value < 33 ? 'Edge · Under review' : value > 66 ? 'Core · Identity' : 'Middle · Evolving'}
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onAction(section.actions[0].id)}
          className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
        >
          {section.actions[0].label}
        </button>
      </div>
    </div>
  )
}

/**
 * ConditionalField section - for experiments
 */
export function ConditionalFieldSection({ section, value, onChange, reminder, onReminderChange, onAction, permeability }) {
  const variant = section.variants[permeability] || section.variants.semi_permeable

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{section.title}</h3>
        <p className="text-sm text-stone-600">{variant.prompt}</p>
      </div>

      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={variant.placeholder}
        className="w-full min-h-[80px] p-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 resize-none"
      />

      {section.reminderToggle && (
        <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
          <input
            type="checkbox"
            checked={reminder}
            onChange={(e) => onReminderChange(e.target.checked)}
            className="w-4 h-4 rounded border-stone-300"
          />
          <span>{section.reminderToggle.label}</span>
        </label>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => onAction(section.actions[0].id)}
          disabled={!value}
          className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {section.actions[0].label}
        </button>
      </div>
    </div>
  )
}

/**
 * BreathPractice section - for stillness
 */
export function BreathPracticeSection({ section, onAction }) {
  const [currentCycle, setCurrentCycle] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const startPractice = () => {
    setIsActive(true)
    setCurrentCycle(0)

    let cycle = 0
    const interval = setInterval(() => {
      cycle++
      setCurrentCycle(cycle)
      if (cycle >= section.cycles) {
        clearInterval(interval)
        setIsActive(false)
      }
    }, 4000) // 4 seconds per breath cycle
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{section.title}</h3>
        <p className="text-sm text-stone-600">{section.instructions}</p>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
        {!isActive && currentCycle === 0 && (
          <button
            onClick={startPractice}
            className="px-8 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
          >
            Begin
          </button>
        )}

        {isActive && (
          <div className="text-center space-y-4">
            <div
              className="w-16 h-16 rounded-full bg-stone-400 mx-auto animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <p className="text-sm text-stone-600">
              Breath {currentCycle} of {section.cycles}
            </p>
          </div>
        )}

        {!isActive && currentCycle >= section.cycles && (
          <div className="text-center space-y-4">
            <p className="text-stone-700">Practice complete</p>
            <button
              onClick={() => onAction(section.actions[0].id)}
              className="px-8 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
            >
              {section.actions[0].label}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Recap section - for summary
 */
export function RecapSection({ section, data, onEdit, onAction }) {
  const formatValue = (key, value) => {
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    if (typeof value === 'object' && value !== null) {
      return value.text || JSON.stringify(value)
    }
    if (key === 'placement') {
      return value < 33 ? 'Edge' : value > 66 ? 'Core' : 'Middle'
    }
    return value || '—'
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">Your Boundary Map</h3>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 space-y-4">
        {section.fields.map((field) => (
          <div key={field.key} className="flex justify-between items-start pb-3 border-b border-stone-200 last:border-0 last:pb-0">
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                {field.label}
              </div>
              <div className="text-sm text-stone-900">
                {formatValue(field.key, data[field.key])}
              </div>
            </div>
            <button
              onClick={() => onEdit(field.key)}
              className="text-xs text-stone-600 hover:text-stone-900 ml-4"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-3">
          {section.actions.filter(a => a.id !== 'edit').map((action) => (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-100 transition-colors text-sm font-medium"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {section.footer && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-xs text-amber-900 italic text-center">{section.footer}</p>
        </div>
      )}
    </div>
  )
}

MultiSelectSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        coach: PropTypes.string
      })
    ).isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
}

SingleSelectSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string,
        coach: PropTypes.string
      })
    ).isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
}

SingleSelectWithRewriteSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string
      })
    ).isRequired,
    rewritePrompt: PropTypes.string,
    rewritePlaceholder: PropTypes.string,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  value: PropTypes.string,
  rewriteValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRewriteChange: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
}

SliderSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    minLabel: PropTypes.string.isRequired,
    maxLabel: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
}

ConditionalFieldSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    variants: PropTypes.objectOf(
      PropTypes.shape({
        prompt: PropTypes.string.isRequired,
        placeholder: PropTypes.string
      })
    ).isRequired,
    reminderToggle: PropTypes.shape({
      label: PropTypes.string.isRequired
    }),
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  reminder: PropTypes.bool,
  onReminderChange: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  permeability: PropTypes.string
}

BreathPracticeSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    cycles: PropTypes.number.isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  onAction: PropTypes.func.isRequired
}

RecapSection.propTypes = {
  section: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    footer: PropTypes.string
  }).isRequired,
  data: PropTypes.shape({
    belief_text: PropTypes.string,
    rewrite_text: PropTypes.string,
    origins: PropTypes.arrayOf(PropTypes.string),
    permeability: PropTypes.string,
    function_now: PropTypes.string,
    placement: PropTypes.number,
    experiment: PropTypes.shape({
      text: PropTypes.string,
      reminder: PropTypes.bool
    })
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
}
