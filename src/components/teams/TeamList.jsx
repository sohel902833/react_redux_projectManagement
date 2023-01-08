import React from "react";
import { useSelector } from "react-redux";
import { useGetTeamQuery } from "../../features/teams/teamsApi";
import { selectUser } from "../../features/users/userSelectors";
import CenterLoader from "../common/CenterLoader";
import Error from "../ui/Error";
import TeamItem from "./TeamItem";

const TeamList = () => {
  const { user } = useSelector(selectUser);
  const {
    data: teamList,
    isLoading,
    isError,
    error,
  } = useGetTeamQuery(user?.email);
  //decide what to render
  let content = null;
  if (isLoading) {
    content = <CenterLoader loading={isLoading} />;
  } else if (!isLoading && isError) {
    content = <Error message={error} />;
  } else if (!isLoading && !isError && teamList?.length === 0) {
    content = <Error message="No Team Found" />;
  } else if (!isLoading && !isError && teamList?.length > 0) {
    content = teamList.map((team) => <TeamItem key={team?.id} team={team} />);
  }

  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        {content}
      </div>
    </>
  );
};

export default TeamList;
