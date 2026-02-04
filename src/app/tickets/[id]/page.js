"use client";

import "../tickets.css";
import { useParams } from "next/navigation";
import {
  useAssignTechnicianMutation,
  useGetTechniciansQuery,
  useGetTicketByIdQuery,
  useUpdateTicketStatusMutation,
} from "@/store/api/ticketApi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import TicketAttachment from "@/components/TicketAttachment";
import TicketComments from "@/components/TicketComments";

import { MdAcUnit, MdKitchen, MdLocalLaundryService, MdTv, MdWaterDrop, MdMicrowave, MdDining, MdShower, MdAir, MdOutdoorGrill, MdBuild } from "react-icons/md";

// Appliance icons mapping
const applianceIcons = {
  'AC': <MdAcUnit />,
  'Refrigerator': <MdKitchen />,
  'Washing Machine': <MdLocalLaundryService />,
  'TV': <MdTv />,
  'Water Purifier': <MdWaterDrop />,
  'Microwave': <MdMicrowave />,
  'Dishwasher': <MdDining />,
  'Geyser': <MdShower />,
  'Kitchen Chimney': <MdAir />,
  'Oven': <MdOutdoorGrill />
};

export default function TicketDetail() {
  const { id } = useParams();
  const { data: ticket } = useGetTicketByIdQuery(id);

  const { data: technicians } = useGetTechniciansQuery();
  const [assign, { isLoading }] = useAssignTechnicianMutation();
  const [updateStatus, { isLoading: statusLoading }] = useUpdateTicketStatusMutation();
  const [techId, setTechId] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newPriority, setNewPriority] = useState("");

  const getApplianceIcon = (title) => {
    const appliance = Object.keys(applianceIcons).find(key => title?.includes(key));
    return appliance ? applianceIcons[appliance] : <MdBuild />;
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

  const handleUpdateStatus = async () => {
    if (!newStatus) return;
    try {
      await updateStatus({ ticketId: id, status: newStatus }).unwrap();
      alert(`Status updated to ${newStatus}`);
      setShowStatusModal(false);
      setNewStatus("");
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const updatePriority = () => {
    if (!newPriority) return;
    console.log('Updating priority to:', newPriority);
    alert(`Priority updated to ${newPriority}`);
    setShowPriorityModal(false);
  };

  const contactCustomer = () => {
    if (ticket.customer?.phone) {
      window.open(`tel:${ticket.customer.phone}`);
    } else {
      alert('No customer phone number available');
    }
  };

  const viewHistory = () => {
    alert('History feature coming soon!');
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
              <span>Status:</span>
              <span className={`urgency-badge ${ticket.status?.toLowerCase()}`}>
                {ticket.status}
              </span>
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
              <span>Priority:</span>
              <span className={`urgency-badge ${ticket.priority?.toLowerCase()}`}>
                {ticket.priority || 'Medium'}
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
              <span>Customer Phone:</span>
              <span>{ticket.customer?.phone || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span>Customer ID:</span>
              <span>{ticket.customer?._id || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span>Created:</span>
              <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
            {ticket.technician && (
              <>
                <div className="info-row">
                  <span>Assigned Technician:</span>
                  <span>{ticket.technician.name}</span>
                </div>
                <div className="info-row">
                  <span>Technician Phone:</span>
                  <span>{ticket.technician.phone}</span>
                </div>
                <div className="info-row">
                  <span>Technician Email:</span>
                  <span>{ticket.technician.email || 'Not provided'}</span>
                </div>
                <div className="info-row">
                  <span>Role:</span>
                  <span>{ticket.technician.role}</span>
                </div>
              </>
            )}
          </div>

          <div className="technician-assign-card">
            <h3>Technician Assignment</h3>
            <div className="assign-section">
              <select
                className="technician-select"
                value={ticket.technician?._id || techId}
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
                disabled={!techId || techId === ticket.technician?._id}
                loading={isLoading}
              >
                {ticket.technician ? 'Update Assignment' : 'Assign Technician'}
              </Button>
            </div>
            
            {ticket.technician && (
              <div className="assigned-tech">
                <h4>Currently Assigned:</h4>
                <p><strong>{ticket.technician.name}</strong></p>
                <p>{ticket.technician.role}</p>
                <p>{ticket.technician.phone}</p>
              </div>
            )}
          </div>

          <div className="ticket-actions-card">
            <h3>Actions</h3>
            <div className="actions-grid">
              <Button variant="secondary" size="sm" onClick={() => setShowStatusModal(true)}>Update Status</Button>
              <Button variant="danger" size="sm" onClick={() => setShowPriorityModal(true)}>Change Priority</Button>
              <Button variant="success" size="sm" onClick={contactCustomer}>Contact Customer</Button>
              <Button variant="ghost" size="sm" onClick={viewHistory}>View History</Button>
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

        {/* Status Modal */}
        {showStatusModal && (
          <div className="modal-backdrop" onClick={() => setShowStatusModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Update Status</h3>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="NEW">New</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CLOSED">Closed</option>
              </select>
              <div className="modal-actions">
                <Button variant="primary" onClick={handleUpdateStatus} loading={statusLoading}>Update</Button>
                <Button variant="ghost" onClick={() => setShowStatusModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Priority Modal */}
        {showPriorityModal && (
          <div className="modal-backdrop" onClick={() => setShowPriorityModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Change Priority</h3>
              <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                <option value="">Select Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
              <div className="modal-actions">
                <Button variant="primary" onClick={updatePriority}>Update</Button>
                <Button variant="ghost" onClick={() => setShowPriorityModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
