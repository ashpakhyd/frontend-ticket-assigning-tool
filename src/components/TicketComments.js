"use client";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
} from "@/store/api/commentApi";
import { useState } from "react";

export default function TicketComments({ ticketId }) {
  const { data: comments, isLoading } = useGetCommentsQuery(ticketId);
  const [addComment, { isLoading: sending }] = useAddCommentMutation();
  const [message, setMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  const submit = async () => {
    if (!message) return;
    await addComment({ ticketId, message, isInternal }).unwrap();
    setMessage("");
  };

  if (isLoading) return <p>Loading comments…</p>;

  return (
    <>
    <div className="section comments">
      <h3>Comments</h3>

      <div className="comment-list">
        {comments?.map((c) => (
          <div key={c._id} className="comment">
            <div className="comment-head">
              <b>{c.user?.name}</b>
              <span>{c.role}</span>
              {c.isInternal && <span className="lock">🔒</span>}
            </div>
            <p>{c.message}</p>
          </div>
        ))}
      </div>

      <textarea
        className="glass-textarea"
        placeholder="Write a comment…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <label className="checkbox">
        <input
          type="checkbox"
          checked={isInternal}
          onChange={(e) => setIsInternal(e.target.checked)}
        />
        Internal note (Admin ↔ Technician)
      </label>

     
    </div>
     <div>
     <button
       className="btn btn-primary"
       onClick={submit}
       disabled={sending}
     >
       {sending ? "Sending…" : "Add Comment"}
     </button>
     </div></>
  );
}
