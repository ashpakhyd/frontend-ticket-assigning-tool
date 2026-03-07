"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllOffersQuery, useDeleteOfferMutation, useBulkActionsMutation } from "@/store/api/offers/offersApi";
import AppLayout from "@/components/AppLayout";
import * as MdIcons from "react-icons/md";

export default function OffersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: "", category: "", search: "" });
  const [selectedOffers, setSelectedOffers] = useState([]);

  const { data, isLoading, error } = useGetAllOffersQuery({ page, limit: 10, ...filters });
  const [deleteOffer] = useDeleteOfferMutation();
  const [bulkActions] = useBulkActionsMutation();

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      try {
        await deleteOffer(id).unwrap();
        alert("Offer deleted successfully");
      } catch (err) {
        alert(err?.data?.message || "Failed to delete offer");
      }
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedOffers.length === 0) return alert("Please select offers first");
    try {
      await bulkActions({ action, offerIds: selectedOffers }).unwrap();
      alert(`Bulk ${action} completed successfully`);
      setSelectedOffers([]);
    } catch (err) {
      alert(err?.data?.message || "Bulk action failed");
    }
  };

  const getStatusColor = (status) => {
    const colors = { ACTIVE: "#22c55e", DRAFT: "#6b7280", EXPIRED: "#ef4444", PAUSED: "#eab308" };
    return colors[status] || "#6b7280";
  };

  return (
    <AppLayout>
      <div className="flipkart-home">
        <div className="flipkart-header">
          <div className="header-content">
            <h1>Offers Management</h1>
            <p>Manage all promotional offers and deals</p>
          </div>
        </div>

        <div className="section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="section-title">All Offers</h2>
            <button onClick={() => router.push("/offers/create")} className="btn btn-primary btn-sm">
              <MdIcons.MdAdd /> Create Offer
            </button>
          </div>

          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder="Search offers..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                style={{ padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '4px', fontSize: '0.9rem' }}
              />
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} style={{ padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="DRAFT">Draft</option>
                <option value="EXPIRED">Expired</option>
                <option value="PAUSED">Paused</option>
              </select>
              <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} style={{ padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                <option value="">All Categories</option>
                <option value="SERVICE">Service</option>
                <option value="PRODUCT">Product</option>
                <option value="BUNDLE">Bundle</option>
              </select>
            </div>
          </div>

          {selectedOffers.length > 0 && (
            <div style={{ background: '#e8f4fd', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', color: '#2874f0' }}>{selectedOffers.length} selected</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleBulkAction("ACTIVATE")} className="btn btn-success btn-sm">Activate</button>
                <button onClick={() => handleBulkAction("PAUSE")} className="btn btn-secondary btn-sm">Pause</button>
                <button onClick={() => handleBulkAction("DEACTIVATE")} className="btn btn-danger btn-sm">Deactivate</button>
              </div>
            </div>
          )}

          {isLoading ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #2874f0', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
          ) : error ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Error loading offers</div>
          ) : (
            <div className="recent-tickets-card" style={{ maxHeight: 'none' }}>
              {data?.offers?.map((offer) => (
                <div key={offer._id} className="ticket-item" style={{ display: 'block', padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                    <input type="checkbox" checked={selectedOffers.includes(offer._id)} onChange={() => setSelectedOffers(prev => prev.includes(offer._id) ? prev.filter(x => x !== offer._id) : [...prev, offer._id])} style={{ marginTop: '0.25rem' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <h4 className="ticket-title" style={{ marginBottom: '0.5rem' }}>{offer.title}</h4>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span className="ticket-status" style={{ backgroundColor: getStatusColor(offer.status), fontSize: '0.7rem' }}>{offer.status}</span>
                            <span style={{ background: '#e8f4fd', color: '#2874f0', padding: '0.2rem 0.4rem', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '500' }}>{offer.category}</span>
                            {offer.isPublished && <span style={{ background: '#d4edda', color: '#155724', padding: '0.2rem 0.4rem', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '500' }}>Published</span>}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2874f0' }}>₹{offer.price.discounted}</div>
                          <div style={{ fontSize: '0.85rem', color: '#878787', textDecoration: 'line-through' }}>₹{offer.price.original}</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: '#878787' }}>
                        <div><MdIcons.MdVisibility style={{ verticalAlign: 'middle', marginRight: '4px' }} />{offer.analytics.views} views</div>
                        <div><MdIcons.MdRedeem style={{ verticalAlign: 'middle', marginRight: '4px' }} />{offer.analytics.redemptions} redeemed</div>
                        <div><MdIcons.MdCheckCircle style={{ verticalAlign: 'middle', marginRight: '4px' }} />{offer.currentRedemptions}/{offer.maxRedemptions}</div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#878787' }}>Valid: {new Date(offer.validFrom).toLocaleDateString()} - {new Date(offer.validTill).toLocaleDateString()}</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => router.push(`/offers/${offer._id}`)} className="btn btn-primary btn-sm">View</button>
                          <button onClick={() => router.push(`/offers/create?edit=${offer._id}`)} className="btn btn-secondary btn-sm">Edit</button>
                          <button onClick={() => handleDelete(offer._id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data?.pagination && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn btn-secondary btn-sm">Previous</button>
              <span style={{ padding: '0.5rem 1rem', background: '#2874f0', color: 'white', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600' }}>Page {data.pagination.current} of {data.pagination.total}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= data.pagination.total} className="btn btn-secondary btn-sm">Next</button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
