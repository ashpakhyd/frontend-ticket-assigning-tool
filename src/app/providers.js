"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Providers({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
