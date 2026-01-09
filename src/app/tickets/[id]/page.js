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
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import TicketAttachment from "@/components/TicketAttachment";
import TicketComments from "@/components/TicketComments";

// Appliance icons mapping
const applianceIcons = {
  'AC': '❄️',
  'Refrigerator': '🧊',
  'Washing Machine': '👕',
  'TV': '📺',
  'Water Purifier': '💧',
  'Microwave': '🔥',
  'Dishwasher': '🍽️',
  'Geyser': '🚿',
  'Kitchen Chimney': '💨',
  'Oven': '🔥'
};

export default function TicketDetail() {
  const { id } = useParams();
  const { data: tickets } = useGetAllTicketsQuery();
  const ticket = tickets?.find((t) => t._id === id);

  const { data: technicians } = useGetTechniciansQuery();
  const [assign, { isLoading }] = useAssignTechnicianMutation();
  const [techId, setTechId] = useState("");

  const getApplianceIcon = (title) => {
    const appliance = Object.keys(applianceIcons).find(key => title?.includes(key));
    return appliance ? applianceIcons[appliance] : '🔧';
  };

  if (!ticket) return <Loader />;

  const assignTech = async () => {
    if (!techId) return;
    try {
      await assign({ ticketId: id, technicianId: techId }).unwrap();
      alert("Technician Assigned Successfully");
      setTechId("");
    } catch (error) {
      alert("Failed to assign technician");
    }
  };

  return (
    <ProtectedRoute>
      <main className="ticket-detail-container">
        <header className="ticket-detail-header">
          <div className="ticket-icon-large">{getApplianceIcon(ticket.title)}</div>
          <div className="ticket-header-info">
            <h1>{ticket.title}</h1>
            <div className={`ticket-status-large ${ticket.status?.toLowerCase()}`}>
              {ticket.status}
            </div>
          </div>
        </header>

        <div className="ticket-detail-grid">
          <div className="ticket-info-card">
            <h3>Ticket Information</h3>
            <div className="info-row">
              <span>Description:</span>
              <span>{ticket.description || 'No description'}</span>
            </div>
            <div className="info-row">
              <span>Address:</span>
              <span>{ticket.address || 'No address provided'}</span>
            </div>
            <div className="info-row">
              <span>Urgency:</span>
              <span className={`urgency-badge ${ticket.urgency?.toLowerCase()}`}>
                {ticket.urgency || 'Normal'}
              </span>
            </div>
            <div className="info-row">
              <span>Time Slot:</span>
              <span>{ticket.timeSlot || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <span>Customer:</span>
              <span>{ticket.customer?.name || 'Unknown'}</span>
            </div>
            <div className="info-row">
              <span>Created:</span>
              <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="technician-assign-card">
            <h3>Assign Technician</h3>
            <div className="assign-section">
              <select
                className="technician-select"
                value={techId}
                onChange={(e) => setTechId(e.target.value)}
              >
                <option value="">Select Technician</option>
                {technicians?.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} - {t.specialty || 'General'}
                  </option>
                ))}
              </select>
              <Button
                variant="primary"
                onClick={assignTech}
                disabled={!techId}
                loading={isLoading}
              >
                Assign Technician
              </Button>
            </div>
            {ticket.assignedTechnician && (
              <div className="assigned-tech">
                <h4>Currently Assigned:</h4>
                <p>{ticket.assignedTechnician.name}</p>
              </div>
            )}
          </div>

          <div className="ticket-actions-card">
            <h3>Actions</h3>
            <div className="actions-grid">
              <Button variant="secondary" size="sm">Update Status</Button>
              <Button variant="danger" size="sm">Change Priority</Button>
              <Button variant="success" size="sm">Contact Customer</Button>
              <Button variant="ghost" size="sm">View History</Button>
            </div>
          </div>
        </div>

        <div className="ticket-detail-grid">
          <div className="attachments-section">
            <TicketAttachment ticketId={id} />
          </div>

          <div className="comments-section">
            <TicketComments ticketId={id} />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
