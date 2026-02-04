"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetRecentTicketsQuery } from "@/store/api/ticketApi";
import { 
  MdConfirmationNumber, 
  MdAdd, 
  MdEngineering, 
  MdDashboard,
  MdPerson,
  MdAnalytics,
  MdSettings,
  MdNotifications,
  MdPayment,
  MdHistory,
  MdSupport,
  MdSecurity,
  MdAccessTime,
  MdArrowForward
} from "react-icons/md";

export default function Home() {
  const router = useRouter();
  const { data: recentTickets = [], isLoading, error } = useGetRecentTicketsQuery();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const quickActions = [
    { icon: <MdAdd />, label: "Create Ticket", path: "/tickets/create" },
    { icon: <MdConfirmationNumber />, label: "View Tickets", path: "/tickets" },
    { icon: <MdEngineering />, label: "Technicians", path: "/technicians" },
    { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard" },
  ];

  const services = [
    { icon: <MdAnalytics />, label: "Analytics", path: "/analytics" },
    { icon: <MdPayment />, label: "Payments", path: "/payments" },
    { icon: <MdHistory />, label: "History", path: "/history" },
    { icon: <MdNotifications />, label: "Notifications", path: "/notifications" },
    { icon: <MdSupport />, label: "Support", path: "/support" },
    { icon: <MdSecurity />, label: "Security", path: "/security" },
    { icon: <MdSettings />, label: "Settings", path: "/settings" },
    { icon: <MdPerson />, label: "Profile", path: "/profile" },
  ];

  const getStatusColor = (status) => {
    return "#ff6b6b";
  };

  return (
    <div className="flipkart-home">
      <div className="flipkart-header">
        <div className="header-content">
          <h1>Service Admin</h1>
          <p>Your trusted service management partner</p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((item, index) => (
            <Link key={index} href={item.path} className="flipkart-action-card">
              <div className="action-icon">
                {item.icon}
              </div>
              <span className="action-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Recent Tickets</h2>
          <Link href="/tickets" className="view-all-link">
            View All <MdArrowForward />
          </Link>
        </div>
        <div className="recent-tickets-card">
          {isLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              Loading tickets...
            </div>
          ) : error ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              Error loading tickets
            </div>
          ) : recentTickets.length > 0 ? (
            recentTickets.map((ticket, index) => (
              <Link key={index} href={`/tickets/${ticket._id || ticket.id}`} className="ticket-item">
                <div className="ticket-info">
                  <h4 className="ticket-title">{ticket.title}</h4>
                  <div className="ticket-meta">
                    <p className="ticket-customer">{ticket.customer?.name || ticket.customer}</p>
                  </div>
                </div>
                <div className="ticket-right">
                  <span className="ticket-status" style={{ backgroundColor: getStatusColor(ticket.status) }}>
                    {ticket.status}
                  </span>
                  <span className="ticket-id-small">
                    {ticket.ticketId || ticket._id || ticket.id}
                  </span>
                  <div className="ticket-time">
                    <MdAccessTime /> {ticket.time || new Date(ticket.createdAt).toLocaleString()}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              No new tickets found
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">All Services</h2>
        <div className="services-grid">
          {services.map((item, index) => (
            <Link key={index} href={item.path} className="flipkart-service-card">
              <div className="service-icon">
                {item.icon}
              </div>
              <span className="service-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}