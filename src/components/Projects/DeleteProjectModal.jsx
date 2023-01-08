import React from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { useCreateTeamMutation } from "../../features/teams/teamsApi";
import Error from "../ui/Error";
import { toast } from "react-toastify";
import { selectUser } from "../../features/users/userSelectors";
import { useDeleteProjectMutation } from "../../features/projects/projectApi";
import { useEffect } from "react";
export default function DeleteProjectModal({ open, control, project }) {
  const { title: projectName, id: projectId, authorId } = project || {};
  const { user } = useSelector(selectUser);
  const [deleteProject, { isLoading, isSuccess }] = useDeleteProjectMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${projectName} Deleted Successful.`);
      control(false);
    }
  }, [isLoading, isSuccess]);

  const handleDelete = () => {
    if (user?.id === authorId) {
      deleteProject({
        id: projectId,
        userEmail: user?.email,
      });
    } else {
      toast.error(`You are not authorized person to delete this project.`);
      control(false);
    }
  };

  return (
    open && (
      <>
        <div
          onClick={() => control(false)}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
            Are You Sure? You Want To Delete{" "}
            <span className="text-red-600">{projectName}</span>
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => control(false)}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              {isLoading ? <BeatLoader loading={isLoading} /> : "Yes"}
            </button>
          </div>
        </div>
      </>
    )
  );
}
