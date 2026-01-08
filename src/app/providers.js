"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Providers({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
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

      {/* Page Content */}
      <main className="app-content">
        {children}
      </main>
    </Provider>
  );
}
