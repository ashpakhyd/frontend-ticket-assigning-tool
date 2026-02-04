"use client";
import { useSelector } from "react-redux";
import BottomTaskbar from "./BottomTaskbar";

export default function AppLayout({ children }) {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  return (
    <>
      {/* Page Content */}
      <main className="app-content">
        {children}
      </main>
      
      {/* Bottom Taskbar */}
      {isLoggedIn && <BottomTaskbar />}
    </>
  );
}