"use client";
import { useGetTechnicianPerformanceQuery } from "@/store/api/dashboardApi";

export default function TechnicianPerformance() {
  const { data, isLoading } = useGetTechnicianPerformanceQuery();
  if (isLoading) return <p className="loading">Loading performance…</p>;

  return (
    <div className="glass-panel">
      <h3>Technician Performance</h3>

      <div className="list">
        {data.map((t) => (
          <div key={t.phone} className="list-card">
            <p className="name">{t.name}</p>
            <div className="meta">
              <span>Total: {t.totalJobs}</span>
              <span>Done: {t.completedJobs}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
