import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserData } from "../../data";
import { IProduct } from "../../interface";
const API_URL = import.meta.env.VITE_API_URL;

const user = getUserData()

const cartSlice = createApi({
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3030/cart",
        baseUrl: `${API_URL}/cart`,
        headers: {
            Authorization: `Bearer ${user?.token}`,
        }
    }),
    tagTypes: ["Cart"],
    reducerPath: "Cart",
    endpoints: (builder) => ({
        getCart: builder.query<{ cart: IProduct[] } | null, { userId: number | undefined }>({
            query: ({ userId }) => `/${userId}`,
            providesTags: ["Cart"],

            // queryFn: async ({ userId }, _queryApi, _extraOptions, fetchWithBQ) => {
            //     if (userId === undefined) {
            //         return { data: null as { cart: IProduct[] } | null };
            //     }

            //     const result = await fetchWithBQ({
            //         url: `/${userId}`,
            //         method: "GET",
            //     });

            //     if (result.error) {
            //         return { error: result.error };
            //     }

            //     return result as QueryReturnValue<{ cart: IProduct[] } | null, FetchBaseQueryError, FetchBaseQueryMeta>;
            // },
        }),
        addToCart: builder.mutation<IProduct, { userId: number; products: { productId: number; quantity: number }[] }>({
            query: (payload) => ({
                url: `/add`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Cart"],
        }),
        deleteFromCart: builder.mutation<IProduct, { userId: number; productId: number }>({
            query: (payload) => ({
                url: `/remove`,
                method: "DELETE",
                body: payload
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useDeleteFromCartMutation,
} = cartSlice;

export default cartSlice;
