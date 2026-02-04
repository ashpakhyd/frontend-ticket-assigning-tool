"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { MdHome, MdDashboard, MdConfirmationNumber, MdAdd, MdEngineering, MdBusiness, MdLogout } from "react-icons/md";

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
        <div className="sidebar-header">
          <Link href="/" onClick={onClose} className="logo">
            <MdBusiness style={{marginRight: '8px'}} />
            Admin Panel
          </Link>
        </div>

        <nav className="nav">
          <Link href="/" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdHome /></span>
            <span>Home</span>
          </Link>
          <Link href="/dashboard" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdDashboard /></span>
            <span>Dashboard</span>
          </Link>
          <Link href="/tickets" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdConfirmationNumber /></span>
            <span>Tickets</span>
          </Link>
          <Link href="/tickets/create" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdAdd /></span>
            <span>Create Ticket</span>
          </Link>
          <Link href="/technicians" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdEngineering /></span>
            <span>Technicians</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <MdLogout style={{marginRight: '8px'}} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}