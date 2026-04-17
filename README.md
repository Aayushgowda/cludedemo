
# ⚡ SENTINEL — Customer Review Intelligence Platform
### Hack Malenadu '26 | Consumer & Retail Track

---

## 🚀 Quick Start (3 commands)

```bash
npm install
npm run dev
# Open http://localhost:5173
```

---

## 📦 Project Structure

```
sentinel/
├── src/
│   ├── App.jsx          # Main application (all logic + UI)
│   └── main.jsx         # React entry point
├── index.html           # Vite entry
├── vite.config.js       # Vite config
├── package.json
└── README.md
```

---

## 🔑 Claude AI Setup

The AI Analysis tab calls `api.anthropic.com`. To enable it:

1. Get an Anthropic API key from https://console.anthropic.com
2. The app calls Anthropic API directly from the browser in dev mode.
3. For demo at hackathon: Use the Claude.ai artifact environment where key is pre-configured.

> In production, always proxy API calls through a backend to protect your key.

---

## 🎯 What SENTINEL Does

### Layer 1 — Data Ingest & Preprocessing
- **CSV/JSON upload** via FileReader API
- **Manual paste** (one review per line)
- **205+ synthetic reviews** pre-loaded across 3 product categories
- **Deduplication** via 60-character fingerprint hashing
- **Spam detection** via lexical repetition ratio
- **Language detection** — English, Hindi (Devanagari), Hinglish

### Layer 2 — Feature Sentiment Extraction
- 10 product attributes: packaging, motor_power, durability, ease_of_use, delivery, taste, texture, skin_glow, customer_support, value
- Per-feature: positive/negative/neutral + confidence score
- Sarcasm detection via pattern matching
- Ambiguous/sarcastic reviews flagged separately

### Layer 3 — Trend Detection
- Reviews split into batches; complaint velocity calculated per feature
- Threshold: 20%+ rise = Warning | 50%+ rise = Critical
- Seeded packaging complaint trend auto-detected (8% to 42%)
- Distinguishes isolated vs systemic issues

### Dashboard
- KPI cards, sentiment pie, feature bar chart, time-series trend
- Auto-fired critical alerts + prioritized action recommendations
- Full review list with per-review feature badges
- AI deep analysis tab with live Claude API call

---

## 📊 Dataset

| Product | Reviews | Category |
|---------|---------|----------|
| SmartBlend Pro Juicer | 80 | Electronics |
| NutriMax Protein Powder | 70 | FMCG/Health |
| AuraGlow Face Serum | 55 | Beauty |

**Seeded trend:** Packaging complaints jump from 8% to 42% starting Feb 2024. SENTINEL detects automatically.

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React 18 + Vite 5 |
| Charts | Recharts |
| AI Engine | Claude claude-sonnet-4-20250514 (Anthropic) |
| Local NLP | Custom JS keyword + lexical engine |
| Styling | CSS-in-JS |

---

Built with ❤️ by Team SENTINEL | Hack Malenadu '26
