"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetCustomersQuery } from "@/store/api/customerApi";
import { useState } from "react";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import "./customers.css";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetCustomersQuery({ search, page, limit });

  const customers = data?.customers || [];
  const pagination = data?.pagination || {};

  return (
    <ProtectedRoute>
      <main className="glass-app">
        <header className="glass-header">
          <h1>Customers</h1>
        </header>

        <section className="filters-section">
          <input
            type="text"
            placeholder="Search by name, phone, email or ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="search-input"
          />
        </section>

        <section className="customers-grid">
          {isLoading && <p className="loading">Loading customers...</p>}

          {customers.map((customer) => (
            <Link key={customer._id} href={`/customers/${customer._id}`} className="customer-card">
              <div className="customer-avatar">
                <MdPerson />
              </div>
              
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p className="customer-phone">{customer.phone}</p>
                <p className="customer-email">{customer.email}</p>
              </div>

              <div className="customer-badges">
                <div className={`badge ${customer.isActive ? 'active' : 'inactive'}`}>
                  {customer.isActive ? 'Active' : 'Inactive'}
                </div>
                <div className={`badge ${customer.isVerified ? 'verified' : 'unverified'}`}>
                  {customer.isVerified ? 'Verified' : 'Unverified'}
                </div>
              </div>
            </Link>
          ))}
        </section>

        {pagination.total > 1 && (
          <section className="pagination">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {pagination.current} of {pagination.total} ({pagination.totalRecords} total)
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.total}
              className="pagination-btn"
            >
              Next
            </button>
          </section>
        )}
      </main>
    </ProtectedRoute>
  );
}
