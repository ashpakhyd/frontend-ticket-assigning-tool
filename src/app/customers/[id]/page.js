"use client";

import { useParams } from "next/navigation";
import { useGetCustomersQuery, useVerifyCustomerMutation, useDeactivateCustomerMutation, useActivateCustomerMutation } from "@/store/api/customerApi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MdPerson } from "react-icons/md";
import { useState } from "react";
import "../customers.css";

export default function CustomerDetail() {
  const { id } = useParams();
  const { data, refetch } = useGetCustomersQuery({ search: id, page: 1, limit: 1 });
  const [verifyCustomer, { isLoading: isVerifying }] = useVerifyCustomerMutation();
  const [deactivateCustomer, { isLoading: isDeactivating }] = useDeactivateCustomerMutation();
  const [activateCustomer, { isLoading: isActivating }] = useActivateCustomerMutation();
  const [message, setMessage] = useState("");
  
  const customer = data?.customers?.find(c => c._id === id);

  const handleVerify = async () => {
    try {
      const result = await verifyCustomer(id).unwrap();
      setMessage(result.message || "Customer verified successfully");
      refetch();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error?.data?.message || "Failed to verify customer");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDeactivate = async () => {
    try {
      const result = await deactivateCustomer(id).unwrap();
      setMessage(result.message || "Customer deactivated successfully");
      refetch();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error?.data?.message || "Failed to deactivate customer");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleActivate = async () => {
    try {
      const result = await activateCustomer(id).unwrap();
      setMessage(result.message || "Customer activated successfully");
      refetch();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error?.data?.message || "Failed to activate customer");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!customer) return <p className="loading">Loading...</p>;

  return (
    <ProtectedRoute>
      <main className="glass-app">
        <header className="glass-header">
          <h1>{customer.name}</h1>
        </header>

        <section className="customer-detail-grid">
          {message && (
            <div className={`alert ${message.includes("success") ? "success" : "error"}`}>
              {message}
            </div>
          )}
          
          <div className="customer-profile-card">
            <div className="customer-avatar-large">
              <MdPerson />
            </div>
            <h2>{customer.name}</h2>
            <div className="customer-badges" style={{justifyContent: 'center', marginTop: '1rem'}}>
              <div className={`badge ${customer.isActive ? 'active' : 'inactive'}`}>
                {customer.isActive ? 'Active' : 'Inactive'}
              </div>
              <div className={`badge ${customer.isVerified ? 'verified' : 'unverified'}`}>
                {customer.isVerified ? 'Verified' : 'Unverified'}
              </div>
            </div>
            {!customer.isVerified && (
              <button 
                onClick={handleVerify} 
                disabled={isVerifying}
                className="verify-btn"
                style={{marginTop: '1rem', width: '100%'}}
              >
                {isVerifying ? 'Verifying...' : 'Verify Customer'}
              </button>
            )}
            <button 
              onClick={customer.isActive ? handleDeactivate : handleActivate}
              disabled={isDeactivating || isActivating}
              className={customer.isActive ? "deactivate-btn" : "activate-btn"}
              style={{marginTop: '0.5rem', width: '100%'}}
            >
              {isDeactivating ? 'Deactivating...' : isActivating ? 'Activating...' : customer.isActive ? 'Block Customer' : 'Unblock Customer'}
            </button>
          </div>

          <div className="customer-info-card">
            <h3>Contact Information</h3>
            <div className="info-row">
              <span>Phone:</span>
              <span>{customer.phone}</span>
            </div>
            <div className="info-row">
              <span>Email:</span>
              <span>{customer.email}</span>
            </div>
            <div className="info-row">
              <span>Customer ID:</span>
              <span>{customer._id}</span>
            </div>
            <div className="info-row">
              <span>Role:</span>
              <span>{customer.role}</span>
            </div>
            <div className="info-row">
              <span>Joined:</span>
              <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {customer.ticketOTPs?.length > 0 && (
            <div className="customer-info-card">
              <h3>Ticket OTPs</h3>
              {customer.ticketOTPs.map((ticket) => (
                <div key={ticket._id} className="otp-item">
                  <div className="otp-header">
                    <strong>{ticket.title}</strong>
                    <span className={`badge ${ticket.status.toLowerCase()}`}>{ticket.status}</span>
                  </div>
                  <div className="otp-details">
                    <div>Start OTP: <strong>{ticket.otp}</strong></div>
                    {ticket.finalOTP && <div>Final OTP: <strong>{ticket.finalOTP}</strong></div>}
                    <div className="otp-date">{new Date(ticket.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {customer.phoneOTPs?.length > 0 && (
            <div className="customer-info-card">
              <h3>Phone Verification OTPs</h3>
              {customer.phoneOTPs.map((phoneOtp) => (
                <div key={phoneOtp._id} className="otp-item">
                  <div className="otp-details">
                    <div>OTP: <strong>{phoneOtp.otp}</strong></div>
                    <div>Expires: {new Date(phoneOtp.expiresAt).toLocaleString()}</div>
                    <div className="otp-date">{new Date(phoneOtp.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}
