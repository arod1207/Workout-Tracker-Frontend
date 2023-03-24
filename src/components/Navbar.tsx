import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "@/hooks/useAuthContext";

type Prop = {
  user: {
    user: {
      email: string;
    };
  };
};

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext() as Prop;

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="flex h-16 items-center justify-center bg-white px-10 shadow-sm 
    md:h-24 md:justify-between md:px-24"
    >
      <Link href="/">
        <button className="hidden md:block md:text-3xl md:font-bold">
          Workout Tracker
        </button>
      </Link>

      {user ? (
        <div className="flex gap-4">
          <span className="font-bold">{user?.user?.email}</span>

          <button onClick={handleLogout} className="font-bold">
            Log out
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login">
            <button className="font-bold">Login</button>
          </Link>
          <Link href="/signup">
            <button className="font-bold">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}
