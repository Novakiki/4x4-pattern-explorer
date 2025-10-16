# 🚀 QUICK DEPLOYMENT GUIDE

## Your app is ready! Here's how to get it online in 10 minutes:

### ✅ STEP 1: Download Your Project

Your complete app is ready in the `/mnt/user-data/outputs/4x4-lens-explorer` folder.

### ✅ STEP 2: Upload to GitHub

1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like "4x4-pattern-explorer"
3. Make it **public** (so Railway can access it)
4. Don't initialize with README (you already have one!)

On your computer:
```bash
cd path/to/4x4-lens-explorer
git init
git add .
git commit -m "Initial commit: 4x4 Pattern Explorer"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### ✅ STEP 3: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Sign up/login (can use GitHub)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your `4x4-pattern-explorer` repository
6. Railway will automatically:
   - Detect it's a Node.js/Vite project
   - Install dependencies
   - Build the production version
   - Deploy it!

### ✅ STEP 4: Get Your URL

1. After deployment finishes (2-3 minutes), click your project
2. Go to the **"Settings"** tab
3. Click **"Generate Domain"** under "Networking"
4. Your app will be live at something like: `your-app.up.railway.app`

### ✅ STEP 5: Create QR Code

Option A - Online:
1. Go to [qrcode-monkey.com](https://www.qrcode-monkey.com/)
2. Paste your Railway URL
3. Download as PNG
4. Add to your poster!

Option B - Command line:
```bash
npm install -g qrcode-terminal
qrcode-terminal https://your-app.up.railway.app
```

---

## 📱 What You Have

Your app includes:
- ✅ 13 different lens perspectives
- ✅ 12 deep patterns to explore
- ✅ Interactive 4×4 plan viewer
- ✅ Shareable URLs for specific lenses
- ✅ Beautiful, mobile-responsive design
- ✅ Fast loading (optimized with Vite)

---

## 🎯 Testing Locally First

Want to test before deploying?

```bash
cd 4x4-lens-explorer
npm install
npm run dev
```

Open http://localhost:3000 in your browser!

---

## 🔧 Customization

All the data is in easy-to-edit JSON files:

- **src/data/lenses.json** - Add/edit lenses
- **src/data/patterns.json** - Add/edit patterns
- **src/data/plan.json** - Modify the 4×4 plan

Just edit, commit, push - Railway will auto-redeploy!

---

## 💡 Pro Tips

1. **Custom Domain**: Railway lets you add your own domain (like mm4th.org)
2. **Free Tier**: Railway's free tier is generous - perfect for this use case
3. **Analytics**: Add Google Analytics by editing `index.html`
4. **Sharing**: Each lens has a unique URL like `?lens=mystical`

---

## 🎉 You're Done!

Total time: **~10 minutes**

Your ward members can now scan a QR code and explore the 4×4 plan through 13 different lenses, discovering the 12 deep patterns that make it work.

**Questions?** Everything is documented in the README.md file.

The pattern itself is the teacher. 🙏
