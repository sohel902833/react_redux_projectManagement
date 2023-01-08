import React from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { useCreateTeamMutation } from "../../features/teams/teamsApi";
import Error from "../ui/Error";
import { toast } from "react-toastify";
import TeamMemberItem from "./TeamMemberItem";
import { useGetAllUserQuery } from "../../features/users/usersApi";
import { selectUser } from "../../features/users/userSelectors";
export default function MemberListModal({ open, control, team }) {
  const { data: userList } = useGetAllUserQuery();
  const { user } = useSelector(selectUser) || {};
  const { teamName, description, developers } = team;
  const filterByAlreadyAddedMember = (member) => {
    const dev = developers?.find((d) => d?.id === member?.id);
    return dev ? false : true;
  };

  return (
    open && (
      <>
        <div
          onClick={() => control(false)}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div
          style={{ height: "80vh", overflowY: "auto" }}
          className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <h2 className="font-extrabold text-gray-900">
            Members of{" "}
            <span className="text-pink-900 font-extrabold">{teamName}</span>{" "}
            Team
          </h2>

          <hr />
          <div className="member__list__container">
            {developers?.map((member) => (
              <TeamMemberItem
                key={member?.id}
                member={member}
                addButton={false}
                team={team}
              />
            ))}
          </div>

          <h2 className="font-extrabold text-gray-900">User List : </h2>
          <div className="member__list__container">
            {userList?.filter(filterByAlreadyAddedMember)?.map((member) => (
              <TeamMemberItem key={member?.id} member={member} team={team} />
            ))}
          </div>
        </div>
      </>
    )
  );
}
