import { FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useSignup } from "@/hooks/useSignup";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";

type Props = {
  user: string;
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const { signup, isLoading, error } = useSignup();
  const { user } = useAuthContext() as Props;
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signup(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className=" absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center">
        <h1 className="py-6 text-6xl font-semibold">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col justify-center gap-3 px-6  ">
            <input
              type="text"
              placeholder="Email"
              className={`${
                emptyFields.includes("title")
                  ? "rounded border-2 border-red-500 px-2 py-1"
                  : "rounded border-2 border-green-500 px-2 py-1"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="password"
              className={`${
                emptyFields.includes("weight")
                  ? "rounded border-2 border-red-500 px-2 py-1"
                  : "rounded border-2 border-green-500 px-2 py-1"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" flex justify-center py-2">
            <button
              className="flex w-1/3 items-center justify-center rounded-md border-2 border-green-500 bg-green-500 px-2 py-1 text-white"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="white" size={24} /> : "Submit"}
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
    </>
  );
}
