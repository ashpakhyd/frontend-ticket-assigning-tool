"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardFilterCards from "@/components/DashboardFilterCards";
import DashboardFilteredView from "@/components/DashboardFilteredView";
import "./dashboard.css";

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  return (
    <ProtectedRoute>
      <main className="dashboard-container">
        <header className="dashboard-header">
          <h1>Dashboard Overview</h1>
          <p>Monitor your service operations</p>
        </header>

        <section className="stats-section">
          <DashboardFilterCards
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </section>

        <section className="charts-section">
          <DashboardFilteredView filter={activeFilter} />
        </section>
      </main>
    </ProtectedRoute>
  );
}
