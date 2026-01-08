import { apiSlice } from "./apiSlice";

export const ticketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: () => "/tickets",
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

    getTechnicians: builder.query({
      query: () => "/admin/technicians",
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useAssignTechnicianMutation,
  useGetTechniciansQuery,
} = ticketApi;
