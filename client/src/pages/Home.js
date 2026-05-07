import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      if (window.confirm("Are you sure you want to log out?")) {
        logout();
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">🛡️</div>
          <div>
            <div className="navbar-title">Battlefield Intel</div>
            <div className="navbar-subtitle">Threat Intelligence System</div>
          </div>
        </div>
        <div className="navbar-actions">
          <div className="navbar-status">
            <span className="status-dot"></span>
            System Online
          </div>
          {isAuthenticated && user && (
            <div className="officer-badge" style={{ color: "var(--primary-color)", fontWeight: "bold", marginRight: "1rem" }}>
              {user.rank} {user.name} ({user.role})
            </div>
          )}
          <button className="btn btn-primary" id="login-btn" onClick={handleAuthAction}>
            {isAuthenticated ? "🚪 Checkout" : "🔐 Officer Login"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="app-content">
        <div className="container">
          <section className="hero">
            <div className="hero-badge">
              🎖️ Defense Intelligence Platform
            </div>
            <h1>
              AI-Powered <span className="highlight">Battlefield</span>
              <br />
              Threat Intelligence
            </h1>
            <p className="hero-description">
              Advanced threat analysis system powered by Artificial Intelligence. 
              Real-time monitoring, automated threat scoring, and tactical intelligence 
              for defense command centers across all operational sectors.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary" 
                id="get-started-btn"
                onClick={() => isAuthenticated ? navigate('/report') : navigate('/login')}
              >
                ⚡ Access Command Center
              </button>
              <button className="btn btn-outline" id="view-demo-btn">
                📊 View Dashboard Demo
              </button>
            </div>
          </section>

          {/* Stats Overview */}
          <section className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">247</div>
              <div className="stat-label">Threats Analyzed</div>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-icon">🔴</div>
              <div className="stat-value">12</div>
              <div className="stat-label">Critical Alerts</div>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-icon">📍</div>
              <div className="stat-value">8</div>
              <div className="stat-label">Active Sectors</div>
            </div>
            <div className="glass-card stat-card">
              <div className="stat-icon">🤖</div>
              <div className="stat-value">98%</div>
              <div className="stat-label">AI Accuracy</div>
            </div>
          </section>

          {/* Core Features */}
          <section className="features-section">
            <h2 className="section-title">Core Capabilities</h2>
            <p className="section-subtitle">
              Military-grade threat intelligence powered by cutting-edge AI
            </p>
            <div className="features-grid">
              <div className="glass-card feature-card">
                <div className="feature-icon">🔐</div>
                <h3 className="feature-title">Secure Officer Authentication</h3>
                <p className="feature-description">
                  JWT-based authentication with role-based access control. 
                  Separate access levels for Analysts and Commanders with 
                  encrypted credentials and session management.
                </p>
              </div>
              <div className="glass-card feature-card">
                <div className="feature-icon">📋</div>
                <h3 className="feature-title">Threat Report Module</h3>
                <p className="feature-description">
                  Officers can submit detailed incident reports including location, 
                  sector, threat type (Drone/Vehicle/Intrusion/Cyber), and descriptions. 
                  All data stored securely in MongoDB.
                </p>
              </div>
              <div className="glass-card feature-card">
                <div className="feature-icon">🧠</div>
                <h3 className="feature-title">AI Threat Analysis</h3>
                <p className="feature-description">
                  Advanced AI engine analyzes threat descriptions, generates threat 
                  scores (1-100), classifies priority levels (Low/Medium/Critical), 
                  and provides tactical recommendations.
                </p>
              </div>
              <div className="glass-card feature-card">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Live Command Dashboard</h3>
                <p className="feature-description">
                  Real-time analytics with sector-wise threat distribution, 
                  trend analysis charts, critical alert monitoring, and 
                  comprehensive operational overview.
                </p>
              </div>
              <div className="glass-card feature-card">
                <div className="feature-icon">🗺️</div>
                <h3 className="feature-title">Border Visualization Map</h3>
                <p className="feature-description">
                  Interactive map displaying incident locations with threat markers, 
                  sector boundaries, and heat map visualization of threat density 
                  across operational zones.
                </p>
              </div>
              <div className="glass-card feature-card">
                <div className="feature-icon">📡</div>
                <h3 className="feature-title">Intelligence Summary</h3>
                <p className="feature-description">
                  Automated 24-hour intelligence briefings with pattern recognition, 
                  cross-incident analysis, and military-style intelligence reports 
                  for commanding officers.
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section style={{ padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
            <h2 className="section-title">Technology Stack</h2>
            <p className="section-subtitle">Built with modern, battle-tested technologies</p>
            <div className="tech-stack">
              <div className="tech-badge">⚛️ React.js</div>
              <div className="tech-badge">🟢 Node.js</div>
              <div className="tech-badge">🚂 Express.js</div>
              <div className="tech-badge">🍃 MongoDB</div>
              <div className="tech-badge">🤖 OpenAI API</div>
              <div className="tech-badge">📊 Chart.js</div>
              <div className="tech-badge">🗺️ Leaflet Maps</div>
              <div className="tech-badge">🔐 JWT Auth</div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            © 2026 <span className="footer-brand">Battlefield Threat Intelligence System</span> — 
            Built for Defense Intelligence Operations
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
