"use client";

import { useState } from "react";
import { useGetAllRedemptionsQuery, useVerifyRedemptionMutation } from "@/store/api/offers/offersApi";
import AppLayout from "@/components/AppLayout";
import * as MdIcons from "react-icons/md";

export default function RedemptionsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const { data, isLoading } = useGetAllRedemptionsQuery({
    page,
    limit: 10,
    ...filters,
  });

  const [verifyRedemption, { isLoading: verifying }] = useVerifyRedemptionMutation();

  const handleVerify = async (action = "VERIFY") => {
    if (!verifyCode.trim()) {
      alert("Please enter a redemption code");
      return;
    }

    try {
      const payload = { redemptionCode: verifyCode, action };
      if (action === "MARK_USED") {
        payload.usedBy = localStorage.getItem("userId") || "admin";
        payload.notes = "Marked as used from admin panel";
      }

      const result = await verifyRedemption(payload).unwrap();
      setVerifyResult(result);
      if (action === "MARK_USED") {
        alert("Redemption marked as used successfully!");
        setShowVerifyModal(false);
        setVerifyCode("");
        setVerifyResult(null);
      }
    } catch (err) {
      alert(err?.data?.message || "Verification failed");
      setVerifyResult(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: "bg-green-500",
      USED: "bg-gray-500",
      EXPIRED: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MdIcons.MdQrCodeScanner className="text-4xl" />
              Redemptions Management
            </h1>
            <p className="text-green-100 mt-1">Verify and manage offer redemptions</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 space-y-4">
          {/* Verify Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MdIcons.MdVerified className="text-green-600" />
              Verify Redemption Code
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                placeholder="Enter redemption code (e.g., OFF123456)"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-mono"
              />
              <button
                onClick={() => handleVerify("VERIFY")}
                disabled={verifying}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {verifying ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                ) : (
                  <MdIcons.MdSearch />
                )}
                Verify
              </button>
            </div>

            {/* Verification Result */}
            {verifyResult && (
              <div className={`mt-4 p-6 rounded-xl border-2 ${
                verifyResult.valid ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
              }`}>
                {verifyResult.valid ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <MdIcons.MdCheckCircle className="text-4xl text-green-600" />
                      <div>
                        <h3 className="text-xl font-bold text-green-800">Valid Redemption Code</h3>
                        <p className="text-green-600">{verifyResult.message}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-500">Customer Name</p>
                          <p className="text-lg font-bold text-gray-800">{verifyResult.redemption.customer.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500">Phone</p>
                          <p className="text-lg font-bold text-gray-800">{verifyResult.redemption.customer.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500">Offer</p>
                          <p className="text-lg font-bold text-gray-800">{verifyResult.redemption.offer.title}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500">Discount Price</p>
                          <p className="text-lg font-bold text-green-600">
                            PKR {verifyResult.redemption.offer.price.discounted}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500">Status</p>
                          <span className={`${getStatusColor(verifyResult.redemption.status)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                            {verifyResult.redemption.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-500">Redeemed At</p>
                          <p className="text-gray-800">{new Date(verifyResult.redemption.redeemedAt).toLocaleString()}</p>
                        </div>
                      </div>
                      {verifyResult.redemption.status === "ACTIVE" && (
                        <button
                          onClick={() => handleVerify("MARK_USED")}
                          className="w-full mt-4 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
                        >
                          <MdIcons.MdCheckCircle />
                          Mark as Used
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MdIcons.MdError className="text-4xl text-red-600" />
                    <div>
                      <h3 className="text-xl font-bold text-red-800">Invalid Code</h3>
                      <p className="text-red-600">{verifyResult.message}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Search by code, customer..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="USED">Used</option>
                <option value="EXPIRED">Expired</option>
              </select>
              <button
                onClick={() => setFilters({ status: "", search: "" })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Redemptions List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {data?.redemptions?.map((redemption) => (
                <div
                  key={redemption._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {redemption.redemptionCode}
                        </span>
                        <span className={`${getStatusColor(redemption.status)} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                          {redemption.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">{redemption.customer.name}</h3>
                      <p className="text-sm text-gray-600">{redemption.customer.phone}</p>
                      {redemption.customer.email && (
                        <p className="text-sm text-gray-600">{redemption.customer.email}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Offer</p>
                      <p className="font-bold text-gray-800">{redemption.offer.title}</p>
                      <p className="text-lg font-bold text-green-600">
                        PKR {redemption.offer.price.discounted}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Redeemed At</p>
                      <p className="text-gray-800 font-semibold">
                        {new Date(redemption.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {redemption.usedAt && (
                      <div>
                        <p className="text-gray-500">Used At</p>
                        <p className="text-gray-800 font-semibold">
                          {new Date(redemption.usedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {data?.pagination && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold">
                Page {data.pagination.current} of {data.pagination.total}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= data.pagination.total}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
