import { getAdminDetails, getAllCountry, getAllRegion } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import CountryList from "@/app/components/admin/CountryList";
import RegionList from "@/app/components/admin/RegionList";
import { Space } from "@mantine/core";
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
  const countries = await getAllCountry();
  const regions = await getAllRegion(countries[0].id);
  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <CountryList countries={countries} />
      <Space h="lg" />
      <RegionList regions={regions} />
    </AdminDashboard>
  );
}
