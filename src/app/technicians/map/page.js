"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetTechniciansQuery } from "@/store/api/ticketApi";
import { useState, useEffect } from "react";
import "../technicians.css";

export default function TechnicianMap() {
  const { data: technicians, isLoading } = useGetTechniciansQuery();
  const [selectedTech, setSelectedTech] = useState(null);
  const [liveLocations, setLiveLocations] = useState({});

  // Simulate live location updates
  useEffect(() => {
    const updateLocations = () => {
      const mockData = {
        "tech1": { 
          lat: 28.6139 + (Math.random() - 0.5) * 0.01, 
          lng: 77.2090 + (Math.random() - 0.5) * 0.01, 
          name: "John Doe", 
          status: "On Job",
          lastUpdate: new Date().toLocaleTimeString()
        },
        "tech2": { 
          lat: 28.7041 + (Math.random() - 0.5) * 0.01, 
          lng: 77.1025 + (Math.random() - 0.5) * 0.01, 
          name: "Jane Smith", 
          status: "Available",
          lastUpdate: new Date().toLocaleTimeString()
        },
        "tech3": { 
          lat: 28.5355 + (Math.random() - 0.5) * 0.01, 
          lng: 77.3910 + (Math.random() - 0.5) * 0.01, 
          name: "Mike Johnson", 
          status: "Traveling",
          lastUpdate: new Date().toLocaleTimeString()
        },
      };
      setLiveLocations(mockData);
    };

    updateLocations();
    const interval = setInterval(updateLocations, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleTrackTechnician = (techId) => {
    setSelectedTech(techId);
    alert(`Tracking ${liveLocations[techId]?.name}`);
  };

  return (
    <ProtectedRoute>
      <main className="map-container">
        <header className="map-header-bar">
          <h1>🗺️ Technician Live Locations</h1>
          <div className="map-controls">
            <span className="live-indicator">🔴 LIVE</span>
            <button className="refresh-btn" onClick={handleRefresh}>
              🔄 Refresh
            </button>
          </div>
        </header>

        <div className="map-layout">
          <div className="map-section">
            <div className="map-view">
              <div className="map-placeholder">
                <div className="map-header">🗺️ Interactive Map View</div>
                <div className="map-content">
                  {Object.entries(liveLocations).map(([id, location]) => (
                    <div 
                      key={id}
                      className={`location-marker ${selectedTech === id ? 'selected' : ''}`}
                      onClick={() => setSelectedTech(id)}
                    >
                      <div className="marker-icon">👨🔧</div>
                      <div className="marker-info">
                        <strong>{location.name}</strong>
                        <span className={`status ${location.status.toLowerCase().replace(' ', '-')}`}>
                          {location.status}
                        </span>
                        <small>Updated: {location.lastUpdate}</small>
                      </div>
                      <div className="coordinates">
                        📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="technician-list">
            <h3>Active Technicians ({Object.keys(liveLocations).length})</h3>
            {isLoading && <p className="loading">Loading technicians...</p>}
            
            <div className="tech-list">
              {Object.entries(liveLocations).map(([id, location]) => (
                <div 
                  key={id} 
                  className={`tech-item ${selectedTech === id ? 'selected' : ''}`}
                  onClick={() => setSelectedTech(id)}
                >
                  <div className="tech-avatar">👨🔧</div>
                  <div className="tech-details">
                    <h4>{location.name}</h4>
                    <span className={`status-badge ${location.status.toLowerCase().replace(' ', '-')}`}>
                      {location.status}
                    </span>
                    <p className="location-coords">
                      📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </p>
                    <p className="last-update">
                      🕑 {location.lastUpdate}
                    </p>
                  </div>
                  <button 
                    className="track-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackTechnician(id);
                    }}
                  >
                    📱 Track
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}