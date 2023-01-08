import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useEditProjectMutation } from "../../features/projects/projectApi";
import { useGetSingleTeamQuery } from "../../features/teams/teamsApi";
import { selectUser } from "../../features/users/userSelectors";
import DeleteProjectModal from "./DeleteProjectModal";
import { ItemTypes } from "./ItemTypes";
import { BACKLOG } from "./states";
const ProjectItem = ({ project }) => {
  const { user } = useSelector(selectUser);
  const { filter } = useSelector((state) => state.filterProject);
  const { teamId, title, date, id, state } = project || {};
  const { data: projectTeam, isLoading } = useGetSingleTeamQuery(teamId);
  const { color, teamName } = projectTeam || {};
  const [
    editProject,
    { isLoading: editProjectLoading, isSuccess, data: updatedProject },
  ] = useEditProjectMutation();
  const [deleteModal, setDeleteModal] = useState(false);

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.PROJECT_ITEM,
      item: {},
      end(item, monitor) {
        const { title } = monitor.getDropResult();
        if (title !== project?.state) {
          editProject({
            id,
            data: {
              ...project,
              state: title,
            },
            userEmail: user?.email,
          });
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.9 : 1,
      }),
    }),
    []
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        title + `, successfully switched to ${updatedProject?.state} state.`
      );
    }
  }, [isSuccess, editProjectLoading]);

  const handleDeleteModal = (open) => {
    setDeleteModal(open);
  };
  console.log(filter);

  return (
    <>
      <div
        ref={drag}
        style={
          filter &&
          filter.length > 0 &&
          title?.toLowerCase()?.includes(filter?.toLowerCase())
            ? { border: "2px solid red" }
            : {}
        }
        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
      >
        {state === BACKLOG && (
          <button
            onClick={() => handleDeleteModal(true)}
            className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span
            className={`flex items-center h-6 px-3 text-xs font-semibold text-${color}-500 bg-${color}-100 rounded-full`}
          >
            {isLoading ? <BeatLoader loading={isLoading} /> : teamName}
          </span>
          <div>
            {editProjectLoading && <BeatLoader loading={editProjectLoading} />}
          </div>
        </div>
        <h4 className="mt-3 text-sm font-medium">{title}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {new Date(date).toDateString()}
            </span>
          </div>

          <img
            className="w-6 h-6 ml-auto rounded-full"
            src={
              user?.avatar
                ? user?.avatar
                : "https://randomuser.me/api/portraits/women/26.jpg"
            }
            alt="https://randomuser.me/api/portraits/women/26.jpg"
          />
        </div>
      </div>
      {deleteModal && (
        <DeleteProjectModal
          open={deleteModal}
          control={handleDeleteModal}
          project={project}
        />
      )}
    </>
  );
};

export default ProjectItem;
