import { getAdminDetails, getAllCountry } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import CountryList from "@/app/components/admin/CountryList";
import CountryStats from "@/app/components/admin/CountryStats";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CountryManagementPage() {
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
  const countries = await getAllCountry();

  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <CountryStats countries={countries} />
      <CountryList countries={countries} />
    </AdminDashboard>
  );
}