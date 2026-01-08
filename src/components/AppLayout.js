"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  const token = useSelector((state) => state.auth.token);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = !!token;

  return (
    <>
      {isLoggedIn && (
        <>
          {/* Top Bar */}
          <header className="app-topbar">
            <button
              className="menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <span className="app-title">Admin Panel</span>
          </header>

          {/* Sidebar */}
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </>
      )}

      {/* Page Content */}
      <main className="app-content">
        {children}
      </main>
    </>
  );
}
