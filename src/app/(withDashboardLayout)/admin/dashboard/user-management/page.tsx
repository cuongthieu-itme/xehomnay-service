import { getAdminDetails, getAllUsers } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import UserList from "@/app/components/admin/UserList";
import UserStats from "@/app/components/admin/UserStats";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserManagementPage() {
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
  const users = await getAllUsers();

  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <UserStats users={users} />
      <UserList users={users} />
    </AdminDashboard>
  );
}