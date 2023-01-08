import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSelectors";

export const useAuth = () => {
  const auth = useSelector(selectUser);
  if (auth?.accessToken && auth?.user) {
    return true;
  } else {
    return false;
  }
};
