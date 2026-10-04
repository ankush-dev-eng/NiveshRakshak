<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF3B1D&height=120&section=header&text=NIVESHRAKSHAK&fontSize=36&fontColor=F3F1EA&fontAlignY=45&desc=AI-ASSISTED%20FINANCIAL%20SAFETY&descAlignY=70&descSize=14&animation=fadeIn" width="100%"/>

<br/>

[![Next.js](https://img.shields.io/badge/NEXT.JS-APP-000000?style=for-the-badge&logo=next.js&logoColor=white&labelColor=17171B)](https://nextjs.org/)
[![React](https://img.shields.io/badge/REACT-UI-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=17171B)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT-TS-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=17171B)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TAILWIND_CSS-CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=17171B)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/FRAMER_MOTION-MOTION-E902B6?style=for-the-badge&logo=framer&logoColor=white&labelColor=17171B)](https://www.framer.com/motion/)

<br/>

[![FastAPI](https://img.shields.io/badge/FASTAPI-API-009688?style=for-the-badge&logo=fastapi&logoColor=white&labelColor=17171B)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/PYTHON-BACKEND-3776AB?style=for-the-badge&logo=python&logoColor=white&labelColor=17171B)](https://www.python.org/)
[![Google Gemini](https://img.shields.io/badge/GOOGLE_GEMINI-AI-FF3B1D?style=for-the-badge&logo=google&logoColor=white&labelColor=17171B)](https://ai.google.dev/)

</div>

---

# ◉ THE PROBLEM

Financial scams rarely arrive looking like scams.

They arrive as:

- WhatsApp investment opportunities
- "Guaranteed return" promises
- Fake regulatory or institutional claims
- Trading groups and private signal communities
- Urgent KYC or account-blocking messages
- OTP / credential requests
- Social-media investment pitches
- High-pressure payment requests

For a first-time or retail investor, the difficult question is not only:

> **"Is this a scam?"**

It is:

> **"What exactly should make me suspicious?"**

NiveshRakshak focuses on that gap.

---

# ◉ THE SOLUTION

NiveshRakshak analyzes user-supplied financial content with **Google Gemini** and converts it into a structured, evidence-oriented risk assessment.

Instead of simply returning:

> ❌ SCAM

the system explains:

> **WHAT WAS OBSERVED**
> **WHY IT MAY MATTER**
> **WHAT SHOULD BE VERIFIED**
> **WHAT THE USER CAN DO NEXT**

The system is intentionally designed as an **AI-assisted risk analysis tool**, not as a replacement for official verification or professional financial advice.

---

# ◉ CORE FEATURES

```text
01 — LIVE AI ANALYSIS        Google Gemini on arbitrary user input
02 — RED FLAG DETECTION       Pattern-based evidence extraction
03 — CLAIM ASSESSMENT         Individual claim verification status
04 — RISK SCORING             LOW / MEDIUM / HIGH / CRITICAL
05 — MULTILINGUAL OUTPUT      English · Hindi · Marathi · Hinglish
06 — DEMO CENTER              5 deterministic scenarios for presentation
07 — SAFETY GUARDRAILS        No investment advice · no fraud proof
08 — SOURCE TRANSPARENCY      Every response tagged gemini or demo
```

---

# ◉ PRODUCT FLOW

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#111114', 'primaryTextColor': '#F3F1EA', 'primaryBorderColor': '#FF3B1D', 'lineColor': '#807F78', 'secondaryColor': '#17171B', 'tertiaryColor': '#08080A', 'edgeLabelBackground': '#08080A', 'clusterBkg': '#111114', 'clusterBorder': '#FF3B1D', 'fontSize': '14px'}}}%%
flowchart LR
    A["User Input"] --> B["Next.js Interface"]
    B --> C["FastAPI API"]
    C --> D["Input Validation"]
    D --> E["Google Gemini (Configurable)"]
    E --> F["Structured Analysis"]
    F --> G["Risk Assessment"]
    G --> H["Red Flags"]
    G --> I["Claim Analysis"]
    G --> J["Safety Actions"]
    G --> K["Localized Output"]
    H --> L["User"]
    I --> L
    J --> L
    K --> L
```

---

# ◉ WHAT THE AI PRODUCES

A live analysis contains:

```text
01 — RISK LEVEL
     ↓
02 — RISK SCORE
     ↓
03 — AI SUMMARY
     ↓
04 — RED FLAGS
     ↓
05 — CLAIMS
     ↓
06 — EVIDENCE
     ↓
07 — RECOMMENDED ACTIONS
     ↓
08 — VERIFICATION STEPS
     ↓
09 — SAFETY DISCLAIMER
```

### Example

**Input**

```text
URGENT: Get ₹20,000 from ₹5,000 in 48 hours.
Send the payment to this personal UPI ID.
Only two slots remain.
```

**Possible analysis**

```text
CRITICAL RISK

Red flags:
01 — Unrealistic guaranteed return
02 — Extremely short timeframe
03 — Payment to a personal UPI ID
04 — Artificial scarcity / urgency

Evidence:
"₹20,000 from ₹5,000 in 48 hours"
"Send the payment to this personal UPI ID"
"Only two slots remain"
```

The important distinction is that the system explains **observable characteristics of the supplied content** rather than inventing unrelated financial claims.

---

# ◉ LIVE AI vs DEMO MODE

NiveshRakshak deliberately separates the two.

| Mode                       | Purpose                        | Source                   |
| -------------------------- | ------------------------------ | ------------------------ |
| 🟢 LIVE GEMINI ANALYSIS   | Arbitrary user input           | Configured Gemini model  |
| 🟠 DEMO MODE              | Predefined synthetic scenarios | Deterministic local data |

The API tags every response with an explicit source field:

```json
{
  "analysis_source": "gemini"
}
```

or:

```json
{
  "analysis_source": "demo"
}
```

This prevents a polished demo response from being mistaken for a live model response.

---

# ◉ SAFETY & GUARDRAILS

NiveshRakshak is designed around strict principles:

```text
01 — NO PERSONALIZED INVESTMENT ADVICE
     The system does not tell users which stocks, mutual funds,
     crypto assets, brokers, or financial products to buy.

02 — NO AUTOMATIC PROOF OF FRAUD
     An AI risk assessment is not proof that a person, company,
     message, or investment is fraudulent.

03 — EVIDENCE BEFORE CONCLUSIONS
     The analysis is grounded in the content supplied by the user.

04 — UNCERTAINTY IS EXPLICIT
     When information is insufficient, the system returns
     "Insufficient context" rather than inventing context.

05 — HUMAN VERIFICATION STILL MATTERS
     Users are encouraged to independently verify important
     claims using appropriate official sources.
```

---

# ◉ ARCHITECTURE

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#111114', 'primaryTextColor': '#F3F1EA', 'primaryBorderColor': '#FF3B1D', 'lineColor': '#807F78', 'secondaryColor': '#17171B', 'tertiaryColor': '#08080A', 'edgeLabelBackground': '#08080A', 'clusterBkg': '#111114', 'clusterBorder': '#FF3B1D', 'fontSize': '14px'}}}%%
flowchart TB
    U["👤 User"] --> UI["Next.js + React"]
    UI --> API["FastAPI"]
    API --> VAL["Input Validation"]
    VAL --> AI["Google Gemini"]

    AI --> PARSE["Structured JSON"]
    PARSE --> RISK["Risk Assessment"]
    PARSE --> FLAGS["Red Flags"]
    PARSE --> CLAIMS["Claim Analysis"]
    PARSE --> ACTIONS["Safety Recommendations"]

    RISK --> OUT["Localized Output"]
    FLAGS --> OUT
    CLAIMS --> OUT
    ACTIONS --> OUT

    OUT --> UI
```

**Single Source of Truth for the Active Model:**

The backend reads `GEMINI_MODEL` from environment at startup. Every endpoint — `/api/analyze`, `/api/health`, and `/api/system-status` — uses that same value. The Architecture page fetches from `/api/system-status` and displays the live backend model dynamically. No model name is hardcoded anywhere in the frontend.

---

# ◉ TECH STACK



| Category | Technology | Role |
|---|---|---|
| Frontend | Next.js 16, React 19, TypeScript 5 | Application UI |
| Styling | Tailwind CSS v4 | Design system |
| Motion | Framer Motion | UI animation |
| Backend | FastAPI, Python 3 | API + business logic |
| AI | Google Gemini API (`google-genai`) | AI-assisted analysis |
| Testing | pytest, FastAPI TestClient | Backend testing |

---

# ◉ GETTING STARTED

## Prerequisites

Make sure you have:

- Node.js
- npm
- Python 3.x
- A Gemini API key

---

## 1. Clone

```bash
git clone https://github.com/ankush-dev-eng/NiveshRakshak.git
cd NiveshRakshak
```

---

## 2. Backend Setup

```bash
cd backend
python -m venv venv
```

### Windows

```powershell
.\venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

Create `backend/.env` and add:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.0-flash
```

> ⚠️ Never commit `.env` or expose the API key to the frontend. See `backend/.env.example` for the template.

---

## 3. Start the API

```bash
uvicorn main:app --reload --port 8080
```

- Backend: `http://localhost:8080`
- Health check: `http://localhost:8080/api/health`

---

## 4. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev -- --port 3000
```

- Frontend: `http://localhost:3000`

---

# ◉ TEST THE API

### Health check

```
GET /api/health
```

### Live analysis

```
POST /api/analyze
```

```json
{
  "content": "URGENT: Invest ₹5000 today and receive ₹20000 in 48 hours. Only two slots remain.",
  "language": "English",
  "mode": "live"
}
```

Expected: `{ "analysis_source": "gemini" }`

### Deterministic demo engine

```json
{
  "mode": "demo"
}
```

Expected: `{ "analysis_source": "demo" }`

---

# ◉ TESTING

Run backend tests:

```bash
cd backend
.\venv\Scripts\python -m pytest
```

Run the production frontend build:

```bash
cd frontend
npm run build
```

The project includes **17 backend tests** covering:

- Health endpoint (model reported dynamically, not hardcoded)
- Invalid / empty input validation
- Oversized input rejection
- Demo mode (no Gemini API call made)
- Live analysis path
- Analysis source tagging
- API key status: connected, invalid, missing
- Model availability verification via Gemini models list
- Live generation test
- Single source of truth: model in `/api/system-status` equals model used in `/api/analyze`
- End-to-end model consistency with custom model ID
- API key never returned in any response

---

# ◉ DEMO SCENARIOS

The Demo Center contains five synthetic scenarios designed for a reliable presentation:

```text
01 — GUARANTEED RETURN SCAM
02 — FAKE REGULATORY APPROVAL
03 — CREDENTIAL / OTP PHISHING
04 — FAKE TRADING MENTOR
05 — EDUCATIONAL FINANCIAL MESSAGE
```

Each scenario can be:

**LOAD → ANALYZE → INSPECT**

without depending on a live Gemini response.

---

# ◉ VISUAL IDENTITY

| Token | Hex | Role |
| --- | --- | --- |
| ![](https://img.shields.io/badge/_%20-08080A?style=flat-square&logoColor=08080A) | `#08080A` | Background |
| ![](https://img.shields.io/badge/_%20-F3F1EA?style=flat-square&logoColor=F3F1EA) | `#F3F1EA` | Foreground |
| ![](https://img.shields.io/badge/_%20-807F78?style=flat-square&logoColor=807F78) | `#807F78` | Muted |
| ![](https://img.shields.io/badge/_%20-111114?style=flat-square&logoColor=111114) | `#111114` | Surface |
| ![](https://img.shields.io/badge/_%20-17171B?style=flat-square&logoColor=17171B) | `#17171B` | Surface 2 |
| ![](https://img.shields.io/badge/_%20-FF3B1D?style=flat-square&logoColor=FF3B1D) | `#FF3B1D` | Signature Red |
| ![](https://img.shields.io/badge/_%20-FF6A3D?style=flat-square&logoColor=FF6A3D) | `#FF6A3D` | Accent 2 |

**Typography:** `ANTON` — display / risk levels / headings · `ONEST` — interface / body / analysis

**Design language:** Cinematic · Editorial · High Contrast · Restrained · Motion-Driven · Red reserved for risk states

---

# ◉ MOTION & INTERACTION

Motion is treated as information architecture rather than decoration. Animations establish sequence, communicate state, guide attention, and make the analysis easier to follow.

The application combines:

- **Framer Motion** — page transitions, entrance animations, exit animations
- **CSS transitions** — hover states, color changes, border reveals
- **CSS keyframes** — marquee ticker, loading pulse, ping indicators
- **Viewport-triggered reveals** — staggered content entrance on scroll
- **State-aware transitions** — AnimatePresence for loading/result/error states

### ◌ Motion Hierarchy

```text
PAGE ENTRY
  ↓
PRELOADER
  ↓
HERO REVEAL
  ↓
MARQUEE TICKER
  ↓
SCROLL SECTIONS
  ↓
USER INTERACTION
  ↓
LIVE ANALYSIS
  ↓
RISK STATE
  ↓
RED FLAGS
  ↓
CLAIMS
  ↓
ACTION PLAN
  ↓
VERIFICATION
  ↓
FINAL DISCLAIMER
```

### ◌ Cinematic Preloader

The landing page begins with a cinematic loading sequence. A full-screen overlay displays the **NIVESHRAKSHAK** wordmark while a progress counter advances from 0% to 100%. On completion, the preloader slides upward revealing the hero section beneath.

```text
NIVESHRAKSHAK

0% ─────────────── 100%
          ↓
     [ SLIDE UP ]
```

Respects `prefers-reduced-motion` via Framer Motion's `MotionConfig reducedMotion="user"`.

### ◌ Hero Reveal

After the preloader exits, hero elements animate in with staggered delays:

```text
DELAY    ELEMENT
1.0s     badge ("AI-Powered Financial Safety")
1.1s     headline
1.2s     description
1.3s     CTA buttons
2.0s     scroll indicator
```

Each element enters with `opacity: 0 → 1` and `y: 20–30px → 0`.

### ◌ Marquee Ticker

A continuous horizontal scroll of safety phrases:

```text
DETECT RED FLAGS · VERIFY BEFORE YOU TRUST · THINK BEFORE YOU TRANSFER · QUESTION GUARANTEED RETURNS · PROTECT YOUR MONEY
```

### ◌ Analysis State Transitions

The dashboard uses `AnimatePresence mode="wait"` to manage four exclusive states:

```text
EMPTY        →  dashed border · "Awaiting Input"
LOADING      →  pulsing accent glow · spinning loader · "Running Risk Engine"
ERROR        →  red-tinted container · error message
RESULT       →  slides in from y:20 · full structured analysis
```

### ◌ Risk State

Risk levels use color-coded typography:

```text
LOW         foreground (off-white)
MEDIUM      amber-500
HIGH        accent (signature red) + red underline
CRITICAL    accent (signature red) + red underline
```

### ◌ Red Flag Reveal

Each red flag renders in a left-bordered card with accent color. Evidence is displayed in monospace blocks. Flags are listed sequentially.

### ◌ Demo Interaction

```text
SELECT scenario → LOAD into dashboard → ANALYZE → RESULT
```

The demo page uses direct navigation to `/dashboard?demo=N`, pre-filling the text area with the selected scenario content.

### ◌ Mobile Menu

Hamburger icon toggles to X. Navigation links render in large heading typography with accent color for the active route.

### ◌ Architecture Node Indicator

The architecture page includes an animated `ping` indicator on the connection line between User Input and the Next.js node, communicating active data flow.

### ◌ Motion Diagram

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#111114', 'primaryTextColor': '#F3F1EA', 'primaryBorderColor': '#FF3B1D', 'lineColor': '#807F78', 'secondaryColor': '#17171B', 'tertiaryColor': '#08080A'}}}%%
flowchart LR
    A["ENTER"] --> B["UNDERSTAND"]
    B --> C["ANALYZE"]
    C --> D["SEE THE EVIDENCE"]
    D --> E["UNDERSTAND THE RISK"]
    E --> F["VERIFY"]
    F --> G["ACT CAREFULLY"]
```

---

# ◉ PROJECT STRUCTURE

```text
NiveshRakshak/
│
├── backend/
│   ├── main.py              ← FastAPI app, Gemini integration, all endpoints
│   ├── requirements.txt
│   ├── test_main.py         ← 17 backend tests (all mocked, no real API key needed)
│   ├── test_gemini.py       ← Manual live connectivity smoke test
│   ├── .env.example         ← Template (never commit .env)
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/   ← Live analysis workspace + demoData + types
│   │   │   ├── demo/        ← Deterministic demo center
│   │   │   ├── trust/       ← Safety, limitations & guardrails
│   │   │   ├── architecture/ ← Technical architecture + live status panel
│   │   │   └── page.tsx     ← Landing page with cinematic preloader
│   │   │
│   │   ├── components/
│   │   │   ├── layout/      ← Navbar
│   │   │   └── ui/          ← shadcn/ui components
│   │   │
│   │   └── lib/
│   │
│   ├── public/
│   ├── package.json
│   └── next.config.*
│
├── README.md
└── .gitignore
```

---

# ◉ APPLICATION ROUTES

| Route          | Purpose                               |
| -------------- | ------------------------------------- |
| `/`            | Product landing page                  |
| `/dashboard`   | Live AI analysis workspace            |
| `/demo`        | Deterministic demonstration scenarios |
| `/trust`       | Safety, limitations & guardrails      |
| `/architecture` | Technical architecture + live status  |

---

# ◉ WHY NIVESHRAKSHAK?

Most fraud interfaces stop at:

> **"This looks suspicious."**

NiveshRakshak is designed to go one step further:

> **"Here is what was observed, here is why it matters, and here is what you should verify before acting."**

That distinction makes the system useful not only for detecting suspicious language, but also for helping users understand **why they should slow down**.

---

# ◉ LIMITATIONS

NiveshRakshak is an AI-assisted analysis tool.

It cannot:

- prove that a message is fraudulent
- independently verify every claim
- replace regulators or law enforcement
- guarantee the legitimacy of an investment
- provide personalized financial advice
- predict investment returns

AI output should be treated as informational guidance and independently verified where appropriate.

---

# ◉ FUTURE SCOPE

Potential future extensions include:

- 📷 Screenshot / image analysis
- 🎙️ Voice-message analysis
- 🌐 More Indian regional languages
- 🔎 Official-source verification workflows
- 📱 Mobile-first PWA
- 🧠 Retrieval-assisted regulatory knowledge
- 📨 Browser / email / messaging integrations
- 📈 Explainable risk trends
- 🛡️ Enterprise fraud-awareness workflows

---

# ◉ DEMO

### Local

```text
Frontend → http://localhost:3000
Backend  → http://localhost:8080
```

### Demo Video

<div align="center">

<a href="https://www.youtube.com/watch?v=2Sw1yrD9qEA">
  <img
    src="https://img.youtube.com/vi/2Sw1yrD9qEA/maxresdefault.jpg"
    width="820"
    alt="NiveshRakshak Demo Video"
  />
</a>

<br/>

### ▶ WATCH THE NIVESHRAKSHAK DEMO

**90-second product walkthrough · AI-assisted financial safety**

<br/>

[ WATCH ON YOUTUBE ](https://www.youtube.com/watch?v=2Sw1yrD9qEA)

</div>

---

# ◉ HACKATHON HIGHLIGHTS

### Built Around Real User Behavior

Designed around the types of messages users actually encounter:

```text
WhatsApp · SMS · Telegram · Email · Social Media · Investment Offers · Phishing Messages
```

### AI + Explainability

The output is structured into:

```text
Risk → Evidence → Explanation → Action → Verification
```

### Bharat-First Accessibility

Supports English, Hindi, Marathi, and Hinglish with localized analysis rather than merely translated navigation labels.

---

# ◉ SECURITY NOTES

**The API key is server-side only.** It is loaded from `backend/.env` at startup and never returned to the frontend or logged to any output.

Never commit:

```text
backend/.env
```

Never expose:

```text
GEMINI_API_KEY
```

Recommended Git check before pushing:

```bash
git status
git grep -l "AIza"
git grep -l "GEMINI_API_KEY="
```

Make sure `.env` is listed in `.gitignore` and absent from `git ls-files`.

---

# ◉ CONTRIBUTING

Contributions and improvements are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

# ◉ LICENSE

MIT License. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=FF3B1D&height=3" width="100%"/>

<br/><br/>

# NIVESHRAKSHAK

**AI-ASSISTED FINANCIAL SAFETY**

<br/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Courier+New&size=16&duration=2200&pause=800&color=FF3B1D&center=true&vCenter=true&width=520&lines=DETECT+RED+FLAGS;VERIFY+BEFORE+YOU+TRUST;QUESTION+GUARANTEED+RETURNS;PAUSE+BEFORE+YOU+PAY;PROTECT+YOUR+MONEY)](https://git.io/typing-svg)

<br/>

**ANALYZE BEFORE YOU ACT.**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF3B1D&height=100&section=footer" width="100%"/>

</div>
