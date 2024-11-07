import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserData } from "../../data";
import { IProduct } from "../../interface";
const API_URL = import.meta.env.VITE_API_URL;

const user = getUserData()

const favouritesSlice = createApi({
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3030/favourites",
        baseUrl: `${API_URL}/favorites`,
        headers: {
            Authorization: `Bearer ${user?.token}`,
        }
    }),
    tagTypes: ["Favourite"],
    reducerPath: "Favourite",
    endpoints: (builder) => ({
        getFavourite: builder.query<{ success?: boolean, favourites: IProduct[] } | null, { userId: number }>({
            query: ({ userId }) => `/${userId}`,
            providesTags: ["Favourite"],
        }),
        addToFavourite: builder.mutation<IProduct, { userId: number; productId: number }>({
            query: (payload) => ({
                url: `/add`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Favourite"],
        }),
        deleteFromFavourite: builder.mutation<IProduct, { userId: number; productId: number }>({
            query: (payload) => ({
                url: `/remove`,
                method: "DELETE",
                body: payload
            }),
            invalidatesTags: ["Favourite"],
        }),
    }),
});

export const {
    useGetFavouriteQuery,
    useAddToFavouriteMutation,
    useDeleteFromFavouriteMutation,
} = favouritesSlice;

export default favouritesSlice;
