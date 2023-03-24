import { Dispatch, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

type AuthProps = {
  dispatch: Dispatch<{
    type: string;
    payload: {
      email: string;
      password: string;
    };
  }>;
};

export const useSignup = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext() as AuthProps;

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/api/user/signup`,
        {
          email,
          password,
        }
      );
      setError("");

      if (response.data) {
        setIsLoading(false);

        localStorage.setItem("user", JSON.stringify(response.data.token));
        dispatch({ type: "LOGIN", payload: response.data });
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };
  return { signup, isLoading, error };
};
