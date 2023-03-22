import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WorkoutContextProvider } from "@/context/WorkoutContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WorkoutContextProvider>
      <Component {...pageProps} />
    </WorkoutContextProvider>
  );
}
