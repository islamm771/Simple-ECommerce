import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../interface";
import { getUserData } from "../../data";
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
    endpoints: (builder) => ({
        getCart: builder.query<{ cart: IProduct[] }, { userId: number }>({
            query: (arg) => ({
                url: `/${arg.userId}`,
                method: "GET",
            }),
            providesTags: ["Cart"],
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
