import { apiSlice } from "./apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => "/admin/dashboard/stats",
    }),
    getTicketStatusChart: builder.query({
      query: () => "/admin/dashboard/ticket-status",
    }),
    getTechnicianPerformance: builder.query({
      query: () => "/admin/dashboard/technician-performance",
    }),
    getTechnicianRatings: builder.query({
      query: () => "/admin/dashboard/technician-ratings",
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetTicketStatusChartQuery,
  useGetTechnicianPerformanceQuery,
  useGetTechnicianRatingsQuery,
} = dashboardApi;
