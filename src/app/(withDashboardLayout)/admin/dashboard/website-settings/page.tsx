import { getAdminDetails } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const getSession = await getServerSession(authOptions);
  const user = getSession?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    role: string;
  };
  if (!getSession || user?.role !== "admin") {
    return redirect("/login");
  }
  const admin = await getAdminDetails(user.id);
  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <h1>Work In Progress website setting...</h1>
    </AdminDashboard>
  );
}
