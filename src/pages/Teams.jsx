import React from "react";
import { useState } from "react";
import CreateTeamModal from "../components/teams/CreateTeamModal";
import TeamList from "../components/teams/TeamList";
const Teams = () => {
  const [createTeamModal, setCreateTeamModal] = useState(false);
  const handleCreateTeamModal = (open) => {
    setCreateTeamModal(open);
  };
  return (
    <div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <div class="px-10 mt-6 flex justify-between">
        <h1 class="text-2xl font-bold">Teams</h1>
        <button
          onClick={() => handleCreateTeamModal(true)}
          class="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
        >
          <svg
            class="w-5 h-5"
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
      </div>

      <TeamList />
      <CreateTeamModal open={createTeamModal} control={handleCreateTeamModal} />
    </div>
  );
};

export default Teams;
