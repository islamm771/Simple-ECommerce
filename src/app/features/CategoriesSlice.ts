import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../../interface";
import { getUserData } from "../../data";

const API_URL = import.meta.env.VITE_API_URL;
const user = getUserData()

const categoriesSlice = createApi({
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3030/",
        baseUrl: `${API_URL}/categories`,
        headers: {
            Authorization: `Bearer ${user?.token}`,
        }
    }),
    tagTypes: ["Categories"],
    reducerPath: "Categories",
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategory[], void>({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        addCategory: builder.mutation<ICategory, { name: string }>({
            query: (payload) => ({
                url: ``,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Categories"],
        }),
        updateCategory: builder.mutation<ICategory, { id: number, name: string }>({
            query: (payload) => ({
                url: `/${payload.id}`,
                method: "PATCH",
                body: { name: payload.name }
            }),
            invalidatesTags: ["Categories"],
        })
    }),
});

export const {
    useGetAllCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
} = categoriesSlice;

export default categoriesSlice;
