"use client";

import { useParams } from "next/navigation";
import { useGetTechniciansQuery } from "@/store/api/ticketApi";
import ProtectedRoute from "@/components/ProtectedRoute";
import "../technicians.css";

export default function TechnicianDetail() {
  const { id } = useParams();
  const { data: technicians } = useGetTechniciansQuery();
  const technician = technicians?.find(t => t._id === id);

  if (!technician) return <p>Loading...</p>;

  return (
    <ProtectedRoute>
      <main className="glass-app">
        <header className="glass-header">
          <h1>{technician.name}</h1>
        </header>

        <section className="tech-detail-grid">
          <div className="tech-profile-card">
            <div className="tech-avatar-large">👨🔧</div>
            <h2>{technician.name}</h2>
            <p className="tech-specialty-large">{technician.specialty || 'General'}</p>
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
              <span>Specialty:</span>
              <span>{technician.specialty || 'General'}</span>
            </div>
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
              <button className="btn btn-primary">Assign Ticket</button>
              <button className="btn btn-secondary">View History</button>
              <button className={`btn ${technician.isActive ? 'btn-danger' : 'btn-success'}`}>
                {technician.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className="btn btn-ghost">Edit Profile</button>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}