#!/bin/bash

# Quick verification that all axis references are removed

echo "🔍 Checking for remaining axis references..."
echo ""

# Check for axis imports
echo "Checking for axis imports in JS/JSX files..."
AXIS_IMPORTS=$(find src -name "*.js" -o -name "*.jsx" | xargs grep -l "Axis" 2>/dev/null | grep -v "node_modules" || true)

if [ -z "$AXIS_IMPORTS" ]; then
  echo "✓ No axis imports found"
else
  echo "⚠ Files still referencing Axis:"
  echo "$AXIS_IMPORTS"
fi

echo ""

# Check for useAxisCatalog usage
echo "Checking for useAxisCatalog usage..."
USE_AXIS=$(grep -r "useAxisCatalog" src 2>/dev/null || true)

if [ -z "$USE_AXIS" ]; then
  echo "✓ No useAxisCatalog usage found"
else
  echo "⚠ useAxisCatalog still being used:"
  echo "$USE_AXIS"
fi

echo ""

# Check for highlightAxes in lenses.json
echo "Checking lenses.json for highlightAxes..."
HIGHLIGHT_AXES=$(grep "highlightAxes" src/data/lenses.json 2>/dev/null || true)

if [ -z "$HIGHLIGHT_AXES" ]; then
  echo "✓ No highlightAxes found in lenses.json"
else
  echo "⚠ highlightAxes still in lenses.json:"
  echo "$HIGHLIGHT_AXES"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Summary:"
echo "  - All axis references should be removed"
echo "  - App should be simplified to: Lenses → Patterns → Meta-Matrix"
echo ""
echo "Next: Run 'npm run dev' to test the app"
