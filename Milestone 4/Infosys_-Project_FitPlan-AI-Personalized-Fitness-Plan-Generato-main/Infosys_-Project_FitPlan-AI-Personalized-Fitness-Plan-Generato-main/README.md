# 🌿 FitPlan AI + Voice Mental Health Assistant

<p align="center">
  <a href="#"><img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black"></a>
  <a href="#"><img alt="Vite" src="https://img.shields.io/badge/Vite-⚡-646CFF?logo=vite&logoColor=white"></a>
  <a href="#"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-16%2B-339933?logo=node.js&logoColor=white"></a>
  <a href="#"><img alt="Express" src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white"></a>
  <a href="#"><img alt="MySQL" src="https://img.shields.io/badge/MySQL-8%2B-4479A1?logo=mysql&logoColor=white"></a>
  <a href="#"><img alt="JWT" src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white"></a>
  <a href="#"><img alt="Chart.js" src="https://img.shields.io/badge/Charts-Chart.js-FF6384?logo=chart.js&logoColor=white"></a>
  <a href="#"><img alt="Web Speech API" src="https://img.shields.io/badge/Voice-Web%20Speech%20API-2B579A"></a>
  <a href="https://github.com/Sayak-Pal/Infosys-Intership-Team-B-2025"><img alt="Repo" src="https://img.shields.io/badge/GitHub-Repo-181717?logo=github&logoColor=white"></a>
</p>

A combined wellbeing prototype:
- 💪 **FitPlan AI**: rule-based **10-week workout & nutrition plan generator** with tracking + dashboards  
- 🧠 **AI Voice Mental Health Assistant (Frontend Prototype)**: voice-enabled supportive chat UI with grounding prompts and resource-linking concepts

> ⚠️ **Safety & Ethics Disclaimer**  
> This project is **experimental** and **not** a replacement for professional mental health care or medical advice.  
> If you are in immediate danger or crisis, contact **local emergency services** or a **crisis hotline** in your country.

---

## ✨ Features

### 💪 FitPlan AI (Fitness + Diet Planner)
- 🗓️ Personalized **10-week** workout & diet plans
- 📈 Weekly progression (intensity increases over time)
- 🥗 Cuisine + goals + restriction/health modifiers
- ✅ Daily workout & meal completion tracking
- 📊 Dashboards with charts (progress visualization)
- 🌗 Responsive UI with light/dark support

### 🧠 AI Voice Mental Health Assistant (Voice UI Prototype)
Located at: `Frontend/public/ai-assistant/`
- 🎙️ Microphone voice input (browser-based)
- 🔊 Speech output / TTS experiments (browser-based)
- 😊 Basic sentiment-aware conversational flow (prototype level)
- 🫁 Grounding / breathing prompts (UI-driven)
- 🔗 Space for mental-health resources & safety guidance (prototype level)

---

## 🧱 Tech Stack

### FitPlan AI
- **Frontend:** React 18, Vite, React Router, Chart.js  
- **Backend:** Node.js, Express  
- **Database:** MySQL 8+ (MySQL2)  
- **Auth:** JWT  
- **Styling:** CSS (custom properties)

### Voice Assistant (Prototype UI)
- **Frontend:** HTML + CSS + JavaScript (served as static files)
- **Voice APIs:** Browser Speech / Web APIs (depending on implementation)

---

## 🗂️ Project Structure

```text
.
├── Backend/                            # Node/Express API + DB integration
│   ├── db.js
│   ├── schema.sql
│   ├── server.js
│   └── routes/
├── Frontend/                           # React client
│   ├── src/
│   ├── public/
│   │   └── ai-assistant/               # Voice mental health assistant (static prototype)
│   │       ├── index.html
│   │       ├── styles.css
│   │       ├── widget.html
│   │       ├── js/
│   │       └── assets/
│   └── package.json
├── exercises/                          # Exercise metadata JSON files
└── README.md
```

---

## 🚀 Quick Start (FitPlan AI)

### ✅ Prerequisites
- Node.js 16+ and npm
- MySQL 8+ (local or remote)

### 1) Backend
1. Create a database + tables using:
   - `Backend/schema.sql`

2. Install dependencies:
```bash
cd Backend
npm install
```

3. Create `.env` inside `Backend/`:
```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fitness_db
PORT=5000
JWT_SECRET=your_secret
```

4. Start the API server:
```bash
npm start
```

### 2) Frontend
```bash
cd Frontend
npm install
npm run dev
```

Open:
- 🌐 FitPlan UI: `http://localhost:5173`
- 🔌 API: `http://localhost:5000`

---

## 🎙️ Run the Voice Mental Health Assistant (Prototype)

### Option A: While React dev server is running (recommended)
```bash
cd Frontend
npm run dev
```

Open:
- `http://localhost:5173/ai-assistant/index.html`

### Option B: Open as a static page
Open:
- `Frontend/public/ai-assistant/index.html`

> Note: Some voice features may work better on `http://localhost` than `file://`.

---

## 📜 License
- FitPlan AI: **ISC**
- Voice Assistant UI: (repo-level license or add a note if different)
