"use client";
import { useGetCustomerRatingsQuery } from "@/store/api/dashboardApi";

export default function CustomerRatings() {
  const { data, isLoading } = useGetCustomerRatingsQuery();
  if (isLoading) return <p className="loading">Loading ratings…</p>;

  return (
    <div className="glass-panel">
      <h3>Customer Ratings</h3>

      <div className="list">
        {data?.map((r) => (
          <div key={r._id} className="list-card">
            <p className="name">For: {r.technician?.name || 'Unknown Technician'}</p>
            <div className="meta">
              <span>⭐ {r.rating}/5</span>
              <span>{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
            <p style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem'}}>
              {r.feedback || 'No feedback'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}