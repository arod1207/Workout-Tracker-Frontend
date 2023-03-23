import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WorkoutContextProvider } from "@/context/WorkoutContext";
import { AuthContextProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <WorkoutContextProvider>
        <Component {...pageProps} />
      </WorkoutContextProvider>
    </AuthContextProvider>
  );
}
