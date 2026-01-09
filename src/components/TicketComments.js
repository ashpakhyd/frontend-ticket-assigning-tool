"use client";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
} from "@/store/api/commentApi";
import { useForm } from "react-hook-form";

export default function TicketComments({ ticketId }) {
  const { data: comments, isLoading } = useGetCommentsQuery(ticketId);
  const [addComment, { isLoading: sending }] = useAddCommentMutation();
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      message: "",
      isInternal: false
    }
  });

  const isInternal = watch("isInternal");

  const onSubmit = async (data) => {
    if (!data.message) return;
    await addComment({ ticketId, ...data }).unwrap();
    reset();
  };

  if (isLoading) return <p>Loading comments…</p>;

  return (
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="glass-textarea"
          placeholder="Write a comment…"
          {...register("message", { required: true })}
        />

        <div className="comment-form-actions">
          <label className="checkbox">
            <input
              type="checkbox"
              {...register("isInternal")}
            />
            Internal note (Admin ↔ Technician)
          </label>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={sending}
          >
            {sending ? "Sending…" : "Add Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}
