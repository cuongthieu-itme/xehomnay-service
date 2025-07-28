import { getAdminDetails, getAllProvider } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import ProviderList from "@/app/components/admin/ProviderList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
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
  const allProviders = await getAllProvider();
  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <ProviderList allProviders={allProviders} />
    </AdminDashboard>
  );
}
