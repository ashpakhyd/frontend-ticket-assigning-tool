"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useGetOfferDetailsQuery, useUpdateOfferStatusMutation } from "@/store/api/offers/offersApi";
import AppLayout from "@/components/AppLayout";
import * as MdIcons from "react-icons/md";

export default function OfferDetailsPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isLoading, error } = useGetOfferDetailsQuery(id);
  const [updateStatus] = useUpdateOfferStatusMutation();

  const handleStatusChange = async (status, isPublished) => {
    try {
      await updateStatus({ id, status, isPublished }).unwrap();
      alert("Status updated successfully");
    } catch (err) {
      alert(err?.data?.message || "Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
        </div>
      </AppLayout>
    );
  }

  if (error || !data?.offer) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <MdIcons.MdError className="text-6xl text-red-500 mx-auto mb-4" />
            <p className="text-xl text-gray-700">Failed to load offer details</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const { offer, analytics, recentActivity, redemptions } = data;

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: "bg-green-500",
      DRAFT: "bg-gray-500",
      EXPIRED: "bg-red-500",
      PAUSED: "bg-yellow-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <AppLayout>
      <div className="flipkart-home">
        <div className="flipkart-header">
          <div className="header-content">
            <button onClick={() => router.back()} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MdIcons.MdArrowBack /> Back
            </button>
            <h1>{offer.title}</h1>
            <p style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <span style={{ background: getStatusColor(offer.status), color: 'white', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>{offer.status}</span>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>{offer.category}</span>
              {offer.isPublished && <span style={{ background: '#22c55e', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>Published</span>}
            </p>
          </div>
        </div>

        <div className="section">
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => handleStatusChange("ACTIVE", true)} className="btn btn-success btn-sm"><MdIcons.MdCheckCircle /> Activate</button>
            <button onClick={() => handleStatusChange("PAUSED", offer.isPublished)} className="btn btn-secondary btn-sm"><MdIcons.MdPause /> Pause</button>
            <button onClick={() => handleStatusChange("DRAFT", false)} className="btn btn-secondary btn-sm"><MdIcons.MdDrafts /> Draft</button>
            <button onClick={() => router.push(`/offers/create?edit=${id}`)} className="btn btn-primary btn-sm"><MdIcons.MdEdit /> Edit</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #2874f0 0%, #1e5bc6 100%)', color: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>{analytics?.views || 0}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Views</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>{analytics?.redemptions || 0}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Redemptions</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #ff9f00 0%, #ff6b00 100%)', color: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>{analytics?.shares || 0}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Shares</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)', color: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>{analytics?.conversionRate || "0%"}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Conversion</div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '0.5rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: '0.5rem' }}>
            {["overview", "redemptions", "activity"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className="btn btn-sm" style={{ flex: 1, background: activeTab === tab ? '#2874f0' : '#f1f3f6', color: activeTab === tab ? 'white' : '#212121' }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 className="section-title">Offer Details</h2>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Description</p>
                <p style={{ color: '#212121' }}>{offer.description}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div><p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Valid From</p><p style={{ color: '#212121' }}>{new Date(offer.validFrom).toLocaleString()}</p></div>
                <div><p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Valid Till</p><p style={{ color: '#212121' }}>{new Date(offer.validTill).toLocaleString()}</p></div>
                <div><p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Max Redemptions</p><p style={{ color: '#212121' }}>{offer.maxRedemptions}</p></div>
                <div><p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Current</p><p style={{ color: '#212121' }}>{offer.currentRedemptions}</p></div>
                <div><p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Remaining</p><p style={{ color: '#212121' }}>{analytics?.remainingRedemptions || 0}</p></div>
                <div><p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Priority</p><p style={{ color: '#212121' }}>{offer.priority}</p></div>
              </div>
              {offer.targetAudience && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Target Audience</p>
                  <p style={{ color: '#212121' }}>Customer Type: {offer.targetAudience.customerType}</p>
                  {offer.targetAudience.locations?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {offer.targetAudience.locations.map((loc, i) => (
                        <span key={i} style={{ background: '#e8f4fd', color: '#2874f0', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>{loc}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {offer.tags?.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Tags</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {offer.tags.map((tag, i) => (
                      <span key={i} style={{ background: '#f3e5f5', color: '#9c27b0', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
              {offer.termsConditions && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#878787', marginBottom: '0.25rem' }}>Terms & Conditions</p>
                  <p style={{ color: '#212121' }}>{offer.termsConditions}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "redemptions" && (
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 className="section-title">Redemptions ({redemptions?.pagination?.totalRecords || 0})</h2>
              <div className="recent-tickets-card" style={{ maxHeight: 'none' }}>
                {redemptions?.redemptions?.map((r) => (
                  <div key={r._id} className="ticket-item">
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '700', color: '#2874f0' }}>{r.redemptionCode}</span>
                        <span style={{ background: r.status === "ACTIVE" ? '#d4edda' : '#f8f9fa', color: r.status === "ACTIVE" ? '#155724' : '#6c757d', padding: '0.2rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem' }}>{r.status}</span>
                      </div>
                      <p style={{ fontWeight: '600', color: '#212121' }}>{r.customer.name}</p>
                      <p style={{ fontSize: '0.85rem', color: '#878787' }}>{r.customer.phone}</p>
                      <p style={{ fontSize: '0.75rem', color: '#878787' }}>Redeemed: {new Date(r.createdAt).toLocaleString()}</p>
                      {r.usedAt && <p style={{ fontSize: '0.75rem', color: '#22c55e' }}>Used: {new Date(r.usedAt).toLocaleString()}</p>}
                    </div>
                  </div>
                ))}
                {(!redemptions?.redemptions || redemptions.redemptions.length === 0) && (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#878787' }}>No redemptions yet</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 className="section-title">Recent Activity</h2>
              <div>
                {recentActivity?.map((a) => (
                  <div key={a._id} style={{ borderLeft: '3px solid #2874f0', paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '600', color: '#212121' }}>{a.customer.name}</span>
                      <span style={{ fontSize: '0.85rem', color: '#878787' }}>({a.customer.phone})</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#212121' }}>Action: <span style={{ fontWeight: '600', color: '#2874f0' }}>{a.action}</span></p>
                    {a.redemptionCode && <p style={{ fontSize: '0.85rem', color: '#212121' }}>Code: {a.redemptionCode}</p>}
                    <p style={{ fontSize: '0.75rem', color: '#878787' }}>{new Date(a.createdAt).toLocaleString()}</p>
                  </div>
                ))}
                {(!recentActivity || recentActivity.length === 0) && (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#878787' }}>No recent activity</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
