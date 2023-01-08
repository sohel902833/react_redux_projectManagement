import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //end points
    getAllUser: builder.query({
      query: () => `/users`,
    }),
  }),
});

export const { useGetAllUserQuery } = usersApi;
