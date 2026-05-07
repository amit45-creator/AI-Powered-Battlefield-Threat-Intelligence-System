import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import './ThreatReport.css';

function ThreatReport() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    threatType: 'Drone',
    sector: '',
    lat: '',
    lng: '',
    description: '',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const threatPayload = {
        title: formData.title,
        threatType: formData.threatType,
        description: formData.description,
        location: {
          sector: formData.sector,
          coordinates: {
            lat: parseFloat(formData.lat) || null,
            lng: parseFloat(formData.lng) || null
          }
        },
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await apiService.threats.create(threatPayload);
      setSuccess('Threat report submitted successfully and forwarded to AI analysis.');
      
      // Reset form
      setFormData({
        title: '',
        threatType: 'Drone',
        sector: '',
        lat: '',
        lng: '',
        description: '',
        tags: ''
      });
      
      // Optional: Navigate to dashboard after short delay
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container fade-in">
      <div className="report-header">
        <h2>Submit Intelligence Report</h2>
        <p>Log a new threat incident for AI analysis and command review.</p>
        <div className="officer-info">Reporting Officer: {user?.rank} {user?.name}</div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form className="report-form glass-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Incident Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              placeholder="E.g., Unauthorized UAV entering Sector Alpha"
            />
          </div>

          <div className="form-group">
            <label htmlFor="threatType">Threat Classification</label>
            <select 
              id="threatType" 
              name="threatType" 
              value={formData.threatType} 
              onChange={handleChange}
            >
              <option value="Drone">Drone/UAV</option>
              <option value="Vehicle">Suspicious Vehicle</option>
              <option value="Intrusion">Border Intrusion</option>
              <option value="Cyber">Cyber Attack</option>
              <option value="Communication">Communication Disturbance</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sector">Operational Sector</label>
            <input 
              type="text" 
              id="sector" 
              name="sector" 
              value={formData.sector} 
              onChange={handleChange} 
              required 
              placeholder="E.g., Rajouri Sector"
            />
          </div>
          <div className="form-group form-row-inner">
            <div className="form-col">
              <label htmlFor="lat">Latitude (Opt)</label>
              <input type="number" step="any" id="lat" name="lat" value={formData.lat} onChange={handleChange} placeholder="33.37" />
            </div>
            <div className="form-col">
              <label htmlFor="lng">Longitude (Opt)</label>
              <input type="number" step="any" id="lng" name="lng" value={formData.lng} onChange={handleChange} placeholder="74.30" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Detailed Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            rows="5"
            placeholder='E.g., "Multiple unidentified flying objects detected near sector moving at high speeds..."'
          ></textarea>
          <small>Include all relevant situational observations. This text will be parsed by the AI Threat Analyzer.</small>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Keywords / Tags (Comma separated)</label>
          <input 
            type="text" 
            id="tags" 
            name="tags" 
            value={formData.tags} 
            onChange={handleChange} 
            placeholder="e.g., surveillance, night-vision, fast-mover"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Transmitting...' : 'Submit to Command'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ThreatReport;
