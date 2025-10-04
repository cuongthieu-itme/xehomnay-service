import { getAllCountriesAsync } from "@/actions/actions";
import { getAllRegion } from "@/actions/admin";
import { getProviderDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import CountryRegionTabs from "@/app/components/provider/CountryRegionTabs";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
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
  if (!getSession || user?.role !== "provider") return redirect("/login");
  const providerDetails = await getProviderDetails(user?.id);
  const countries = await getAllCountriesAsync();
  const regions = await getAllRegion(countries[0]?.id || "");
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      <CountryRegionTabs countries={countries} regions={regions} />
    </DashboardLayout>
  );
}
