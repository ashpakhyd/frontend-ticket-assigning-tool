"use client";
import { useGetTechniciansQuery } from "@/store/api/ticketApi";
import { MdStar } from "react-icons/md";

export default function TechnicianRatings() {
  const { data, isLoading } = useGetTechniciansQuery();
  if (isLoading) return <p className="loading">Loading ratings…</p>;

  return (
    <div className="glass-panel">
      <h3>Technician Ratings</h3>

      <div className="list">
        {data?.map((r) => (
          <div key={r._id} className="list-card">
            <p className="name">{r.name}</p>
            <div className="meta">
              <span><MdStar style={{color: '#fbbf24', marginRight: '4px'}} />{r.avgRating || 'N/A'}</span>
              <span>{r.totalRatings || 0} reviews</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
