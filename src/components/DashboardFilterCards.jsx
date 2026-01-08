"use client";

import { useGetStatsQuery } from "@/store/api/dashboardApi";

export default function DashboardFilterCards({ active, onChange }) {
  const { data, isLoading } = useGetStatsQuery();
  if (isLoading) return <p className="loading">Loading stats…</p>;

  const cards = [
    { key: "ALL", label: "Total Tickets", value: data.totalTickets },
    { key: "OPEN", label: "Open Tickets", value: data.openTickets },
    { key: "COMPLETED", label: "Completed", value: data.completedTickets },
    { key: "TECH", label: "Technicians", value: data.technicians },
    { key: "CUSTOMER", label: "Customers", value: data.customers },
  ];

  return (
    <div className="stat-grid">
      {cards.map((c) => (
        <button
          key={c.key}
          className={`stat-card ${active === c.key ? "active" : ""}`}
          onClick={() => onChange(c.key)}
        >
          <h2>{c.value}</h2>
          <p>{c.label}</p>
        </button>
      ))}
    </div>
  );
}
