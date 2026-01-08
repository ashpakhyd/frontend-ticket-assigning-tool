"use client";

import "../tickets.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCreateTicketMutation } from "@/store/api/ticketApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ApplianceSelection from '@/components/ApplianceSelection';
import IssueTypeSelection from '@/components/IssueTypeSelection';
import MinimalTicketForm from '@/components/MinimalTicketForm';

export default function CreateTicket() {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const router = useRouter();

  const submit = async (formData) => {
    try {
      console.log("Submitting ticket with data:", formData); // Log the payload for debugging
      await createTicket(formData).unwrap();
      router.push("/tickets");
    } catch (error) {
      console.error("Error creating ticket:", error); // Log the full error object
      if (error?.status === "PARSING_ERROR") {
        console.error("Server returned non-JSON response:", error.data); // Log raw server response
      }
      alert(`Failed to create ticket: ${error?.data?.message || error?.message || "Unknown error"}`);
    }
  };

  return (
    <ProtectedRoute>
      <main className="screen">
        <header className="header">
          <h1>Create New Ticket</h1>
        </header>

        <section className="form">
          {!selectedAppliance && (
            <ApplianceSelection onSelect={(appliance) => setSelectedAppliance(appliance)} />
          )}
          {selectedAppliance && !selectedIssue && (
            <IssueTypeSelection
              appliance={selectedAppliance}
              onSelect={(issue) => setSelectedIssue(issue)}
              onBack={() => setSelectedAppliance(null)}
            />
          )}
          {selectedAppliance && selectedIssue && (
            <MinimalTicketForm
              appliance={selectedAppliance}
              issue={selectedIssue}
              onBack={() => setSelectedIssue(null)}
              onSubmit={submit}
            />
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}
