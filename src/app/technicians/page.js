"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetTechniciansQuery } from "@/store/api/ticketApi";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import "./technicians.css";

export default function TechniciansPage() {
  const { data: technicians, isLoading } = useGetTechniciansQuery();
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  const filteredTechnicians = useMemo(() => {
    if (!technicians) return [];
    return technicians.filter(tech => {
      const matchesSearch = (tech.name || '').toLowerCase().includes(search.toLowerCase()) ||
                           (tech.phone || '').includes(search) ||
                           (tech.email || '').toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty = !specialtyFilter || 
                           (tech.skills && tech.skills.includes(specialtyFilter)) ||
                           tech.specialty === specialtyFilter;
      return matchesSearch && matchesSpecialty;
    });
  }, [technicians, search, specialtyFilter]);

  const specialties = useMemo(() => {
    if (!technicians) return [];
    const allSkills = technicians.flatMap(t => t.skills || [t.specialty]).filter(Boolean);
    return [...new Set(allSkills)];
  }, [technicians]);

  return (
    <ProtectedRoute>
      <main className="glass-app">
        <header className="glass-header">
          <h1>Technicians</h1>
        </header>

        <section className="filters-section">
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="specialty-filter"
          >
            <option value="">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
          <Link href="/technicians/map" className="map-btn">
            🗺️ Live Map
          </Link>
        </section>

        <section className="technicians-grid">
          {isLoading && <p className="loading">Loading technicians...</p>}

          {filteredTechnicians.map((tech) => (
            <Link key={tech._id} href={`/technicians/${tech._id}`} className="technician-card">
              <div className="tech-avatar">
                {tech.profilePhoto ? (
                  <img 
                    src={tech.profilePhoto} 
                    alt={tech.name}
                    className="tech-profile-pic"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="tech-avatar-fallback" style={{ display: tech.profilePhoto ? 'none' : 'flex' }}>
                  <MdPerson />
                </div>
              </div>
              
              <div className="tech-info">
                <h3>{tech.name}</h3>
                <p className="tech-phone">{tech.phone}</p>
                <p className="tech-email">{tech.email}</p>
                {tech.skills?.[0] || tech.specialty && <p className="tech-specialty">{tech.skills?.[0] || tech.specialty}</p>}
              </div>

              <div className="tech-stats">
                <div className="stat">
                  <span className="stat-value">{tech.totalJobs || 0}</span>
                  <span className="stat-label">Total Jobs</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{tech.completedJobs || 0}</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-value">⭐ {tech.avgRating || "N/A"}</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>

              <div className={`tech-status ${tech.isActive ? 'active' : 'inactive'}`}>
                {tech.isActive ? 'Active' : 'Inactive'}
              </div>
            </Link>
          ))}
        </section>

        <Link href="/technicians/create" className="fab">＋</Link>
      </main>
    </ProtectedRoute>
  );
}