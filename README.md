# 🛡️ AI-Powered Battlefield Threat Intelligence System

![Project Banner](https://img.shields.io/badge/Defense-Intelligence%20System-1abc7c?style=for-the-badge&logo=shield)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![AI Integration](https://img.shields.io/badge/AI-Google_Gemini-orange?style=for-the-badge&logo=google)

> An advanced, military-grade situational awareness platform powered by Artificial Intelligence. 

Built for defense command centers, this **MERN stack** application analyzes and classifies battlefield threats in real-time. It processes incoming intelligence reports from multiple sources — drone sightings, suspicious vehicle movements, border intrusions, and cyber attacks — and uses AI to generate tactical recommendations, threat scores, and daily situational reports (SITREPs).

---

## 🎯 Problem Statement

Modern defense command centers suffer from data overload. When multiple intelligence reports arrive simultaneously, human operators must quickly assess: **Is this a critical threat or routine anomaly?**

This system solves this by acting as an **AI-augmented Intelligence Officer**. It automates threat triage, assigns severity scores (1-100), plots threats on a tactical map, and generates automated briefings, ensuring Commanders can focus on high-priority decision-making rather than data sorting.

---

## 🚀 Core Capabilities

### 1. 🔐 Secure Command Authentication
- **Defense-Grade Security:** JWT-based stateless authentication.
- **Role-Based Access Control:** Differentiates between Field Analysts (Reporting) and Commanders (Dashboard Access & Deletion).
- **Military UI:** Glassmorphism, neon-green accents, and "Restricted Access" aesthetics.

### 2. 📝 Tactical Threat Reporting
- **Incident Logging:** Officers submit structured reports detailing Sector, Coordinates, and Threat Type.
- **Categorization:** Automatically categorizes reports into Drone, Vehicle, Intrusion, Cyber, or Comm-Interference.

### 3. 🧠 AI Threat Analysis Engine (Hero Feature)
- **Real-Time Analysis:** Powered by Google's Gemini AI SDK.
- **Threat Scoring:** Calculates a Threat Score (1-100) based on severity heuristics and NLP.
- **Classification:** Automatically labels threats as `Critical`, `Medium`, or `Low`.
- **Tactical Recommendations:** The AI suggests immediate counter-measures for the specific threat.
- **Failsafe Mock Mode:** A deterministic keyword-based AI fallback ensures the system works perfectly offline or without API keys.

### 4. 📊 Live Command Dashboard
- **Central Intelligence Hub:** Real-time KPIs (Total Threats, Critical Alerts).
- **Visual Analytics:** Integrated with `Chart.js` for 7-Day trend analysis, sector-wise distribution, and threat classification breakdowns.

### 5. 🗺️ Map-Based Border Visualization
- **Tactical Map:** Powered by `Leaflet` and `react-leaflet` using CartoDB Dark Matter tiles.
- **Geospatial Plotting:** Threats are plotted in real-time based on coordinates.
- **Priority Radar:** Critical threats feature a pulsating red 15km radar ping to draw immediate commander attention.

### 6. 📋 Automated SITREP Generation
- **24-Hour AI Intelligence Summary:** Aggregates all threats from the last 24 hours into a cohesive, military-style Situation Report.

---

## 🏗️ Technical Architecture

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, React Router, Chart.js, Leaflet Maps, Vanilla CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **AI Engine** | `@google/genai` (Gemini 2.5 Flash) |
| **Auth & Security** | JSON Web Tokens (JWT), bcryptjs |

---

## 📁 Repository Structure

```
battlefield-threat-intelligence/
├── client/                    # React Frontend App
│   ├── src/
│   │   ├── components/        # Reusable UI (Protected Routes)
│   │   ├── context/           # Global Auth Context
│   │   ├── pages/             # Dashboard, ThreatMap, Feed, Login, Report
│   │   ├── services/          # API Handlers (Axios)
│   │   └── index.css          # Military CSS Variables & Themes
├── server/                    # Node.js Express Backend
│   ├── config/                # MongoDB Database Connection
│   ├── controllers/           # Auth, Threat, and Dashboard Logic
│   ├── middleware/            # JWT Verification
│   ├── models/                # Mongoose Schemas (User, Threat)
│   ├── routes/                # API Endpoints
│   ├── services/              # AI Service Integration
│   └── server.js              # Entry point
└── package.json               # Root scripts (Concurrently)
```

---

## 🗓️ 10-Day Sprint Completion

| Day | Task | Status |
|-----|------|--------|
| **1** | Project Setup - MERN Stack Initialization | ✅ |
| **2** | Auth System - JWT + Officer Credentials | ✅ |
| **3** | Threat Report APIs - Express Controllers | ✅ |
| **4** | MongoDB Integration - Database Models | ✅ |
| **5** | AI Integration - Threat Analyzer Service | ✅ |
| **6** | Threat Scoring & Live Intelligence Feed UI | ✅ |
| **7** | Live Command Dashboard with Chart.js | ✅ |
| **8** | Map-Based Border Visualization (Leaflet) | ✅ |
| **9** | AI Intelligence Daily SITREP Module | ✅ |
| **10** | Final Polish, Seeding, & Presentation | ✅ |

---

## ⚙️ Quick Start Guide

Experience the project instantly with the included demo seeder.

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://localhost:27017` or update `.env`)

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/amit45-creator/AI-Powered-Battlefield-Threat-Intelligence-System.git
cd AI-Powered-Battlefield-Threat-Intelligence-System

# Install root dependencies
npm install

# Install client & server dependencies
npm run install-all
```

### 2. Environment Setup
In the `server` directory, create a `.env` file (or copy `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/battlefield-intel
JWT_SECRET=super_secret_defense_key_123
GEMINI_API_KEY=your_gemini_key_here # Optional (System will use Failsafe Mock Mode if empty)
```

### 3. Seed the Database & Run
```bash
# Generate a test Commander account and mock threats
npm run seed

# Start both backend and frontend simultaneously
npm start
```

### 4. Access the System
- Open `http://localhost:3000`
- **Login Credentials:**
  - Email: `commander@defense.mil`
  - Password: `command123`

---

## 📜 License
This project was developed as a defense technology prototype. It is open-sourced under the MIT License.

*Built with precision for the modern battlefield.* 🛡️
