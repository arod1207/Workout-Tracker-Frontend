import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddWorkoutModal from "./AddWorkoutModal";

export default function AddWorkoutButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className="my-10 flex cursor-pointer items-center justify-center gap-1"
        onClick={() => setShow(!show)}
      >
        <AiOutlinePlusCircle color="#22C55E" size={32} />
        <h2 className="text-2xl text-green-500">Add a new workout</h2>
      </div>
      {show && <AddWorkoutModal setShow={setShow} />}
    </>
  );
}
