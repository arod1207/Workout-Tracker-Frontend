import { Dispatch, FormEvent, useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "@/hooks/useWorkoutsContext";
import { useAuthContext } from "@/hooks/useAuthContext";

type Props = {
  setShow: (show: boolean) => void;
};

type WorkoutProps = {
  dispatch: Dispatch<{
    type: string;
    payload: {
      title: string;
      reps: string;
      load: string;
    };
  }>;
};

type UserProps = {
  user: {
    token: string;
  };
};

export default function AddWorkoutModal({ setShow }: Props) {
  const { dispatch } = useWorkoutContext() as WorkoutProps;
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState(0);
  const [load, setLoad] = useState(0);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const { user } = useAuthContext() as UserProps;

  const handleAddWorkout = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/api/workouts`,
        {
          title,
          reps,
          load,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setLoad(0);
      setReps(0);
      setShow(false);
      dispatch({ type: "ADD_WORKOUT", payload: response.data });
    } catch (error: any) {
      setEmptyFields(error.response.data.emptyFields);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleAddWorkout}>
        <div className="flex flex-col justify-center gap-3 px-6 md:flex-row">
          <div className="flex flex-col">
            <label>Workout</label>
            <input
              type="text"
              className={`${
                emptyFields?.includes("title")
                  ? "rounded border-2 border-red-500 px-2 py-1"
                  : "rounded border-2 border-green-500 px-2 py-1"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label># of reps</label>
            <input
              type="number"
              className={`${
                emptyFields?.includes("reps")
                  ? "rounded border-2 border-red-500 px-2 py-1"
                  : "rounded border-2 border-green-500 px-2 py-1"
              }`}
              value={reps}
              onChange={(e) => setReps(parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label>Weight</label>
            <input
              type="number"
              className={`${
                emptyFields?.includes("weight")
                  ? "rounded border-2 border-red-500 px-2 py-1"
                  : "rounded border-2 border-green-500 px-2 py-1"
              }`}
              value={load}
              onChange={(e) => setLoad(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="flex justify-center py-2">
          <button className="rounded-md border-2 border-green-500 bg-green-500 px-2 py-1 text-white">
            Submit
          </button>
        </div>
      </form>
      {error && (
        <div>
          <h2 className="text-center text-xs text-red-500 md:text-lg">
            {error}
          </h2>
        </div>
      )}
    </div>
  );
}
