import { apiSlice } from "./apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (ticketId) => `/tickets/${ticketId}/comments`,
      providesTags: (result, error, id) => [{ type: "Comments", id }],
    }),

    addComment: builder.mutation({
      query: ({ ticketId, message, isInternal }) => ({
        url: `/tickets/${ticketId}/comment`,
        method: "POST",
        body: { message, isInternal },
      }),
      invalidatesTags: (r, e, a) => [{ type: "Comments", id: a.ticketId }],
    }),

    uploadAttachment: builder.mutation({
      query: ({ ticketId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/tickets/${ticketId}/attachment`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (r, e, a) => [{ type: "Comments", id: a.ticketId }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUploadAttachmentMutation,
} = commentApi;
