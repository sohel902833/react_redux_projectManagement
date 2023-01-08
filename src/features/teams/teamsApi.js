import { apiSlice } from "../api/apiSlice";
import { TEAM__TAG } from "../api/tags";

const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeam: builder.query({
      query: () => ({
        url: `/teams`,
        method: "GET",
      }),
    }),
    getTeam: builder.query({
      query: (email) => ({
        url: `/teams?${email ? `devEmails_like=${email}` : ""}`,
        method: "GET",
      }),
    }),
    getSingleTeam: builder.query({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "GET",
      }),
    }),
    createTeam: builder.mutation({
      query: ({ data }) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const team = await queryFulfilled;
          //update team list cach pessimistically
          dispatch(
            apiSlice.util.updateQueryData("getTeam", arg.email, (draft) => {
              draft.push(team?.data);
            })
          );
          dispatch(
            apiSlice.util.updateQueryData("getAllTeam", undefined, (draft) => {
              draft.push(team?.data);
            })
          );
        } catch (err) {}
      },
    }),
    editTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(
        { id: teamId, email },
        { queryFulfilled, dispatch }
      ) {
        try {
          const team = await queryFulfilled;
          //update team list cach pessimistically
          dispatch(
            apiSlice.util.updateQueryData("getTeam", email, (draft) => {
              return draft.map((dev) =>
                dev?.id === teamId ? team?.data : dev
              );
            })
          );
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetTeamQuery,
  useEditTeamMutation,
  useGetSingleTeamQuery,
  useGetAllTeamQuery,
} = teamsApi;
