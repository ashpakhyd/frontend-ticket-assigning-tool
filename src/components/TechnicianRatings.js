"use client";
import { useGetTechnicianRatingsQuery } from "@/store/api/dashboardApi";
import { MdStar } from "react-icons/md";

export default function TechnicianRatings() {
  const { data, isLoading } = useGetTechnicianRatingsQuery();
  if (isLoading) return <p className="loading">Loading ratings…</p>;

  return (
    <div className="glass-panel">
      <h3>Technician Ratings</h3>

      <div className="list">
        {data.map((r) => (
          <div key={r.phone} className="list-card">
            <p className="name">{r.name}</p>
            <div className="meta">
              <span><MdStar style={{color: '#fbbf24', marginRight: '4px'}} />{r.avgRating}</span>
              <span>{r.totalRatings} reviews</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
