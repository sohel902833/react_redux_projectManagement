import Stage from "../components/Projects/Stage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { stages } from "../components/Projects/states";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSelectors";
import { CircleLoader } from "react-spinners";

const Projects = () => {
  const { user } = useSelector(selectUser);
  const { data: projectList, isLoading } = useGetProjectsQuery(user?.email);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Project Board</h1>
        </div>
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          {isLoading && <CircleLoader loading={isLoading} />}
          {!isLoading &&
            stages.map((stage) => (
              <Stage
                key={stage?.id}
                title={stage?.title}
                createButton={stage?.createButton}
                projects={projectList}
              />
            ))}
          <div className="flex-shrink-0 w-6"></div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Projects;
