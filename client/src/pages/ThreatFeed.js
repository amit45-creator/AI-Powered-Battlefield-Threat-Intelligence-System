import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import './ThreatFeed.css';

function ThreatFeed() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    try {
      setLoading(true);
      const res = await apiService.threats.getAll();
      setThreats(res.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to retrieve intelligence feed. Secure connection might be compromised.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'badge-critical';
      case 'Medium': return 'badge-medium';
      case 'Low': return 'badge-low';
      default: return 'badge-pending';
    }
  };

  const getScoreColorClass = (score) => {
    if (!score) return '';
    if (score >= 75) return 'score-critical';
    if (score >= 40) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="feed-container fade-in">
      <div className="feed-header">
        <div className="feed-title-section">
          <h2>Live Intelligence Feed</h2>
          <p>Real-time threat classification and AI analysis</p>
        </div>
        <div className="feed-actions">
          <button className="btn btn-outline" onClick={() => navigate('/')}>Dashboard</button>
          <button className="btn btn-primary" onClick={() => navigate('/report')}>+ Report Threat</button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loading-feed">Decrypting Intel...</div>
      ) : threats.length === 0 ? (
        <div className="empty-feed">
          <div className="empty-icon">✓</div>
          <p>No active threats in the sector. All clear.</p>
        </div>
      ) : (
        <div className="threat-list">
          {threats.map((threat) => (
            <div key={threat._id} className="threat-card glass-card">
              <div className="threat-card-header">
                <div className="threat-meta">
                  <span className={`threat-badge ${getPriorityBadgeClass(threat.priority)}`}>
                    {threat.priority || threat.status}
                  </span>
                  <span className="threat-type">{threat.threatType}</span>
                  <span className="threat-sector">📍 {threat.location?.sector}</span>
                </div>
                <div className="threat-time">
                  {new Date(threat.createdAt).toLocaleString()}
                </div>
              </div>
              
              <h3 className="threat-title">{threat.title}</h3>
              
              <div className="threat-analysis">
                <div className="analysis-score-box">
                  <div className={`score-value ${getScoreColorClass(threat.threatScore)}`}>
                    {threat.threatScore || '--'}
                  </div>
                  <div className="score-label">AI Threat Score</div>
                </div>
                <div className="analysis-details">
                  <div className="analysis-summary">
                    <strong>AI Summary:</strong> {threat.aiAnalysis?.summary || 'Pending analysis...'}
                  </div>
                  {threat.aiAnalysis?.recommendations?.length > 0 && (
                    <div className="analysis-tactics">
                      <strong>Tactical Recommendations:</strong>
                      <ul>
                        {threat.aiAnalysis.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="threat-footer">
                <div className="reporter-info">
                  Reported by: {threat.reportedBy?.rank} {threat.reportedBy?.name}
                </div>
                <div className="threat-tags">
                  {threat.tags?.map((tag, idx) => (
                    <span key={idx} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThreatFeed;
