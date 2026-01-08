"use client";

import "./tickets.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetAllTicketsQuery } from "@/store/api/ticketApi";
import Link from "next/link";

export default function TicketsPage() {
  const { data: tickets, isLoading } = useGetAllTicketsQuery();

  return (
    <ProtectedRoute>
      <main className="glass-app">
        {/* Header */}
        <header className="glass-header">
          <h1>Available Tickets</h1>
        </header>

        {/* Grid */}
        <section className="ticket-grid">
          {isLoading && <p className="loading">Loading…</p>}

          {tickets?.map((t) => (
            <Link
              key={t._id}
              href={`/tickets/${t._id}`}
              className="glass-card"
            >
              <h3>{t.title}</h3>
              <p className="sub">{t.description || "Ticket details"}</p>

              <div className="price">₹ {t.price ?? 0}</div>

              <div className="stats">
                <span>{t.sold ?? 0} sold</span>
                <span>{t.quantity ?? 0} qty</span>
              </div>

              <div className={`badge ${t.status?.toLowerCase()}`}>
                {t.status}
              </div>
            </Link>
          ))}
        </section>

        {/* FAB */}
        <Link href="/tickets/create" className="fab">＋</Link>
      </main>
    </ProtectedRoute>
  );
}
