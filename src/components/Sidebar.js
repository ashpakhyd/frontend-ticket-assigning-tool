"use client";

import Link from "next/link";

export default function Sidebar({ open, onClose }) {
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
      </aside>
    </>
  );
}
