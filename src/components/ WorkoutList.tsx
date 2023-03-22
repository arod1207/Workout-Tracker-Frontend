import { Dispatch, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import { useWorkoutContext } from "@/hooks/useWorkoutsContext";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
};

interface WorkoutsProps {
  workouts: Props[];
  dispatch: Dispatch<{ type: string; payload?: any }>;
}

export default function WorkoutList() {
  const { workouts, dispatch } = useWorkoutContext() as WorkoutsProps;

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await axios.get("http://localhost:3001/api/workouts");

      dispatch({ type: "SET_WORKOUTS", payload: response.data });
    };
    fetchWorkouts();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:3001/api/workouts/${id}`
    );

    dispatch({ type: "DELETE_WORKOUT", payload: response.data });
  };

  return (
    <div className="mx-10 my-10 grid grid-cols-1 gap-3 md:grid-cols-3">
      {!workouts && (
        <div>
          <h1>Add a workout...</h1>
        </div>
      )}
      {workouts?.map((workout: Props) => (
        <div
          className="relative rounded border-2 p-6 shadow-sm"
          key={workout._id}
        >
          <h2 className="text-2xl font-bold text-green-500">
            {workout.title.toUpperCase()}
          </h2>
          <h3 className="text-lg">Reps: {workout.reps}</h3>
          <h3 className="text-lg">Weight: {workout.load}lbs.</h3>
          <Moment fromNow={true} className="text-sm text-gray-500">
            {workout.createdAt}
          </Moment>
          <div className="mt-2 flex justify-between">
            {/* <button className="rounded bg-blue-300 px-1 py-1 text-white">
              Update
            </button> */}
            <span
              className=" cursor-pointer rounded px-1 py-1 text-red-500"
              onClick={() => handleDelete(workout._id)}
            >
              <FaRegTrashAlt className="absolute top-6 right-5  h-6 w-6 md:h-6 md:w-6" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
