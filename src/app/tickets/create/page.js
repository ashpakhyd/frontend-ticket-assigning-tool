"use client";

import "../tickets.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCreateTicketMutation } from "@/store/api/ticketApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const router = useRouter();

  const submit = async () => {
    await createTicket({ title, description }).unwrap();
    router.push("/tickets");
  };

  return (
    <ProtectedRoute>
      <main className="screen">
        <header className="header">
          <h1>New Ticket</h1>
        </header>

        <section className="form">
          <input
            placeholder="Ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="primary" onClick={submit} disabled={isLoading}>
            {isLoading ? "Creating…" : "Create Ticket"}
          </button>
        </section>
      </main>
    </ProtectedRoute>
  );
}
