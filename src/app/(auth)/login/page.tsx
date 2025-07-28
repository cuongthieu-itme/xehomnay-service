import { authOptions } from "@/app/auth";
import LoginApp from "@/app/components/auth/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const getSession = await getServerSession(authOptions);
  if (getSession) {
    return redirect("/");
  }
  return (
    <div className="py-32  lg:px-10  min-h-[calc(100vh-90px)]">
      <LoginApp />
    </div>
  );
}
