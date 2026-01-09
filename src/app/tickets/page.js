"use client";

import "./tickets.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetAllTicketsQuery } from "@/store/api/ticketApi";
import Link from "next/link";

// Appliance icons mapping
const applianceIcons = {
  'AC': '❄️',
  'Refrigerator': '🧊',
  'Washing Machine': '👕',
  'TV': '📺',
  'Water Purifier': '💧',
  'Microwave': '🔥',
  'Dishwasher': '🍽️',
  'Geyser': '🚿',
  'Kitchen Chimney': '💨',
  'Oven': '🔥'
};

export default function TicketsPage() {
  const { data: tickets, isLoading } = useGetAllTicketsQuery();

  const getApplianceIcon = (title) => {
    const appliance = Object.keys(applianceIcons).find(key => title?.includes(key));
    return appliance ? applianceIcons[appliance] : '🔧';
  };

  return (
    <ProtectedRoute>
      <main className="glass-app">
        <header className="glass-header">
          <h1>Available Tickets</h1>
        </header>

        <section className="ticket-grid">
          {isLoading && <p className="loading">Loading…</p>}

          {tickets?.map((t) => (
            <Link
              key={t._id}
              href={`/tickets/${t._id}`}
              className="ticket-card"
            >
              <div className="ticket-icon">{getApplianceIcon(t.title)}</div>
              
              <div className="ticket-content">
                <h3>{t.title}</h3>
                <p className="ticket-description">{t.description || "Ticket details"}</p>
                
                <div className="ticket-meta">
                  <span className="ticket-address">{t.address || 'No address'}</span>
                  <span className="ticket-urgency">{t.urgency || 'Normal'}</span>
                </div>
              </div>

              <div className={`ticket-status ${t.status?.toLowerCase()}`}>
                {t.status}
              </div>
            </Link>
          ))}
        </section>

        <Link href="/tickets/create" className="fab">＋</Link>
      </main>
    </ProtectedRoute>
  );
}
