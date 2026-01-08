"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Sidebar({ open, onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
    onClose();
  };

  return (
    <>
      <div
        className={`sidebar-backdrop ${open ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="logo">Admin</h2>

        <nav className="nav">
          <Link href="/dashboard" onClick={onClose}>Dashboard</Link>
          <Link href="/tickets" onClick={onClose}>Tickets</Link>
          <Link href="/tickets/create" onClick={onClose}>Create Ticket</Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
