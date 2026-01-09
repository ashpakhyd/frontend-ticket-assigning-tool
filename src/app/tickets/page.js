"use client";

import "./tickets.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetAllTicketsQuery } from "@/store/api/ticketApi";
import { useState, useMemo } from "react";
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
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const filteredAndSortedTickets = useMemo(() => {
    if (!tickets) return [];
    
    let filtered = tickets.filter(ticket => {
      const matchesStatus = !statusFilter || ticket.status === statusFilter;
      const matchesSearch = !search || 
        ticket.title?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.description?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    // Sort by status priority: NEW first, then others
    const statusOrder = { 'NEW': 1, 'ASSIGNED': 2, 'IN_PROGRESS': 3, 'COMPLETED': 4, 'CLOSED': 5 };
    return filtered.sort((a, b) => {
      const aOrder = statusOrder[a.status] || 999;
      const bOrder = statusOrder[b.status] || 999;
      return aOrder - bOrder;
    });
  }, [tickets, statusFilter, search]);

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

        <section className="filters-section">
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="">All Status</option>
            <option value="NEW">New</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CLOSED">Closed</option>
          </select>
        </section>

        <section className="ticket-grid">
          {isLoading && <p className="loading">Loading…</p>}

          {filteredAndSortedTickets?.map((t) => (
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
                
                <div className="ticket-meta">
                  <span><strong>Customer:</strong> {t.customer?.name || 'Unknown'}</span>
                  <span><strong>Phone:</strong> {t.customer?.phone || 'N/A'}</span>
                </div>
                
                <div className="ticket-meta">
                  <span><strong>ID:</strong> {t.customer?._id?.slice(0, 8) + '...' || 'N/A'}</span>
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
