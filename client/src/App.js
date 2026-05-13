import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ThreatReport from './pages/ThreatReport';
import ThreatFeed from './pages/ThreatFeed';
import Dashboard from './pages/Dashboard';
import ThreatMap from './pages/ThreatMap';
import { useAuth } from './context/AuthContext';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/report" 
        element={
          <ProtectedRoute>
            <ThreatReport />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/feed" 
        element={
          <ProtectedRoute>
            <ThreatFeed />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/map" 
        element={
          <ProtectedRoute>
            <ThreatMap />
          </ProtectedRoute>
        } 
      />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
