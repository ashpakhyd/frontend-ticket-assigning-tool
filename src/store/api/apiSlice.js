import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-ticket-assigning-tool.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  // ✅ YAHI ADD KARNA THA
  tagTypes: ["Tickets"],

  endpoints: () => ({}),
});
