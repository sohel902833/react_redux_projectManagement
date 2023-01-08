import React from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { useGetAllTeamQuery } from "../../features/teams/teamsApi";
import Error from "../ui/Error";
import { toast } from "react-toastify";
import { selectUser } from "../../features/users/userSelectors";
import { useCreateProjectMutation } from "../../features/projects/projectApi";
import { useEffect } from "react";
import { BACKLOG } from "./states";
export default function CreateProjectModal({ open, control }) {
  const [date, setDate] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [teamId, setTeamId] = React.useState("");
  const { user } = useSelector(selectUser) || {};
  const { data: teamList, isLoading: getTeamLoading } = useGetAllTeamQuery();
  const [
    createProject,
    {
      data: createdProject,
      isLoading: createProjectLoading,
      error: errorMessage,
      isError: createProjectError,
      isSuccess,
    },
  ] = useCreateProjectMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamId) {
      const data = {
        title,
        teamId,
        authorEmail: user?.email,
        authorId: user?.id,
        authorAvatar: user?.avatar,
        date,
        state: BACKLOG,
        timestamp: new Date().getTime(),
        devEmails: teamList?.filter((t) => t?.id == teamId)[0]?.devEmails,
      };
      createProject(data);
    } else {
      toast.error("Please Select Team For This Project.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("New Project Created.");
      setTitle("");
      setDate("");
      setTeamId("");
      control(false);
    }
  }, [createProjectLoading, createProjectError, isSuccess]);

  return (
    open && (
      <>
        <div
          onClick={() => control(false)}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Project
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="np__title" className="sr-only">
                  title
                </label>
                <input
                  id="np__title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                />
              </div>
              <div>
                <label htmlFor="np__created__date" className="sr-only">
                  Created Date
                </label>
                <input
                  id="np__created__date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Date"
                />
              </div>
              <select
                required
                className="selectContainer"
                onChange={(e) => setTeamId(e.target.value)}
                value={teamId}
              >
                <option>Select Team</option>
                {teamList?.map((team) => (
                  <option value={team?.id}>
                    {team?.teamName}
                    {`,   Total: ${team?.developers?.length} Developers`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                {createProjectLoading ? (
                  <BeatLoader loading={createProjectLoading} />
                ) : (
                  "Create New Project"
                )}
              </button>
            </div>
            {createProjectError && <Error message={errorMessage} />}
          </form>
        </div>
      </>
    )
  );
}
