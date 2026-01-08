"use client";

import "../tickets.css";
import { useParams } from "next/navigation";
import {
  useAssignTechnicianMutation,
  useGetTechniciansQuery,
  useGetAllTicketsQuery,
} from "@/store/api/ticketApi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import TicketAttachment from "@/components/TicketAttachment";
import TicketComments from "@/components/TicketComments";

export default function TicketDetail() {
  const { id } = useParams();
  const { data: tickets } = useGetAllTicketsQuery();
  const ticket = tickets?.find((t) => t._id === id);

  const { data: technicians } = useGetTechniciansQuery();
  const [assign, { isLoading }] = useAssignTechnicianMutation();
  const [techId, setTechId] = useState("");
console.log("technicians", technicians)
  if (!ticket) return null;

  const assignTech = async () => {
    await assign({ ticketId: id, technicianId: techId }).unwrap();
    alert("Technician Assigned");
  };

  return (
    <ProtectedRoute>
      <main className="glass-screen ticket-detail">
        {/* Header */}
        <header className="glass-header">
          <h1>{ticket.title}</h1>
        </header>

        {/* Overview */}
        <section className="glass-panel">
          <div className="info-row">
            <span>Status</span>
            <span className={`badge ${ticket.status?.toLowerCase()}`}>
              {ticket.status}
            </span>
          </div>

          <div className="info-row">
            <span>Customer</span>
            <span>{ticket.customer?.name}</span>
          </div>

          <div className="assign-row">
            <select
              className="glass-select"
              onChange={(e) => setTechId(e.target.value)}
            >
              <option value="">Assign Technician</option>
              {technicians?.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              className="btn btn-primary"
              onClick={assignTech}
              disabled={isLoading}
            >
              {isLoading ? "Assigning…" : "Assign"}
            </button>
          </div>
        </section>

        {/* Attachments */}
        <section className="glass-panel">
          <TicketAttachment ticketId={id} />
        </section>

        {/* Comments */}
        <section className="glass-panel">
          <TicketComments ticketId={id} />
        </section>
      </main>
    </ProtectedRoute>
  );
}
