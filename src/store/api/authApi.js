import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const { useLoginMutation, useProfileQuery } = authApi;
