# Meta-Matrix: Universal Patterns Made Personal

An interactive framework for exploring 16 fundamental cognitive operations through 13 different cultural, philosophical, and spiritual lenses.

## 🎯 What This Is

The Meta-Matrix reveals universal patterns in how humans think, observe, question, remember, and imagine. These patterns appear across all wisdom traditions, spiritual practices, scientific frameworks, and philosophical systems - but are usually trapped within specific cultural contexts.

This app liberates those patterns. Users can:
- Explore 16 cognitive operations through their preferred lens (Buddhist, Scientific, Ecological, LDS, etc.)
- See how the same fundamental patterns manifest differently across frameworks
- Use the **Boundary Card** feature to examine and update limiting beliefs
- Discover connections between operations through an interactive matrix

### Origin Story

This project emerged from a Mormon ward's "4x4 Plan" (Mission, Temple, Family History, Invite). While effective, it was culturally specific. This app extracts the underlying cognitive patterns and makes them universally accessible - not by removing the LDS perspective, but by showing how it's one expression of patterns that exist everywhere.

## 🏗️ Architecture

```
src/
├── components/
│   ├── boundary/           # Boundary Card system
│   │   ├── BoundaryCard.jsx
│   │   └── BoundaryCardSections.jsx
│   ├── matrix/            # Core matrix components
│   │   ├── MetaMatrix.jsx
│   │   └── OperationDetailModal.jsx
│   ├── patterns/          # Pattern exploration
│   │   ├── PatternMatrix.jsx
│   │   └── PatternDetail.jsx
│   ├── selectors/         # Lens/orientation selectors
│   │   ├── FocusSelector.jsx
│   │   └── MetaphorSelector.jsx
│   └── plan/             # 4x4 Plan specific views
│       ├── PlanView.jsx
│       └── QuoteDisplay.jsx
├── data/
│   ├── lenses.json        # 13 cultural/philosophical lenses
│   ├── operationsData.js  # 16 operations + lens examples
│   ├── patterns.json      # 12 universal patterns
│   └── boundaryContent.js # Boundary Card flow definitions
└── App.jsx
```

## 🧠 Core Concepts

### The 4x4 Matrix
- **4 verbs**: OBSERVE, ASK, REMEMBER, IMAGINE
- **Combined**: Each verb intersects with itself and the other three
- **Result**: 16 unique cognitive operations (e.g., "Observe × Ask" = Questioning)

### 13 Lenses
Each operation can be viewed through different frameworks:
- LDS (Latter-day Saint)
- Buddhist
- Scientific
- Psychological
- Ecological
- Mystical
- Philosophical
- Artistic
- Social Justice
- Indigenous
- Technological
- Somatic
- Secular Humanist

### Boundary Card (Vertical Practice)
While the matrix explores concepts horizontally, the Boundary Card takes you vertical - into embodied practice. It's an 8-step guided journey:
1. Name a belief
2. Identify its origins
3. Assess its permeability (rigid/semi-permeable/slippery)
4. Check if it's serving you
5. Place it (edge/core/middle of identity)
6. Design an experiment
7. Breath practice
8. Review and integrate

See `BOUNDARY-CARD-VISION.md` for complete documentation.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
npm run dev
```

### Key Dependencies
- React 18
- Vite
- Tailwind CSS

## 📖 Documentation

- `BOUNDARY-CARD-VISION.md` - Complete conceptual framework for Boundary Card
- `BOUNDARY-CARD-QUICK-REF.md` - 30-second overview for quick onboarding
- `BOUNDARY-CARD-TECH-SPEC.md` - Implementation guide with code examples
- `WHY-THIS-EXISTS.md` - Origin story and philosophy
- `USER-GUIDE.md` - User-facing documentation

## 🎨 Design Principles

1. **Lens-neutral by default** - No single worldview is privileged
2. **Subtle, not showy** - Gentle animations, warm earth tones
3. **Membrane metaphor** - Beliefs are boundaries with different permeabilities
4. **Local-first** - User data stays on their device
5. **Progressive disclosure** - Show what's needed when it's needed

## 🔮 Vision & Roadmap

### Current State
- ✅ 16-operation matrix with hover states
- ✅ 13-lens system
- ✅ Operation detail modals
- ✅ Boundary Card flow (8 steps)
- ✅ 12 universal patterns

### Near-term
- [ ] Boundary Card data persistence (localStorage)
- [ ] Archive/history view for completed cards
- [ ] Reminder system for experiments
- [ ] Export/share functionality

### Long-term
- [ ] Mobile app
- [ ] Community patterns library
- [ ] Guided journeys (curated paths through operations)
- [ ] Integration with calendar/habit tracking

## 🤝 Contributing

This is currently a personal project, but contributions that align with the vision are welcome. Key principles:

1. **Respect all lenses** - Never privilege one worldview over another
2. **Accessible language** - Avoid academic jargon
3. **Privacy-first** - User data is sacred
4. **Beauty matters** - Design is part of the message

## 📜 License

[Choose your license - MIT recommended for open source]

## 🙏 Acknowledgments

Inspired by President Russell M. Nelson's teaching on covenant-keeping and gathering, and the recognition that universal patterns deserve universal access.

---

**Questions?** See `WHY-THIS-EXISTS.md` for the philosophical foundation, or `USER-GUIDE.md` for how people actually use this.
