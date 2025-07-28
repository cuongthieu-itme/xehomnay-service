import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Profile from "./Profile";

const AuthButton = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="text-center">
      {session ? (
        <Profile user={session?.user} />
      ) : (
        <Link
          href="/login"
          className={`
          bg-red-700
            hover:bg-red-600 transition duration-100 ease-in-out rounded text-white  px-3 py-2 text-lg font-medium cursor-pointer  `}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
