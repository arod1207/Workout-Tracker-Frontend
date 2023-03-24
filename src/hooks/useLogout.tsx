import { Dispatch } from "react";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutsContext";

type Props = {
  dispatch: Dispatch<{
    type: string;
  }>;
};

type WorkoutProps = {
  dispatch: Dispatch<{
    type: string;
    payload: null;
  }>;
};

export const useLogout = () => {
  const { dispatch } = useAuthContext() as Props;
  const { dispatch: workoutDispatch } = useWorkoutContext() as WorkoutProps;

  const logout = () => {
    //remove user from storage//
    localStorage.removeItem("user");

    //Logout User
    dispatch({ type: "LOGOUT" });
    workoutDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
