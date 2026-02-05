"use client";

import { useParams } from "next/navigation";
import { useGetTechniciansQuery } from "@/store/api/ticketApi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import "../technicians.css";

export default function TechnicianDetail() {
  const { id } = useParams();
  const { data: technicians } = useGetTechniciansQuery();
  const technician = technicians?.find(t => t._id === id);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!technician) return <p>Loading...</p>;

  const handleAction = async () => {
    setIsLoading(true);
    try {
      let endpoint;
      if (technician.isVerified && !technician.isActive) {
        endpoint = 'activate';
      } else if (technician.isVerified) {
        endpoint = 'deActivate';
      } else {
        endpoint = 'verify';
      }
      
      const response = await fetch(`http://localhost:5000/api/admin/technicians/${id}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const action = endpoint === 'activate' ? 'activated' : endpoint === 'verify' ? 'verified' : 'deactivated';
        alert(`Technician ${action} successfully!`);
        window.location.reload();
      } else {
        alert('Action failed');
      }
    } catch (error) {
      alert('Error occurred');
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="glass-app">
        <header className="glass-header">
          <h1>{technician.name}</h1>
        </header>

        <section className="tech-detail-grid">
          <div className="tech-profile-card">
            {technician.profilePhoto ? (
              <img 
                src={technician.profilePhoto} 
                alt={technician.name} 
                className="tech-avatar-large" 
                style={{borderRadius: '50%', objectFit: 'cover', width: '80px', height: '80px', cursor: 'pointer'}} 
                onClick={() => window.open(technician.profilePhoto, '_blank')}
              />
            ) : (
              <div className="tech-avatar-large">👨🔧</div>
            )}
            <h2>{technician.name}</h2>
            <p className="tech-specialty-large">{technician.skills?.[0] || technician.specialty || 'General'}</p>
            <div className={`status-badge ${technician.isActive ? 'active' : 'inactive'}`}>
              {technician.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>

          <div className="tech-info-card">
            <h3>Contact Information</h3>
            <div className="info-row">
              <span>Phone:</span>
              <span>{technician.phone}</span>
            </div>
            <div className="info-row">
              <span>Email:</span>
              <span>{technician.email}</span>
            </div>
            <div className="info-row">
              <span>Address:</span>
              <span>{technician.address || 'Not provided'}</span>
            </div>
            <div className="info-row">
              <span>Service Areas:</span>
              <span>{technician.serviceAreas || 'Not specified'}</span>
            </div>
          </div>

          <div className="tech-info-card">
            <h3>Professional Details</h3>
            <div className="info-row">
              <span>Skills:</span>
              <span>{technician.skills?.join(', ') || technician.specialty || 'General'}</span>
            </div>
            <div className="info-row">
              <span>Experience:</span>
              <span>{technician.experience || 'Not specified'} years</span>
            </div>
            <div className="info-row">
              <span>Certification:</span>
              <span>{technician.certification || 'None'}</span>
            </div>
            <div className="info-row">
              <span>Verified:</span>
              <span className={`status-badge ${technician.isVerified ? 'active' : 'inactive'}`}>
                {technician.isVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          </div>

          <div className="tech-info-card">
            <h3>Identity Information</h3>
            <div className="info-row">
              <span>ID Type:</span>
              <span>{technician.idType?.toUpperCase() || 'Not provided'}</span>
            </div>
            <div className="info-row">
              <span>ID Number:</span>
              <span>{technician.idNumber || 'Not provided'}</span>
            </div>
            <div className="info-row">
              <span>Technician ID:</span>
              <span>{technician._id}</span>
            </div>
            {technician.idDocument && (
              <div className="info-row">
                <span>ID Document:</span>
                <a href={technician.idDocument} target="_blank" rel="noopener noreferrer" style={{color: '#2563eb', textDecoration: 'underline'}}>View Document</a>
              </div>
            )}
          </div>

          <div className="tech-stats-card">
            <h3>Performance Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{technician.totalJobs || 0}</span>
                <span className="stat-label">Total Jobs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{technician.completedJobs || 0}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">⭐ {technician.avgRating || "N/A"}</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{technician.totalRatings || 0}</span>
                <span className="stat-label">Reviews</span>
              </div>
            </div>
          </div>

          <div className="tech-actions-card">
            <h3>Actions</h3>
            <div className="actions-grid">
              <button 
                className={`btn ${!technician.isVerified ? 'btn-success' : (technician.isActive ? 'btn-danger' : 'btn-primary')}`}
                onClick={() => setShowModal(true)}
              >
                {!technician.isVerified ? 'Verify this Technician' : 
                 technician.isActive ? 'Deactivate this Technician' : 'Activate this Technician'}
              </button>
            </div>
          </div>
        </section>

        {showModal && (
          <div className="modal-backdrop" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Confirm Action</h3>
              <p>Are you sure you want to {!technician.isVerified ? 'verify' : (technician.isActive ? 'deactivate' : 'activate')} this technician?</p>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={handleAction} disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Confirm'}
                </button>
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}