import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import apiService from '../services/api';
import './ThreatMap.css';

// Fix for default Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom Icons for different threat priorities
const createCustomIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7.5, 7.5],
    popupAnchor: [0, -10]
  });
};

const icons = {
  Critical: createCustomIcon('#ff6b6b'),
  Medium: createCustomIcon('#ffa94d'),
  Low: createCustomIcon('#1abc7c'),
  Pending: createCustomIcon('#8da698')
};

const getIcon = (priority) => {
  return icons[priority] || icons.Pending;
};

function ThreatMap() {
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
      
      // Only keep threats that have valid coordinates
      const validThreats = res.data.filter(t => 
        t.location && 
        t.location.coordinates && 
        t.location.coordinates.lat !== null && 
        t.location.coordinates.lng !== null
      );
      
      // If there are no valid threats, provide a default centered location (e.g. Jammu/Kashmir region roughly 33.3, 74.3)
      setThreats(validThreats);
      setError(null);
    } catch (err) {
      setError('Satellite link severed. Cannot fetch spatial data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const centerPosition = threats.length > 0 
    ? [threats[0].location.coordinates.lat, threats[0].location.coordinates.lng] 
    : [33.37, 74.30];

  return (
    <div className="map-page-container fade-in">
      <div className="map-header">
        <div className="map-title">
          <h2>Border Visualization Map</h2>
          <p>Tactical satellite view of active incident reports</p>
        </div>
        <div className="map-actions">
          <button className="btn btn-outline" onClick={() => fetchThreats()}>📡 Scan Area</button>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>📊 Command Dashboard</button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="map-wrapper glass-card">
        {loading ? (
          <div className="loading-map">Establishing Satellite Uplink...</div>
        ) : (
          <MapContainer 
            center={centerPosition} 
            zoom={8} 
            style={{ height: '100%', width: '100%', borderRadius: '12px' }}
            theme="dark"
          >
            {/* Dark mode tactical map tiles */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {threats.map(threat => (
              <React.Fragment key={threat._id}>
                <Marker 
                  position={[threat.location.coordinates.lat, threat.location.coordinates.lng]}
                  icon={getIcon(threat.priority)}
                >
                  <Popup className="tactical-popup">
                    <div className="popup-content">
                      <span className={`popup-badge badge-${threat.priority?.toLowerCase()}`}>
                        {threat.priority || 'Pending'}
                      </span>
                      <h3>{threat.threatType}</h3>
                      <p className="popup-sector">📍 {threat.location.sector}</p>
                      <p className="popup-score">
                        Threat Score: <strong className={`score-${threat.priority?.toLowerCase()}`}>
                          {threat.threatScore || '--'}
                        </strong>
                      </p>
                      <button className="btn btn-text" style={{padding: '0.5rem 0'}} onClick={() => {}}>
                        View Full Report
                      </button>
                    </div>
                  </Popup>
                </Marker>
                
                {/* Draw a subtle radar circle around critical threats */}
                {threat.priority === 'Critical' && (
                  <Circle 
                    center={[threat.location.coordinates.lat, threat.location.coordinates.lng]}
                    radius={15000} // 15km radar ping
                    pathOptions={{ color: '#ff6b6b', fillColor: '#ff6b6b', fillOpacity: 0.1, weight: 1 }}
                  />
                )}
              </React.Fragment>
            ))}
          </MapContainer>
        )}
      </div>
      
      <div className="map-legend">
        <div className="legend-item"><span className="legend-dot critical"></span> Critical Threat</div>
        <div className="legend-item"><span className="legend-dot medium"></span> Medium Threat</div>
        <div className="legend-item"><span className="legend-dot low"></span> Low Threat</div>
        <div className="legend-item"><span className="legend-dot pending"></span> Pending Analysis</div>
      </div>
    </div>
  );
}

export default ThreatMap;
