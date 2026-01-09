"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const features = [
    { icon: "📊", label: "Dashboard", path: "/dashboard", active: true },
    { icon: "🎫", label: "Service Tickets", path: "/tickets", active: true },
    { icon: "➕", label: "Create Ticket", path: "/tickets/create", active: true },
    { icon: "👨🔧", label: "Technicians", path: "/technicians", active: true },
    { icon: "💳", label: "Payments", path: "#", active: false },
    { icon: "📦", label: "Orders", path: "#", active: false },
    { icon: "🏷️", label: "Inventory", path: "#", active: false },
    { icon: "👥", label: "Customers", path: "#", active: false },
    { icon: "📈", label: "Reports", path: "#", active: false },
    { icon: "📥", label: "Purchase Orders", path: "#", active: false },
    { icon: "🚚", label: "Suppliers", path: "#", active: false },
    { icon: "📍", label: "Store Locations", path: "#", active: false },
    { icon: "🧾", label: "Invoices", path: "#", active: false },
    { icon: "🔔", label: "Notifications", path: "#", active: false },
    { icon: "📅", label: "Appointments", path: "#", active: false },
    { icon: "📦", label: "Stock Transfer", path: "#", active: false },
    { icon: "📈", label: "Sales Analytics", path: "#", active: false },
    { icon: "🧑💼", label: "Roles & Access", path: "#", active: false },
    { icon: "🧠", label: "Audit Logs", path: "#", active: false },
    { icon: "⚙️", label: "System Settings", path: "#", active: false },
  ];

  return (
    <main className="home-container">
      <header className="home-header">
        <h1>Store Management System</h1>
        <p>Manage your service operations efficiently</p>
      </header>

      <section className="home-tiles-grid">
        {features.map((item, index) => (
          item.active ? (
            <Link key={index} href={item.path} className="home-tile active">
              <span className="home-tile-icon">{item.icon}</span>
              <span className="home-tile-label">{item.label}</span>
            </Link>
          ) : (
            <div key={index} className="home-tile inactive">
              <span className="home-tile-icon">{item.icon}</span>
              <span className="home-tile-label">{item.label}</span>
              <span className="coming-soon">Coming Soon</span>
            </div>
          )
        ))}
      </section>
    </main>
  );
}