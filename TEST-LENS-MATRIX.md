# Quick Test: Lens-Meta-Matrix Integration

## What to Test

The 13 lenses now integrate with the Meta-Matrix, highlighting which of the 16 cognitive operations each lens emphasizes.

## Test Steps

### 1. Start the App
```bash
npm run dev
```

### 2. Homepage Test
- [ ] Select "Therapeutic" from the focus dropdown
- [ ] Quote should transform to therapeutic language
- [ ] Patterns 6, 8, 12 should be highlighted in the pattern grid

### 3. Navigate to Meta-Matrix
- [ ] Click "Explore Meta-Matrix →" button in header
- [ ] Should see the 4×4 matrix with 16 operations
- [ ] "Therapeutic" should be pre-selected in dropdown at top
- [ ] Four operations should have thick colored borders:
  - WITNESS (top-left)
  - EXAMINE (second row, first column)
  - RECOGNIZE (third row, first column)
  - DISCERN (bottom-left)

### 4. Test Lens Switching in Matrix
- [ ] Click the dropdown in Meta-Matrix view
- [ ] Select "Scientific"
- [ ] Highlighting should change to:
  - INQUIRE (top row, second column)
  - EXAMINE (second row, first column)
  - RESEARCH (third row, second column)
  - LEARN (second row, third column)
- [ ] Try "Mystical" - should highlight:
  - WITNESS
  - REFLECT
  - HONOR
  - MANIFEST

### 5. Test Interactions
- [ ] Hover over "OBSERVE" row header
  - All 4 operations in that row should highlight subtly
- [ ] Hover over "ASK" column header
  - All 4 operations in that column should highlight subtly
- [ ] Click any operation cell
  - Modal should open with full details
  - Should show MM4 example
  - Should show cross-domain examples
- [ ] Close modal (X button or click outside)

### 6. Test Persistence
- [ ] Select "Ecological" lens in Meta-Matrix
- [ ] Click "← Back" to return to homepage
- [ ] "Ecological" should still be selected
- [ ] Go back to Meta-Matrix
- [ ] "Ecological" highlights should still be active

### 7. Mobile Test (Optional)
- [ ] Open dev tools, set to mobile viewport
- [ ] All dropdowns should work
- [ ] Matrix should scroll horizontally if needed
- [ ] Touch interactions should work smoothly

## Expected Visual Behavior

### Normal Operations:
- Subtle background color (blue/red/orange/green family)
- Thin 2px border
- Clean, minimal appearance

### Hovered Row/Column:
- Slightly stronger background color
- All operations in that row/column get subtle emphasis
- Border becomes more visible

### Focused Operations (from lens):
- **Thick 4px colored border** (using lens color)
- **Ring effect** around the cell
- **Stronger background saturation**
- **Slight scale-up**
- These should be obviously different from normal operations

### Info Box:
- Below focus selector, amber background
- Shows: "[Lens name] emphasizes: OPERATION, OPERATION, OPERATION, OPERATION"

## What You Should See

### For Each Lens:

**Therapeutic:**
- Operations: WITNESS, EXAMINE, RECOGNIZE, DISCERN
- Rationale: Presence, questioning defenses, acknowledging reality, sensing emergence

**Psychological:**
- Operations: WITNESS, REFLECT, EXAMINE, RECLAIM
- Rationale: Awareness, noticing patterns, questioning, integrating

**Ecological:**
- Operations: INQUIRE, RECOGNIZE, HONOR, RENEW
- Rationale: Observe systems, acknowledge, preserve, restore

**Scientific:**
- Operations: INQUIRE, EXAMINE, RESEARCH, LEARN
- Rationale: Investigate, question, study, understand

**Mystical:**
- Operations: WITNESS, REFLECT, HONOR, MANIFEST
- Rationale: Pure awareness, notice deeply, reverence, actualize

*(etc. - see LENS-MATRIX-INTEGRATION.md for all 13)*

## Known Issues?

If you find any bugs or unexpected behavior:
1. Check browser console for errors
2. Verify `highlightOperations` in `lenses.json` has correct operation names
3. Make sure operation names match exactly (case-sensitive)

## Success Criteria

✅ Can select lens on homepage
✅ Lens persists when navigating to Meta-Matrix
✅ Correct operations are highlighted for each lens
✅ Can change lens in Meta-Matrix view
✅ Highlights update immediately when changing lens
✅ Hover states work independently of focus highlights
✅ Click to open operation details works
✅ Navigation back to home preserves lens selection

---

**If all checks pass, the integration is working perfectly!**

The app now shows how each lens emphasizes different cognitive operations from the universal set of 16.
