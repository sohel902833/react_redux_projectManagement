import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //end points
    getProjects: builder.query({
      query: (email) => ({
        url: `/projects?${
          email
            ? `devEmails_like=${email}&_sort=timestamp&_order=desc`
            : "_sort=timestamp&_order=desc"
        }`,
        method: "GET",
      }),
    }),
    getProjectByTeamId: builder.query({
      query: (teamId) => ({
        url: `/projects?teamId=${teamId}`,
        method: "GET",
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ authorEmail }, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          //update project list cach pessimistically
          dispatch(
            apiSlice.util.updateQueryData(
              "getProjects",
              authorEmail,
              (draft) => {
                draft.unshift(res?.data);
              }
            )
          );
        } catch (err) {}
      },
    }),
    editProject: builder.mutation({
      query: ({ id, data, userEmail }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(
        { id: projectId, userEmail, data },
        { queryFulfilled, dispatch }
      ) {
        //optimistic cache update
        const pathResult1 = dispatch(
          apiSlice.util.updateQueryData("getProjects", userEmail, (draft) => {
            return draft.map((pr) => (pr?.id === projectId ? data : pr));
          })
        );

        try {
          const res = await queryFulfilled;
          //update team list cach pessimistically
          // dispatch(
          //   apiSlice.util.updateQueryData("getProjects", userEmail, (draft) => {
          //     return draft.map((pr) => (pr?.id === projectId ? res?.data : pr));
          //   })
          // );
        } catch (err) {
          pathResult1.undo();
        }
      },
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, userEmail }, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          console.log(res);
          //update team list cach pessimistically
          dispatch(
            apiSlice.util.updateQueryData("getProjects", userEmail, (draft) => {
              return draft.filter((pr) => pr?.id !== id);
            })
          );
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetProjectByTeamIdQuery,
} = projectApi;
