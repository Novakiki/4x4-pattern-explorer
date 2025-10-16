# ✅ PRE-DEPLOYMENT CHECKLIST

Run through this checklist before deploying to make sure everything works!

## 📋 Installation Test

```bash
cd 4x4-lens-explorer
npm install
```

**Expected:** All packages install without errors

✅ Success: Moves to next step
❌ Error: Check that you have Node.js 18+ installed

---

## 🚀 Development Server Test

```bash
npm run dev
```

**Expected:** Server starts on http://localhost:3000

✅ Success: Browser opens automatically or you can visit the URL
❌ Error: Check that port 3000 is not already in use

---

## 🧪 Functionality Tests

Open http://localhost:3000 and test each feature:

### 1. Lens Selector
- [ ] Dropdown opens when clicked
- [ ] All 13 lenses are visible
- [ ] Clicking a lens changes the view
- [ ] Selected lens is highlighted
- [ ] Dropdown closes after selection

### 2. Quote Display
- [ ] Quote is visible and readable
- [ ] Highlighted phrases match selected lens
- [ ] Lens color shows in the display
- [ ] Quote attribution shows "President Russell M. Nelson"

### 3. Pattern Matrix
- [ ] All 12 patterns display in grid
- [ ] On mobile: 1 column
- [ ] On tablet: 2 columns  
- [ ] On desktop: 3 columns
- [ ] Hover effects work
- [ ] Clicking opens pattern detail

### 4. Pattern Detail Page
- [ ] Pattern information is complete
- [ ] Mapping section shows all items
- [ ] Reflection question displays
- [ ] Back button works
- [ ] Layout is readable on mobile

### 5. Plan View
- [ ] "View the 4×4 Plan" button works
- [ ] All 4 quadrants display
- [ ] Each quadrant has correct color
- [ ] Actions list properly
- [ ] Universal translations show (non-LDS lenses)
- [ ] Goal boxes render
- [ ] Back button works

### 6. URL Sharing
- [ ] Try: `?lens=psychological`
- [ ] Try: `?pattern=7`
- [ ] Try: `?lens=mystical&pattern=3`
- [ ] Each loads the correct view

---

## 🏗️ Build Test

```bash
npm run build
```

**Expected:** Build completes successfully, creates `dist/` folder

✅ Success: "Build completed" message
❌ Error: Check console for specific error

---

## 👀 Production Preview Test

```bash
npm run preview
```

**Expected:** Production build serves on http://localhost:4173

- [ ] App loads
- [ ] All features work same as dev
- [ ] No console errors
- [ ] Images/fonts load correctly

---

## 📱 Mobile Test

Test on actual mobile device or use browser DevTools:

**iPhone SE (375px width):**
- [ ] Layout doesn't break
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Dropdowns work

**iPad (768px width):**
- [ ] Grid adjusts to 2 columns
- [ ] Spacing looks good
- [ ] No horizontal scroll

---

## 🎨 Visual Check

- [ ] Fonts load correctly (Inter and Lora)
- [ ] Colors match design (stone grays, lens colors)
- [ ] No layout shifts on page load
- [ ] Smooth transitions and animations
- [ ] Proper spacing throughout

---

## 📊 Data Validation

Open DevTools Console, check for:

- [ ] No red errors
- [ ] No warnings (except Vite HMR in dev)
- [ ] JSON data loads properly
- [ ] All images referenced exist

---

## 🔗 Link Tests

- [ ] All internal navigation works
- [ ] Back buttons return to correct view
- [ ] No broken links
- [ ] URL updates correctly

---

## ⚡ Performance Check

In DevTools Network tab:

- [ ] Initial page load < 1 second (on dev server)
- [ ] No failed requests
- [ ] No duplicate requests
- [ ] Reasonable bundle size

---

## 🎯 Content Check

Review actual content for:

- [ ] No typos in quotes
- [ ] Pattern descriptions are complete
- [ ] All 13 lenses have descriptions
- [ ] Action items are clear
- [ ] Reflection questions make sense

---

## 🚂 Railway Preparation

Before deploying:

- [ ] All files committed to git
- [ ] .gitignore excludes node_modules
- [ ] package.json has correct scripts
- [ ] railway.json exists
- [ ] README.md is complete

---

## ✨ Final Checks

- [ ] Everything works in dev
- [ ] Build completes successfully
- [ ] Preview works in production mode
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Ready to deploy!

---

## 🎉 You're Ready!

If all checks pass, proceed to deployment following DEPLOYMENT-GUIDE.md

If any checks fail:
1. Note which check failed
2. Check the error message
3. Review the README.md troubleshooting section
4. Fix the issue
5. Run checks again

---

**Pro Tip:** Test in multiple browsers if possible:
- Chrome/Edge (Chromium)
- Safari (WebKit)  
- Firefox (Gecko)

The app should work in all modern browsers!
