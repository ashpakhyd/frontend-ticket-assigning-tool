"use client";
import { useUploadAttachmentMutation } from "@/store/api/commentApi";
import { useState } from "react";

export default function TicketAttachment({ ticketId }) {
  const [file, setFile] = useState(null);
  const [upload, { isLoading }] = useUploadAttachmentMutation();

  const submit = async () => {
    if (!file) return;
    await upload({ ticketId, file }).unwrap();
    setFile(null);
  };

  return (
    <div className="section">
      <h3>Attachments</h3>

      <div className="attach-row">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="btn btn-secondary"
          onClick={submit}
          disabled={isLoading}
        >
          {isLoading ? "Uploading…" : "Upload"}
        </button>
      </div>
    </div>
  );
}
