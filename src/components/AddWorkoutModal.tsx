import { Dispatch, FormEvent, useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "@/hooks/useWorkoutsContext";

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

export default function AddWorkoutModal({ setShow }: Props) {
  const { dispatch } = useWorkoutContext() as WorkoutProps;
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState(0);
  const [load, setLoad] = useState(0);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleAddWorkout = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/workouts", {
        title,
        reps,
        load,
      });

      setTitle("");
      setLoad(0);
      setReps(0);
      setShow(false);
      dispatch({ type: "ADD_WORKOUT", payload: response.data });
    } catch (error: any) {
      setEmptyFields(error.response.data.emptyFields);
      return setError(error.response.data.error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleAddWorkout}>
        <div className="flex flex-col justify-center gap-3 px-6 md:flex-row">
          <input
            type="text"
            placeholder="Workout"
            className={`${
              emptyFields.includes("title")
                ? "rounded border-2 border-red-500 px-2 py-1"
                : "rounded border-2 border-green-500 px-2 py-1"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Reps"
            className={`${
              emptyFields.includes("reps")
                ? "rounded border-2 border-red-500 px-2 py-1"
                : "rounded border-2 border-green-500 px-2 py-1"
            }`}
            value={reps}
            onChange={(e) => setReps(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Weight"
            className={`${
              emptyFields.includes("weight")
                ? "rounded border-2 border-red-500 px-2 py-1"
                : "rounded border-2 border-green-500 px-2 py-1"
            }`}
            value={load}
            onChange={(e) => setLoad(parseInt(e.target.value))}
          />
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
