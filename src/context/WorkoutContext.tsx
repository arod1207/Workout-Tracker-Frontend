import { createContext, ReactNode, useReducer } from "react";

type Props = {
  children: ReactNode;
};

type WorkoutProps = {
  w: string;
  _id: string;
};

export const WorkoutContext = createContext({});

export const workoutsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "ADD_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (w: WorkoutProps) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
