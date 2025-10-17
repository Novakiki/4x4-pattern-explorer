#!/bin/bash

# Cleanup script to remove all axes-related files

echo "Removing axes-related files..."

# Remove data file
rm -f src/data/axes.json
echo "✓ Removed axes.json"

# Remove hook
rm -f src/hooks/useAxisCatalog.js
echo "✓ Removed useAxisCatalog.js"

# Remove components
rm -f src/components/AxisDetailModal.jsx
echo "✓ Removed AxisDetailModal.jsx"

rm -f src/components/AxisSelector.jsx
echo "✓ Removed AxisSelector.jsx"

echo ""
echo "Done! All axes-related files have been removed."
echo ""
echo "Files modified:"
echo "  - src/components/PatternDetail.jsx (removed axis integration)"
echo "  - src/data/lenses.json (removed highlightAxes fields)"
echo ""
echo "Next steps:"
echo "  1. Test the app: npm run dev"
echo "  2. Verify everything works without axes"
echo "  3. Commit changes: git add . && git commit -m 'Remove axes system, simplify to lenses → patterns → meta-matrix'"
