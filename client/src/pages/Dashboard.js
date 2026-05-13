import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import apiService from '../services/api';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart Theme Configuration
const chartTheme = {
  color: '#8da698', // text-secondary
  gridColor: 'rgba(255, 255, 255, 0.05)',
  fontFamily: "'Inter', sans-serif"
};

const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: chartTheme.color, font: { family: chartTheme.fontFamily } }
    },
    tooltip: {
      backgroundColor: 'rgba(10, 15, 12, 0.9)',
      titleColor: '#1abc7c',
      bodyColor: '#e0e6e3',
      borderColor: 'rgba(26, 188, 124, 0.2)',
      borderWidth: 1,
      padding: 10,
      displayColors: true
    }
  },
  scales: {
    x: {
      grid: { color: chartTheme.gridColor },
      ticks: { color: chartTheme.color, font: { family: chartTheme.fontFamily } }
    },
    y: {
      grid: { color: chartTheme.gridColor },
      ticks: { color: chartTheme.color, font: { family: chartTheme.fontFamily } }
    }
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [threatTypes, setThreatTypes] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, trendsRes, sectorRes, typesRes] = await Promise.all([
        apiService.dashboard.getStats(),
        apiService.dashboard.getTrends(),
        apiService.dashboard.getSectorData(),
        apiService.dashboard.getThreatTypes()
      ]);

      setStats(statsRes.data);
      setTrends(trendsRes.data);
      setSectorData(sectorRes.data);
      setThreatTypes(typesRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to securely fetch dashboard metrics. Verify command link.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-dashboard">Initializing Command Interface...</div>;
  }

  if (error) {
    return <div className="alert alert-danger" style={{margin: '2rem'}}>{error}</div>;
  }

  // Prepare Chart Data
  const trendsChartData = {
    labels: trends.map(t => t._id),
    datasets: [
      {
        label: 'Total Threats',
        data: trends.map(t => t.count),
        borderColor: '#1abc7c',
        backgroundColor: 'rgba(26, 188, 124, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#1abc7c'
      },
      {
        label: 'Critical Threats',
        data: trends.map(t => t.criticalCount),
        borderColor: '#ff6b6b',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        pointBackgroundColor: '#ff6b6b'
      }
    ]
  };

  const sectorChartData = {
    labels: sectorData.map(s => s._id),
    datasets: [
      {
        label: 'Threat Count by Sector',
        data: sectorData.map(s => s.count),
        backgroundColor: 'rgba(26, 188, 124, 0.7)',
        borderColor: '#1abc7c',
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const threatTypeChartData = {
    labels: threatTypes.map(t => t._id),
    datasets: [
      {
        data: threatTypes.map(t => t.count),
        backgroundColor: [
          'rgba(26, 188, 124, 0.8)',  // Primary green
          'rgba(255, 107, 107, 0.8)', // Critical red
          'rgba(255, 169, 77, 0.8)',  // Warning orange
          'rgba(77, 171, 247, 0.8)',  // Info blue
          'rgba(177, 151, 252, 0.8)', // Cyber purple
          'rgba(141, 166, 152, 0.8)'  // Muted
        ],
        borderWidth: 0,
        hoverOffset: 10
      }
    ]
  };

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Live Command Dashboard</h2>
          <p>Real-time sector intelligence and threat analytics</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-outline" onClick={() => navigate('/map')}>🗺️ Border Map</button>
          <button className="btn btn-outline" onClick={() => fetchDashboardData()}>🔄 Refresh Sync</button>
          <button className="btn btn-primary" onClick={() => navigate('/report')}>+ Report Threat</button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="kpi-grid">
        <div className="glass-card kpi-card">
          <div className="kpi-icon">🎯</div>
          <div className="kpi-details">
            <div className="kpi-value">{stats?.totalThreats || 0}</div>
            <div className="kpi-label">Total Analyzed</div>
          </div>
        </div>
        <div className="glass-card kpi-card critical-kpi">
          <div className="kpi-icon">🔴</div>
          <div className="kpi-details">
            <div className="kpi-value">{stats?.criticalThreats || 0}</div>
            <div className="kpi-label">Critical Alerts</div>
          </div>
        </div>
        <div className="glass-card kpi-card">
          <div className="kpi-icon">⏳</div>
          <div className="kpi-details">
            <div className="kpi-value">{stats?.pendingThreats || 0}</div>
            <div className="kpi-label">Pending Review</div>
          </div>
        </div>
        <div className="glass-card kpi-card">
          <div className="kpi-icon">🧠</div>
          <div className="kpi-details">
            <div className="kpi-value">{stats?.avgThreatScore || 0}</div>
            <div className="kpi-label">Avg Threat Score</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="glass-card chart-card trend-chart">
          <h3>7-Day Threat Activity Trends</h3>
          <div className="chart-wrapper">
            <Line data={trendsChartData} options={defaultChartOptions} />
          </div>
        </div>

        <div className="glass-card chart-card sector-chart">
          <h3>Sector-Wise Threat Distribution</h3>
          <div className="chart-wrapper">
            <Bar 
              data={sectorChartData} 
              options={{
                ...defaultChartOptions,
                indexAxis: 'y', // Horizontal bar chart
                plugins: { legend: { display: false } }
              }} 
            />
          </div>
        </div>

        <div className="glass-card chart-card type-chart">
          <h3>Threat Classification Types</h3>
          <div className="chart-wrapper doughnut-wrapper">
            <Doughnut 
              data={threatTypeChartData} 
              options={{
                ...defaultChartOptions,
                scales: { x: { display: false }, y: { display: false } }, // Remove grid lines for doughnut
                cutout: '70%'
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
