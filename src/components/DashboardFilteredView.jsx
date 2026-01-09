"use client";

import TicketStatusChart from "@/components/TicketStatusChart";
import TechnicianPerformance from "@/components/TechnicianPerformance";
import TechnicianRatings from "@/components/TechnicianRatings";
import CustomerRatings from "@/components/CustomerRatings";

export default function DashboardFilteredView({ filter }) {
  switch (filter) {
    case "OPEN":
    case "COMPLETED":
      return <TicketStatusChart />;

    case "TECH":
      return <TechnicianPerformance />;

    case "CUSTOMER":
      return <CustomerRatings />;

    case "ALL":
    default:
      return (
        <>
          <TicketStatusChart />
          <TechnicianPerformance />
          <TechnicianRatings />
          <CustomerRatings />
        </>
      );
  }
}
