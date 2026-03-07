"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import * as MdIcons from "react-icons/md";

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
            <MdIcons.MdBusiness style={{marginRight: '8px'}} />
            Admin Panel
          </Link>
        </div>

        <nav className="nav">
          <Link href="/" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdIcons.MdHome /></span>
            <span>Home</span>
          </Link>
          <Link href="/dashboard" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdIcons.MdDashboard /></span>
            <span>Dashboard</span>
          </Link>
          <Link href="/tickets" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdIcons.MdConfirmationNumber /></span>
            <span>Tickets</span>
          </Link>
          <Link href="/tickets/create" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdIcons.MdAdd /></span>
            <span>Create Ticket</span>
          </Link>
          <Link href="/technicians" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdIcons.MdEngineering /></span>
            <span>Technicians</span>
          </Link>
          <Link href="/customers" onClick={onClose} className="nav-item">
            <span className="nav-icon"><MdIcons.MdPeople /></span>
            <span>Customers</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <MdIcons.MdLogout style={{marginRight: '8px'}} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}