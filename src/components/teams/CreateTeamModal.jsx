import React from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { useCreateTeamMutation } from "../../features/teams/teamsApi";
import Error from "../ui/Error";
import { toast } from "react-toastify";
import { selectUser } from "../../features/users/userSelectors";
export default function CreateTeamModal({ open, control }) {
  const [
    createTeam,
    {
      isLoading: createTeamLoading,
      isError: createTeamError,
      error: errorMessage,
      isSuccess,
    },
  ] = useCreateTeamMutation();
  const [teamName, setTeamName] = React.useState("");
  const [color, setColor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { user } = useSelector(selectUser) || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      authorId: user?.id,
      teamName,
      description,
      color: color.toLowerCase(),
      developers: [user],
      createdAt: new Date().getTime(),
      devEmails: "" + user?.email,
    };
    createTeam({
      data,
      email: user?.email,
    });
  };

  React.useEffect(() => {
    if (isSuccess) {
      setTeamName("");
      setColor("");
      setDescription("");
      control(false);
      toast.success("New Team Create Successful..");
    }
  }, [createTeamLoading, createTeamError, isSuccess]);

  return (
    open && (
      <>
        <div
          onClick={() => control(false)}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New Team
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  Name of the team.
                </label>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Team Name"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                />
              </div>
              <div>
                <label htmlFor="to" className="sr-only">
                  Color
                </label>
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Enter team theme color."
                />
              </div>
            </div>

            <div>
              <button
                disabled={createTeamLoading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                {createTeamLoading ? (
                  <BeatLoader loading={createTeamLoading} />
                ) : (
                  "Create Team"
                )}
              </button>
            </div>
            {createTeamError && <Error message={errorMessage} />}
          </form>
        </div>
      </>
    )
  );
}
