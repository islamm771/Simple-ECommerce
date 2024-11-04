import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddProduct, IProduct } from "../../interface";
import { getUserData } from "../../data";
const API_URL = import.meta.env.VITE_API_URL;

const user = getUserData()

const productsSlice = createApi({
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3030/products",
        baseUrl: `${API_URL}/products`,
        headers: {
            Authorization: `Bearer ${user?.token}`,
        }
    }),
    tagTypes: ["Products"],
    reducerPath: "Products",
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ["Products"],
        }),
        getProductById: builder.query<IProduct, { id: string }>({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "GET",
            }),
        }),
        addProduct: builder.mutation<IProduct, IAddProduct>({
            query: (payload) => ({
                url: ``,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation<IProduct, { id: number, product: IAddProduct }>({
            query: ({ id, product }) => ({
                url: `/${id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ["Products"],
        }),
        getProductsByCategory: builder.query<IProduct[], { category: string }>({
            query: ({ category }) => ({
                url: `/category/${category}`,
                method: "GET",
            }),
        }),
        getRelatedProducts: builder.query<IProduct[], { id: string }>({
            query: ({ id }) => ({
                url: `/${id}/related`,
                method: "GET",
            }),
        })
        // deleteFromProducts: builder.mutation<IProduct, { userId: number; productId: number }>({
        //     query: (payload) => ({
        //         url: `/products`,
        //         method: "DELETE",
        //         body: payload
        //     }),
        //     invalidatesTags: ["Products"],
        // }),
    }),
});

export const {
    useGetAllProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useGetProductByIdQuery,
    // useDeleteFromProductsMutation,
    useGetProductsByCategoryQuery,
    useGetRelatedProductsQuery
} = productsSlice;

export default productsSlice;
