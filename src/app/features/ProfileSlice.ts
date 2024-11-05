import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfileForm, IUser } from "../../interface";
import { getUserData } from "../../data";

const API_URL = import.meta.env.VITE_API_URL;
const user = getUserData()

const profileSlice = createApi({
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3030/profile",
        baseUrl: `${API_URL}/profile`,
        headers: {
            Authorization: `Bearer ${user?.token}`,
        }
    }),
    tagTypes: ["Profile"],
    reducerPath: "Profile",
    endpoints: (builder) => ({
        getProfile: builder.query<IUser, void>({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation<void, IProfileForm>({
            query: (payload) => ({
                url: `/update`,
                method: "PUT",
                body: payload
            }),
            invalidatesTags: ["Profile"],
        })
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    // other endpoints...
} = profileSlice;

export default profileSlice;
