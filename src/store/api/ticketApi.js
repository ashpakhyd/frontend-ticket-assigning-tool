import { apiSlice } from "./apiSlice";

export const ticketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.status) queryParams.append('status', params.status);
        if (params.limit) queryParams.append('limit', params.limit);
        return `/tickets?${queryParams.toString()}`;
      },
      providesTags: ["Tickets"],
    }),

    getRecentTickets: builder.query({
      query: () => "/tickets?status=New&limit=5",
      providesTags: ["Tickets"],
    }),

    getTicketById: builder.query({
      query: (id) => `/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: "Tickets", id }],
    }),

    createTicket: builder.mutation({
      query: (data) => ({
        url: "/tickets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),

    assignTechnician: builder.mutation({
      query: ({ ticketId, technicianId }) => ({
        url: `/tickets/${ticketId}/assign`,
        method: "PATCH",
        body: { technicianId },
      }),
      invalidatesTags: (result, error, { ticketId }) => [
        { type: "Tickets", id: ticketId },
        "Tickets",
      ],
    }),

    updateTicketStatus: builder.mutation({
      query: ({ ticketId, status }) => ({
        url: `/tickets/${ticketId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { ticketId }) => [
        { type: "Tickets", id: ticketId },
        "Tickets",
      ],
    }),

    deleteTicket: builder.mutation({
      query: (ticketId) => ({
        url: `/tickets/${ticketId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),

    getTechnicians: builder.query({
      query: () => "/admin/technicians",
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useGetRecentTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useAssignTechnicianMutation,
  useUpdateTicketStatusMutation,
  useDeleteTicketMutation,
  useGetTechniciansQuery,
} = ticketApi;
