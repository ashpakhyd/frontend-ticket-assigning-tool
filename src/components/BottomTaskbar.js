"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdConfirmationNumber, MdEngineering, MdPerson, MdPeople, MdLocalOffer } from "react-icons/md";

function TaskbarContent() {
  const pathname = usePathname();

  const navItems = [
    { icon: <MdHome />, label: "Home", path: "/" },
    { icon: <MdConfirmationNumber />, label: "Tickets", path: "/tickets" },
    { icon: <MdLocalOffer />, label: "Offers", path: "/offers" },
    { icon: <MdEngineering />, label: "Technicians", path: "/technicians" },
    { icon: <MdPeople />, label: "Customers", path: "/customers" },
    { icon: <MdPerson />, label: "Profile", path: "/profile" },
  ];

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`taskbar-item ${pathname === item.path ? "active" : ""}`}
        >
          <span className="taskbar-icon">{item.icon}</span>
          <span className="taskbar-label">{item.label}</span>
        </Link>
      ))}
    </>
  );
}

export default function BottomTaskbar() {
  return (
    <nav className="bottom-taskbar">
      <Suspense fallback={null}>
        <TaskbarContent />
      </Suspense>
    </nav>
  );
}