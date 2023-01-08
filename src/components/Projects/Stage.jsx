import { ItemTypes } from "./ItemTypes";
import ProjectItem from "./ProjectItem";
import { useDrop } from "react-dnd";
import { useCallback } from "react";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectsModal";
import { useMemo } from "react";
const Stage = ({ title, createButton = false, projects }) => {
  const [createProjectModal, setCreateProjectModal] = useState(false);

  const handleModalOpen = (open) => {
    setCreateProjectModal(open);
  };

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.PROJECT_ITEM,
      drop: () => ({ title }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const getSpecificProjectLists = useMemo(() => {
    console.log(title, "is calling");
    return projects?.filter((project) => project?.state === title);
  }, [projects]);

  const isActive = canDrop && isOver;
  return (
    <>
      <div
        ref={drop}
        className="flex flex-col flex-shrink-0 w-72"
        style={isActive ? { background: "#b6b6b6" } : {}}
      >
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">{title}</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {getSpecificProjectLists?.length}
          </span>
          {createButton && (
            <button
              onClick={() => handleModalOpen(true)}
              className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
          )}
        </div>
        <div className="flex flex-col pb-2 overflow-auto">
          {getSpecificProjectLists?.map((item, index) => (
            <ProjectItem key={item?.id} project={item} />
          ))}
        </div>
      </div>
      <CreateProjectModal open={createProjectModal} control={handleModalOpen} />
    </>
  );
};

export default Stage;
