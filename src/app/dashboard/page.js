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
      <main className="glass-screen">
        <header className="glass-header">
          <h1>Dashboard</h1>
        </header>

        <section className="dash-section">
          <DashboardFilterCards
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </section>

        <section className="dash-section">
          <DashboardFilteredView filter={activeFilter} />
        </section>
      </main>
    </ProtectedRoute>
  );
}
