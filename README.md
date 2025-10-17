# 4×4 Pattern Explorer

An interactive web application for exploring the MM4th Ward 4×4 Plan through 12 different lenses and patterns.

## 🌟 Features

- **13 Lens Perspectives**: View the framework through LDS, Psychological, Ecological, Therapeutic, Philosophical, Ancestral, Developmental, Relational, Creative, Mystical, Scientific, Justice-Oriented, and Contemplative lenses
- **12 Deep Patterns**: Explore the underlying patterns that make the 4×4 framework complete
- **Interactive Experience**: Click through patterns, switch lenses, and see the plan transform
- **Shareable URLs**: Share specific lens views or patterns with others
- **Mobile-Responsive**: Beautiful on all devices
- **Fast & Lightweight**: Built with React + Vite for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Local Development

1. **Clone and install:**
```bash
cd 4x4_matrix
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open in browser:**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🚂 Deploy to Railway

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect the configuration and deploy

### Method 2: Railway CLI

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login and deploy:**
```bash
railway login
railway init
railway up
```

### Environment Variables

No environment variables are required! The app is fully self-contained.

## 📱 Generating QR Code

Once deployed, you can generate a QR code for your Railway URL:

**Online Tools:**
- [QR Code Generator](https://www.qr-code-generator.com/)
- [QRCode Monkey](https://www.qrcode-monkey.com/)

**Or use this npm package:**
```bash
npm install -g qrcode-terminal
qrcode-terminal <your-railway-url>
```

## 🎨 Customization

### Adding New Lenses

Edit `src/data/lenses.json`:

```json
{
  "id": "your-lens-id",
  "name": "Your Lens Name",
  "covenant": "custom covenant phrase",
  "gather": "custom gathering phrase",
  "color": "#hexcolor",
  "description": "Brief description"
}
```

### Adding New Patterns

Edit `src/data/patterns.json` to add more patterns.

### Styling

- Colors and theme: `tailwind.config.js`
- Global styles: `src/index.css`
- Component-specific styles: inline Tailwind classes

## 📂 Project Structure

```
4x4_matrix/
├── src/
│   ├── components/          # React components
│   │   ├── LensSelector.jsx
│   │   ├── QuoteDisplay.jsx
│   │   ├── PatternMatrix.jsx
│   │   ├── PatternDetail.jsx
│   │   ├── PlanView.jsx
│   │   ├── MetaMatrix.jsx
│   │   ├── BoundaryCard.jsx
│   │   └── ...
│   ├── data/               # Data files
│   │   ├── lenses.json          # Pure data (editable)
│   │   ├── patterns.json        # Pure data (editable)
│   │   ├── operationsData.js    # Operations + plan data
│   │   ├── boundaryContent.js   # Boundary card content
│   │   └── matrixUtils.js       # Utility functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── railway.json            # Railway deployment config
└── package.json            # Dependencies
```

## 🔗 URL Parameters

Share specific views using URL parameters:

- `?lens=psychological` - Opens with a specific lens selected
- `?pattern=3` - Opens directly to pattern #3
- `?lens=mystical&pattern=7` - Combines both

## 🐛 Troubleshooting

### Build fails on Railway

Make sure your `railway.json` is configured correctly. Railway should automatically detect the Vite project.

### Styles not loading

Ensure Tailwind is properly configured and `npm install` completed successfully.

### Data not showing

Check that all JSON files in `src/data/` are valid JSON (no trailing commas, proper quotes).

## 📝 License

This project is created for the MM4th Ward community.

## 🙏 Acknowledgments

- Inspired by President Russell M. Nelson's teaching on gathering Israel
- Framework developed by the MM4th Ward leadership
- Deeper patterns discovered through contemplative study

## 💬 Support

For questions or issues, contact your ward leadership or the project maintainer.

---

**Remember:** The pattern itself is what's sacred, not any particular practice. 
Choose what resonates with where you are right now.
