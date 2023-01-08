import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { projectApi } from "../../features/projects/projectApi";
import { useEditTeamMutation } from "../../features/teams/teamsApi";
import { selectUser } from "../../features/users/userSelectors";
const TeamMemberItem = ({ member, addButton = true, team }) => {
  const [editTeam, { isLoading, isSuccess, isError, data: updatedTeam }] =
    useEditTeamMutation();
  const { user: loggedInUser } = useSelector(selectUser);
  const { name, email } = member || {};
  const dispatch = useDispatch();
  const handleAddMember = () => {
    if (
      team?.developers?.filter((dev) => dev?.email === loggedInUser?.email)
        ?.length > 0
    ) {
      const developers = [...team?.developers, member];
      const devEmails = developers?.map((dev) => dev?.email)?.join("-");
      const updatedTeam = {
        ...team,
        devEmails,
        developers,
      };
      editTeam({ id: team?.id, data: updatedTeam, email: loggedInUser?.email });
    } else {
      toast.error("You Are Not Authorized Person To Add Members To this team");
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      //check any projects exists with this team
      dispatch(projectApi.endpoints.getProjectByTeamId.initiate(team?.id))
        .unwrap()
        .then((res) => {
          res?.map((project) => {
            dispatch(
              projectApi.endpoints.editProject.initiate({
                id: project?.id,
                data: {
                  ...project,
                  devEmails: updatedTeam?.devEmails,
                },
                userEmail: loggedInUser?.email,
              })
            );
          });
        });
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="member__item">
      <div className="member__item__left">
        <h3 className="font-extrabold">{name}</h3>
        <div>{email}</div>
      </div>
      <div className="member__item__right">
        {addButton && (
          <button disabled={isLoading} onClick={handleAddMember}>
            {isLoading ? <BeatLoader loading={isLoading} /> : "Add "}
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamMemberItem;
