"use client";
import { useGetStatsQuery } from "@/store/api/dashboardApi";

export default function DashboardCards() {
  const { data, isLoading } = useGetStatsQuery();
  if (isLoading) return <p className="loading">Loading stats…</p>;

  const Card = ({ label, value }) => (
    <div className="stat-card">
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );

  return (
    <div className="stat-grid">
      <Card label="Total Tickets" value={data.totalTickets} />
      <Card label="Open Tickets" value={data.openTickets} />
      <Card label="Completed" value={data.completedTickets} />
      <Card label="Technicians" value={data.technicians} />
      <Card label="Customers" value={data.customers} />
    </div>
  );
}
