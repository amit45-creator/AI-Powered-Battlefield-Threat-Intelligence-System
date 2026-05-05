# 🛡️ AI-Powered Battlefield Threat Intelligence System

> Inspired by real-world defense intelligence systems.

An advanced **MERN stack** application that leverages **Artificial Intelligence** to analyze and classify battlefield threats in real-time. Built for defense command centers to quickly assess incoming threat reports from multiple sources — drone sightings, suspicious vehicle movements, border intrusions, cyber attacks, and communication disturbances.

## 🎯 Problem Statement

Defense command centers receive data from multiple sources simultaneously:
- 🛸 Drone sightings
- 🚗 Suspicious vehicle movements
- 🚧 Border intrusion reports
- 💻 Cyber attack alerts
- 📡 Communication disturbances

Human operators need to quickly determine: **Is the threat level low, medium, or critical?**

This system automates threat analysis using AI to process incoming incidents, assign threat scores (1-100), classify priority levels, and provide actionable intelligence summaries.

## 🚀 Core Features

### 1. Secure Officer Login
- JWT-based authentication
- Role-based access control (Analyst / Commander)
- Secure session management

### 2. Threat Report Module
- Officers can submit incident reports
- Fields: Location, Sector, Threat Type (Drone/Vehicle/Intrusion/Cyber), Description
- Stored in MongoDB with timestamps

### 3. AI Threat Analysis (Hero Feature)
- AI analyzes threat descriptions
- Generates threat scores (1-100)
- Classifies priority: Low / Medium / Critical
- Provides tactical intelligence summaries

### 4. Live Command Dashboard
- Real-time threat overview charts
- Sector-wise threat distribution
- Threat trend analysis
- Critical alert notifications

### 5. Map-based Border Visualization
- Interactive map showing incident locations
- Sector-wise threat markers
- Heat map of threat density

### 6. AI Intelligence Summary
- Automated 24-hour intelligence briefings
- Pattern recognition across incidents
- Military-style intelligence reports

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Chart.js, Leaflet Maps |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| AI Engine | OpenAI API / Custom NLP |
| Auth | JWT + bcrypt |
| Styling | CSS3 with Military Theme |

## 📁 Project Structure

```
ai-powered-battlefield-threat-intelligence-system/
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context (Auth, Theme)
│   │   ├── services/          # API service layer
│   │   ├── utils/             # Utility functions
│   │   ├── assets/            # Static assets
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/                    # Node.js Backend
│   ├── config/                # Database & app config
│   ├── controllers/           # Route controllers
│   ├── middleware/             # Auth & error middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── utils/                 # Helper utilities
│   └── server.js              # Entry point
├── .gitignore
├── .env.example
├── README.md
└── package.json
```

## 🗓️ Development Roadmap (10 Days)

| Day | Task | Status |
|-----|------|--------|
| 1 | Project Setup - React + Node + MongoDB + Folder Structure | ✅ |
| 2 | Auth System - JWT + Role-based access | ⬜ |
| 3 | Threat Report APIs | ⬜ |
| 4 | MongoDB Integration - Database Models | ⬜ |
| 5 | AI Integration - Threat Analyzer | ⬜ |
| 6 | Threat Scoring & Classification | ⬜ |
| 7 | Dashboard Charts | ⬜ |
| 8 | Map Integration | ⬜ |
| 9 | UI Polish + Filtering | ⬜ |
| 10 | Deploy | ⬜ |

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/amit45-creator/ai-powered-battlefield-threat-intelligence-system.git
cd ai-powered-battlefield-threat-intelligence-system

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the application
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm start
```

## 🔐 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/battlefield-intel
JWT_SECRET=your_jwt_secret_key
AI_API_KEY=your_openai_api_key
NODE_ENV=development
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new officer |
| POST | `/api/auth/login` | Officer login |
| GET | `/api/threats` | Get all threats |
| POST | `/api/threats` | Report new threat |
| GET | `/api/threats/:id` | Get threat details |
| POST | `/api/threats/:id/analyze` | AI analyze threat |
| GET | `/api/dashboard/stats` | Dashboard statistics |
| GET | `/api/dashboard/sector-wise` | Sector-wise data |

## 🤝 Contributing

This project is part of a defense technology internship. Contributions and suggestions are welcome.

## 📜 License

This project is licensed under the MIT License.

---

**Built with ❤️ for Defense Intelligence**
