import { Dispatch } from "react";
import { useAuthContext } from "./useAuthContext";

type Props = {
  dispatch: Dispatch<{
    type: string;
  }>;
};

export const useLogout = () => {
  const { dispatch } = useAuthContext() as Props;

  const logout = () => {
    //remove user from storage//
    localStorage.removeItem("user");

    //Logout User
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
