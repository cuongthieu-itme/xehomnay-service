import { getAdminDetails, getAllCountry, getAllRegion } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import RegionList from "@/app/components/admin/RegionList";
import RegionStats from "@/app/components/admin/RegionStats";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegionManagementPage() {
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

  // Get all regions from all countries
  const allRegions = [];
  for (const country of countries || []) {
    const regions = await getAllRegion(country.id);
    if (regions && !regions.error) {
      allRegions.push(...regions);
    }
  }

  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <RegionStats regions={allRegions} />
      <RegionList regions={allRegions} />
    </AdminDashboard>
  );
}