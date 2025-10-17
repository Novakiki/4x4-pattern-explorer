# Developer Guide: Pattern Behind the Plan

## Quick Start

```bash
npm install
npm run dev
# Visit http://localhost:5173
```

---

## What This Application Does

An interactive web application that helps users explore the MM4 Ward 4×4 Plan through multiple perspectives (focuses/lenses), revealing universal patterns and the Meta-Matrix of 16 fundamental cognitive operations.

### Core Features

1. **Focus/Lens Selector** - View the teaching through 13 different perspectives
2. **Quote Display** - Dynamic quote transformation based on selected focus
3. **4×4 Plan View** - See the complete plan with focus-specific language
4. **Pattern Matrix** - Explore 12 patterns that explain structural completeness
5. **Meta-Matrix Explorer** - Discover the 16 fundamental cognitive operations
6. **Boundary Cards** - Practice-oriented interface for working with beliefs (in development)

---

## Architecture Overview

### Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **No backend** - Pure client-side, local-first application

### Project Structure

```
/4x4_matrix/
├── src/
│   ├── App.jsx                          # Main app with routing logic
│   ├── components/
│   │   ├── FocusSelector.jsx            # Dropdown for selecting focuses
│   │   ├── QuoteDisplay.jsx             # Transforms quote based on focus
│   │   ├── PlanView.jsx                 # Displays 4×4 plan grid
│   │   ├── PatternMatrix.jsx            # Grid of 12 patterns
│   │   ├── PatternDetail.jsx            # Deep dive into single pattern
│   │   ├── MetaMatrix.jsx               # 4×4 cognitive operations matrix
│   │   ├── MetaphorSelector.jsx         # Metaphor chooser (for patterns)
│   │   ├── OperationDetailModal.jsx     # Modal for operation details
│   │   ├── BoundaryCard.jsx             # Belief boundary interface
│   │   └── BoundaryCardSections.jsx     # Sub-components for boundary card
│   └── data/
│       ├── lenses.json                  # 13 focuses/lenses definitions
│       ├── patterns.json                # 12 structural patterns
│       ├── operationsData.js            # 16 operations + MM4 plan data
│       ├── operationPlanConnections.js  # Maps operations to plan actions
│       ├── boundaryContent.js           # Content for boundary card flow
│       └── matrixUtils.js               # Helper functions for matrix logic
├── DEVELOPER-GUIDE.md                   # This file
├── DEPLOYMENT-GUIDE.md                  # How to deploy to production
├── TEST-CHECKLIST.md                    # Testing procedures
├── README.md                            # Technical reference
├── META-MATRIX-CONCEPT.md               # Meta-Matrix concept documentation
└── META-MATRIX-MM4-MAPPING.md           # MM4 → operations mapping
```

---

## Data Model

### Focuses/Lenses (`src/data/lenses.json`)

Each focus represents a different perspective on the same teaching:

```json
{
  "id": "therapeutic",
  "name": "Therapeutic",
  "color": "emerald",
  "description": "Framing as healing and integration",
  "covenant": "make and keep covenants",
  "gather": "gathering Israel",
  "veil": "on either side of the veil",
  "highlightPatterns": [6, 8, 12],
  "highlightOperations": ["WITNESS", "EXAMINE", "RECOGNIZE", "DISCERN"]
}
```

**Key fields:**
- `highlightPatterns` - Which of 12 patterns this focus emphasizes
- `highlightOperations` - Which of 16 operations this focus emphasizes
- `covenant`, `gather`, `veil` - Transform quote language

### Patterns (`src/data/patterns.json`)

12 structural patterns that explain why the framework is complete:

```json
{
  "id": 6,
  "title": "Action-Contemplation Rhythm",
  "subtitle": "Respecting the need for both doing and being",
  "description": "...",
  "mappings": {
    "do": ["Mission", "Temple"],
    "be": ["Family History", "Invite"]
  },
  "whyItMatters": "...",
  "reflectionQuestion": "...",
  "ldsExample": "..."
}
```

### Operations (`src/data/operationsData.js`)

16 cognitive operations arranged in a 4×4 matrix:

```javascript
{
  WITNESS: {
    name: "WITNESS",
    combination: "Observe × Observe",
    description: "Pure attention, direct perception",
    row: "OBSERVE",
    col: "OBSERVE",
    mm4Example: {
      action: "BE a friend",
      quadrant: "MISSION",
      bridge: "Pure attention to them—no agenda, just presence"
    }
  }
}
```

**Matrix structure:**
- **Rows** (verb 1): OBSERVE, ASK, REMEMBER, IMAGINE
- **Columns** (verb 2): OBSERVE, ASK, REMEMBER, IMAGINE
- **Cells**: 16 operations formed by row × column combinations

### Plan Data (`src/data/operationsData.js`)

The 4×4 MM4 Ward Plan:

```javascript
{
  MISSION: {
    title: "Mission",
    color: "blue",
    actions: [
      { id: "m1", operation: "WITNESS", lds: "BE a friend", universal: "Show up with presence" },
      // ...
    ]
  }
}
```

---

## User Flow

### 1. Homepage View (`view: 'home'`)

```
┌─────────────────────────┐
│   Focus Selector        │ ← User selects focus/lens
├─────────────────────────┤
│   Quote Display         │ ← Quote transforms based on focus
├─────────────────────────┤
│   4×4 Plan View         │ ← Shows plan with focus-specific language
├─────────────────────────┤
│   Pattern Matrix        │ ← Shows 12 patterns (highlights based on focus)
└─────────────────────────┘
```

### 2. Pattern Detail View (`view: 'pattern'`)

User clicks a pattern → Full explanation with:
- Pattern description
- How it maps to the 4×4 framework
- Why it matters
- LDS example
- Reflection question

### 3. Meta-Matrix View (`view: 'matrix'`)

User clicks "Explore Meta-Matrix" → 4×4 grid showing:
- 16 cognitive operations
- Highlighted operations based on selected focus
- Click any operation → Modal with details + MM4 example
- Hover row/column → Highlight all operations in that row/column

---

## Key Components

### App.jsx

**State management:**
- `selectedFocus` - Currently selected lens
- `selectedPattern` - Currently viewed pattern (if in pattern view)
- `view` - Current view: 'home' | 'pattern' | 'matrix'

**URL handling:**
- Reads `?focus=psychological` on load
- Reads `?pattern=7` on load
- Updates URL when state changes

### FocusSelector.jsx

Dropdown for selecting focuses. Shows:
- Focus name
- Focus color indicator
- Description on hover

### QuoteDisplay.jsx

Dynamically transforms President Nelson's quote based on selected focus:
- Replaces "covenants" with focus-specific `covenant` phrase
- Replaces "gathering Israel" with `gather` phrase
- Replaces "on either side of the veil" with `veil` phrase

### MetaMatrix.jsx

4×4 grid of operations with:
- **Focus selector** - Switch focus to see different operation highlights
- **Row/column headers** - Hover to highlight entire row/column
- **Cells** - Click to open detail modal
- **Visual hierarchy:**
  - Normal: subtle background color
  - Hovered row/column: stronger color
  - Focused (from lens): thick border + ring + scale effect

### BoundaryCard.jsx

Multi-step interface for working with beliefs as boundaries:
1. Name the belief
2. Assess permeability (rigid/semi-permeable/slippery)
3. Explore curiosity questions
4. Practice with different permeabilities

(Currently in development - see Boundary Card docs in previous session)

---

## Styling System

### Tailwind Configuration

Colors defined per focus in `tailwind.config.js`:
- `blue` - MM4 ward focus
- `emerald` - Therapeutic focus
- `amber` - Ecological focus
- etc.

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Touch-friendly buttons and interactions

### Visual Design Principles

1. **Contemplative** - Lots of white space, serif fonts for quotes
2. **Minimal** - No clutter, clear hierarchy
3. **Subtle** - Color accents, not overwhelming
4. **Accessible** - Good contrast, clear typography

---

## Data Flow

### Focus Selection Flow

```
User selects focus
    ↓
FocusSelector calls onFocusChange(focus)
    ↓
App.jsx updates selectedFocus state
    ↓
App.jsx updates URL with ?focus=id
    ↓
QuoteDisplay re-renders with new covenant/gather/veil phrases
    ↓
PlanView re-renders with focus-aware language
    ↓
PatternMatrix highlights different patterns
    ↓
MetaMatrix highlights different operations
```

### Pattern Click Flow

```
User clicks pattern in PatternMatrix
    ↓
PatternMatrix calls onPatternClick(pattern)
    ↓
App.jsx updates selectedPattern and view='pattern'
    ↓
App.jsx updates URL with ?pattern=id
    ↓
PatternDetail component renders
```

### Meta-Matrix Operation Click Flow

```
User clicks operation cell in MetaMatrix
    ↓
MetaMatrix opens OperationDetailModal
    ↓
Modal shows: operation details, MM4 example, cross-domain examples
    ↓
User closes modal (stays in matrix view)
```

---

## Local Development

### Running Locally

```bash
npm run dev        # Start dev server (localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
```

### Testing

See `TEST-CHECKLIST.md` for comprehensive testing procedures.

**Quick smoke test:**
1. Load homepage - should show focus selector
2. Switch focus - quote should transform
3. Click pattern - should show detail view
4. Click "Explore Meta-Matrix" - should show 4×4 grid
5. Switch focus in matrix - operations should highlight

---

## Deployment

See `DEPLOYMENT-GUIDE.md` for full deployment instructions.

**Quick deploy to Railway:**
1. Push to GitHub
2. Connect Railway to repo
3. Railway auto-detects Vite config
4. Deploys at `<project-name>.up.railway.app`

---

## Extending the Application

### Adding a New Focus/Lens

1. Edit `src/data/lenses.json`
2. Add new focus object with:
   - Unique `id`
   - `name`, `color`, `description`
   - `covenant`, `gather`, `veil` phrases
   - `highlightPatterns` array (pattern IDs 1-12)
   - `highlightOperations` array (operation names)

### Adding a New Pattern

1. Edit `src/data/patterns.json`
2. Add new pattern object with:
   - Unique `id`
   - `title`, `subtitle`, `description`
   - `mappings` (how it maps to 4×4 structure)
   - `whyItMatters`, `reflectionQuestion`, `ldsExample`

### Modifying Operations

1. Edit `src/data/operationsData.js`
2. Update `operationsData.operations` object
3. Each operation needs:
   - `name`, `combination`, `description`
   - `row`, `col` (for matrix position)
   - `mm4Example` (MM4 Ward application)

---

## Key Concepts

### The Three-Layer Structure

```
13 FOCUSES/LENSES
    ↓ emphasize
12 PATTERNS (structural completeness)
    ↓ reveal
16 OPERATIONS (functional completeness)
```

- **Lenses** = Different perspectives on the same teaching
- **Patterns** = Why the 4×4 structure is complete (structural)
- **Operations** = What you actually do (functional)

### The Meta-Matrix Discovery

The 4×4 framework is not arbitrary - it's a **meta-verb matrix** where 4 fundamental verbs combine with themselves and each other to create 16 cognitive operations:

- **OBSERVE** × **OBSERVE** = WITNESS
- **OBSERVE** × **ASK** = INQUIRE
- **OBSERVE** × **REMEMBER** = REFLECT
- **OBSERVE** × **IMAGINE** = ENVISION
- (etc. for all 16 combinations)

Every action in the MM4 plan maps to exactly one of these 16 operations.

### Universal Translation

The operations are universal - they work across domains:
- Therapy uses certain operations
- Science uses certain operations
- Art uses certain operations
- MM4 Ward work uses all 16 operations

This makes the framework translatable across contexts.

---

## Common Tasks

### Change the default focus

Edit `src/App.jsx` line 13:
```javascript
const [selectedFocus, setSelectedFocus] = useState(lensesData.lenses[0])
```

### Add a new color scheme

Edit `tailwind.config.js` and add to `theme.extend.colors`:
```javascript
'custom-color': {
  50: '#...',
  // ... through 900
}
```

### Modify the quote

Edit `src/components/QuoteDisplay.jsx` to change the base quote text.

### Update MM4 plan actions

Edit `src/data/operationsData.js` in the `planData` object.

---

## Troubleshooting

### Focus changes but quote doesn't transform

Check that the focus has valid `covenant`, `gather`, and `veil` fields in `lenses.json`.

### Operations not highlighting in Meta-Matrix

Check that:
1. Focus has `highlightOperations` array in `lenses.json`
2. Operation names match exactly (case-sensitive) with `operationsData.js`

### Pattern not showing correctly

Verify `id` in `patterns.json` is unique and matches references in `highlightPatterns` arrays.

---

## Documentation Map

- **DEVELOPER-GUIDE.md** (this file) - Complete developer reference
- **DEPLOYMENT-GUIDE.md** - How to deploy to production
- **TEST-CHECKLIST.md** - Testing procedures
- **README.md** - Technical quickstart
- **META-MATRIX-CONCEPT.md** - Deep dive into the Meta-Matrix concept
- **META-MATRIX-MM4-MAPPING.md** - How MM4 plan maps to 16 operations

---

## Philosophy & Pedagogy

### Design Principles

1. **Meet people where they are** - Multiple lenses for different perspectives
2. **Reveal, don't teach** - Let users discover patterns themselves
3. **Universal, not replacement** - Show the universal wisdom in the specific teaching
4. **Practice-oriented** - Not just concepts, but operations to practice
5. **Local-first** - No backend, no accounts, no tracking

### Teaching Strategy

The app doesn't tell users what to think - it provides:
- Multiple perspectives (focuses)
- Structural patterns (why it's complete)
- Functional operations (what you actually do)
- Reflection questions (personal application)

Users discover insights themselves through exploration.

---

## Next Steps for Development

### Near-term
- Complete Boundary Card implementation
- Add local storage for user preferences
- Create print-friendly views

### Mid-term
- Personal operation assessments
- Practice exercises for each operation
- Progress tracking

### Long-term
- Cross-domain mapping tools
- Operation curriculum builder
- Community sharing features

---

## Questions?

Refer to:
1. This guide for architecture and data model
2. `DEPLOYMENT-GUIDE.md` for deployment
3. `TEST-CHECKLIST.md` for testing
4. `META-MATRIX-CONCEPT.md` for conceptual background
5. Source code comments for implementation details

The codebase is designed to be simple and maintainable. Most changes only require editing JSON data files.

---

*Last updated: 2025-10-17*
*Current architecture: Focuses → Patterns → Operations → Meta-Matrix*
