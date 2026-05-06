import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard'); // Route doesn't exist yet, but it will soon
    } catch (err) {
      setError(err.message || 'Verification failed. Unauthorized access attempt logged.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      
      <div className="login-card glass-card">
        <div className="login-header">
          <div className="login-logo">🛡️</div>
          <h2>Restricted Access</h2>
          <p>Central Command Authentication</p>
        </div>
        
        {error && <div className="login-error">⚠️ {error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Officer Identification (Email)</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@defense.mil"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Security Clearance (Password)</label>
            <div className="input-wrapper">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary login-submit" 
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Commence Authentication'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Unidentified access attempts will be audited.</p>
          <button className="btn btn-text" onClick={() => navigate('/')}>
            ← Return to Intel Portal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
