import { apiSlice } from "../apiSlice";

export const offersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all offers
    getAllOffers: builder.query({
      query: (params) => ({
        url: "/admin/offers",
        params,
      }),
      providesTags: ["Offers"],
    }),

    // Get single offer
    getOffer: builder.query({
      query: (id) => `/admin/offers/${id}`,
      providesTags: (result, error, id) => [{ type: "Offers", id }],
    }),

    // Get offer details with analytics
    getOfferDetails: builder.query({
      query: (id) => `/admin/offers/${id}/details?include=all`,
      providesTags: (result, error, id) => [{ type: "Offers", id }],
    }),

    // Create offer
    createOffer: builder.mutation({
      query: (data) => ({
        url: "/admin/offers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Offers"],
    }),

    // Update offer
    updateOffer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/offers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Offers", id }, "Offers"],
    }),

    // Update offer status
    updateOfferStatus: builder.mutation({
      query: ({ id, status, isPublished }) => ({
        url: `/admin/offers/${id}/status`,
        method: "PATCH",
        body: { status, isPublished },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Offers", id }, "Offers"],
    }),

    // Delete offer
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `/admin/offers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Offers"],
    }),

    // Bulk actions
    bulkActions: builder.mutation({
      query: (data) => ({
        url: "/admin/offers/bulk-actions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Offers"],
    }),

    // Get all redemptions
    getAllRedemptions: builder.query({
      query: (params) => ({
        url: "/admin/offers/redemptions/all",
        params,
      }),
      providesTags: ["Redemptions"],
    }),

    // Verify redemption
    verifyRedemption: builder.mutation({
      query: (data) => ({
        url: "/admin/offers/redemptions/verify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Redemptions", "Offers"],
    }),
  }),
});

export const {
  useGetAllOffersQuery,
  useGetOfferQuery,
  useGetOfferDetailsQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useUpdateOfferStatusMutation,
  useDeleteOfferMutation,
  useBulkActionsMutation,
  useGetAllRedemptionsQuery,
  useVerifyRedemptionMutation,
} = offersApi;
