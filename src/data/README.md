# Data Directory Guide

This directory contains all the data and logic that powers the 4×4 Pattern Explorer. Understanding the difference between data files and logic files is crucial for making changes safely.

---

## 📁 File Types

### **Pure Data Files (JSON) - Safe to Edit**

These contain only data and can be edited by non-developers:

#### **lenses.json**
Defines the 13 different perspectives (lenses) for viewing the framework.

**Structure:**
```json
{
  "id": "unique-id",
  "name": "Display Name",
  "color": "#hexcolor",
  "description": "Brief description of this lens",
  "covenant": "custom covenant phrase",
  "gather": "custom gathering phrase",
  "veil": "custom veil phrase",
  "highlightPatterns": [1, 3, 5],
  "highlightOperations": ["WITNESS", "INQUIRE", "HONOR"]
}
```

**What to edit:**
- Add new lenses by adding objects to the array
- Change lens names, colors, or descriptions
- Adjust which patterns/operations each lens highlights
- Modify the three phrase transformations (covenant, gather, veil)

**What NOT to edit:**
- The `lenses` array wrapper
- Field names (only edit values)

---

#### **patterns.json**
Defines the 12 structural patterns that explain framework completeness.

**Structure:**
```json
{
  "id": 1,
  "title": "Pattern Title",
  "subtitle": "Brief subtitle",
  "description": "Full explanation of the pattern",
  "mappings": {
    "category1": ["value1", "value2"],
    "category2": ["value3", "value4"]
  },
  "whyItMatters": "Why this pattern is important",
  "reflectionQuestion": "A question for contemplation",
  "ldsExample": "How this appears in LDS context"
}
```

**What to edit:**
- Add new patterns (increment the ID)
- Modify pattern descriptions and examples
- Update reflection questions
- Adjust pattern mappings to the 4×4 structure

---

### **Logic Files (JavaScript) - Developer Only**

These contain code and logic. Changes require testing:

#### **operationsData.js**
Exports the 16 cognitive operations and the MM4 plan data.

**Contains:**
- `operations` - All 16 operations with descriptions, examples, cross-domain examples
- `planData` - The 4×4 MM4 Ward plan structure
- `rows` and `cols` - The 4 base verbs (OBSERVE, ASK, REMEMBER, IMAGINE)

**When to edit:**
- Adding new cross-domain examples to operations
- Updating operation descriptions or MM4 mappings
- Modifying plan structure or action items

**Requires:** Understanding of the meta-verb matrix structure

---

#### **boundaryContent.js**
Contains content for the Boundary Card feature.

**Contains:**
- Step-by-step content for the 8-step boundary card flow
- Permeability assessments (rigid, semi-permeable, slippery)
- Practice prompts and reflection questions

**When to edit:**
- Updating boundary card flow content
- Modifying practice exercises
- Adjusting curiosity questions

**Requires:** Understanding of the boundary card pedagogy

---

#### **matrixUtils.js**
Utility functions for matrix operations and data processing.

**Contains:**
- `normalizeOperationsData()` - Processes raw operation data
- `validateOperationsData()` - Checks data integrity
- `createPlanData()` - Generates plan data structure
- `flows` - Predefined operation sequences

**When to edit:**
- Adding new utility functions
- Modifying data validation logic
- Creating new operation flows/sequences

**Requires:** Strong JavaScript knowledge

---

#### **operationPlanConnections.js**
Maps operations to MM4 plan actions and creates connections.

**Contains:**
- Operation-to-action mappings
- Connection logic between operations
- Cross-referencing utilities

**When to edit:**
- Updating how operations connect to plan actions
- Modifying connection logic

**Requires:** Understanding of both operations and plan structures

---

## 🎯 Common Tasks

### Adding a New Lens
1. Open `lenses.json`
2. Copy an existing lens object
3. Change: `id`, `name`, `color`, `description`
4. Update: `covenant`, `gather`, `veil` phrases
5. Set: `highlightPatterns` (array of pattern IDs 1-12)
6. Set: `highlightOperations` (array of operation names)
7. Save and test in the app

### Adding a New Pattern
1. Open `patterns.json`
2. Copy an existing pattern object
3. Increment the `id` (if last pattern is 12, use 13)
4. Update all fields with new content
5. Adjust `mappings` to show how it maps to 4×4
6. Save and test in the app

### Modifying Operation Details
1. Open `operationsData.js`
2. Find the operation in the `operations` object
3. Update `description`, `mm4Example`, or `lensExamples`
4. Save and test in the Meta-Matrix view

### Updating Plan Actions
1. Open `operationsData.js`
2. Scroll to `planData` export
3. Find the quadrant (MISSION, TEMPLE, FAMILY_HISTORY, INVITE)
4. Update actions array
5. Save and test in the Plan View

---

## ⚠️ Important Rules

### For JSON Files:
- ✓ Valid JSON syntax (use a validator if unsure)
- ✓ No trailing commas
- ✓ Proper quote marks (double quotes only)
- ✓ Increment IDs when adding new items
- ✓ Test in the app after changes

### For JS Files:
- ✓ Maintain existing structure
- ✓ Test thoroughly after changes
- ✓ Keep JSDoc comments updated
- ✓ Run the app to check for errors
- ✓ Consider asking a developer for review

---

## 🔍 Quick Reference

**To change lens colors:** Edit `color` field in `lenses.json`

**To add a pattern:** Add object to `patterns` array in `patterns.json`

**To update quote transformations:** Edit `covenant`, `gather`, `veil` in `lenses.json`

**To modify operation descriptions:** Edit `operations` in `operationsData.js`

**To update plan actions:** Edit `planData` in `operationsData.js`

**To add boundary card content:** Edit content in `boundaryContent.js`

---

## 📚 Data Model Overview

```
┌─────────────────────────────────────┐
│         13 LENSES                   │ ← lenses.json
│    (Perspectives/Viewpoints)        │
│                                     │
│  Each lens highlights:              │
│  - Certain patterns                 │
│  - Certain operations               │
└──────────────┬──────────────────────┘
               │
               ├─────────────────────┐
               │                     │
               ↓                     ↓
    ┌──────────────────┐  ┌──────────────────┐
    │  12 PATTERNS     │  │  16 OPERATIONS   │
    │  (Structure)     │  │  (Function)      │
    │                  │  │                  │
    │  patterns.json   │  │  operationsData  │
    └──────────────────┘  └──────────────────┘
                             │
                             ↓
                      ┌──────────────────┐
                      │   MM4 PLAN       │
                      │   (Application)  │
                      │                  │
                      │   operationsData │
                      └──────────────────┘
```

---

## 🆘 Troubleshooting

### App won't load after editing JSON
- Check for syntax errors (trailing commas, missing quotes)
- Use a JSON validator: https://jsonlint.com/
- Revert changes and try again

### Lens not appearing
- Verify `id` is unique
- Check that `color` is a valid hex code
- Ensure all required fields are present

### Pattern not showing
- Check `id` is unique and sequential
- Verify `mappings` object is valid
- Make sure at least one lens highlights it

### Operation changes not reflecting
- Clear browser cache
- Restart dev server (`npm run dev`)
- Check browser console for errors

---

## 💡 Best Practices

1. **Always backup before editing** - Copy the file first
2. **Test after each change** - Don't make multiple changes at once
3. **Use a JSON validator** - Catch syntax errors early
4. **Keep IDs sequential** - Makes tracking easier
5. **Write clear descriptions** - Future you will thank you
6. **Check browser console** - Errors will show there
7. **Ask for help** - If unsure, consult a developer

---

*For more information, see the main DEVELOPER-GUIDE.md in the project root.*
