import { Dispatch, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

type Props = {
  dispatch: Dispatch<{
    type: string;
    payload: {
      email: string;
      password: string;
    };
  }>;
};

export const useLogin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext() as Props;

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/api/user/login`,
        {
          email,
          password,
        }
      );

      if (response.data) {
        setIsLoading(false);
      }
      localStorage.setItem("user", JSON.stringify(response.data.token));
      dispatch({ type: "LOGIN", payload: response.data });
    } catch (error: any) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };
  return { isLoading, error, login };
};
