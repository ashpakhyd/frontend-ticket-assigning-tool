"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const features = [
    { icon: "📦", label: "Orders" },
    { icon: "🏷️", label: "Inventory" },
    { icon: "🛠️", label: "Service Tickets" },
    { icon: "👨‍🔧", label: "Staff Management" },
    { icon: "👥", label: "Customers" },
    { icon: "📊", label: "Reports" },
    { icon: "💳", label: "Payments" },
    { icon: "📥", label: "Purchase Orders" },
    { icon: "🚚", label: "Suppliers" },
    { icon: "📍", label: "Store Locations" },
    { icon: "🧾", label: "Invoices" },
    { icon: "🔔", label: "Notifications" },
    { icon: "📅", label: "Appointments" },
    { icon: "📦", label: "Stock Transfer" },
    { icon: "📈", label: "Sales Analytics" },
    { icon: "🧑‍💼", label: "Roles & Access" },
    { icon: "🧠", label: "Audit Logs" },
    { icon: "⚙️", label: "System Settings" },
    { icon: "☁️", label: "Backup & Sync" },
    { icon: "❓", label: "Help & Support" },
  ];

  return (
    <main className="app-container">
      <header className="app-header">
        <h1 className="app-title">Store Management</h1>
        <span className="app-avatar">👤</span>
      </header>

      <section className="tiles-grid">
        {features.map((item, index) => (
          <div key={index} className="tile">
            <span className="tile-icon">{item.icon}</span>
            <span className="tile-label">{item.label}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
