import { apiSlice } from "./apiSlice";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: ({ search = "", page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        params.append("page", page);
        params.append("limit", limit);
        return `/admin/customers?${params.toString()}`;
      },
    }),
    verifyCustomer: builder.mutation({
      query: (customerId) => ({
        url: `/admin/customers/${customerId}/verify`,
        method: "PATCH",
      }),
    }),
    deactivateCustomer: builder.mutation({
      query: (customerId) => ({
        url: `/admin/customers/${customerId}/deactivate`,
        method: "PATCH",
      }),
    }),
    activateCustomer: builder.mutation({
      query: (customerId) => ({
        url: `/admin/customers/${customerId}/activate`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useGetCustomersQuery, useVerifyCustomerMutation, useDeactivateCustomerMutation, useActivateCustomerMutation } = customerApi;
