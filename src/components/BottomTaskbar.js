"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdConfirmationNumber, MdEngineering, MdPerson } from "react-icons/md";

export default function BottomTaskbar() {
  const pathname = usePathname();

  const navItems = [
    { icon: <MdHome />, label: "Home", path: "/" },
    { icon: <MdConfirmationNumber />, label: "Tickets", path: "/tickets" },
    { icon: <MdEngineering />, label: "Technicians", path: "/technicians" },
    { icon: <MdPerson />, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bottom-taskbar">
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
    </nav>
  );
}