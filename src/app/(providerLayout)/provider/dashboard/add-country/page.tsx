import { getAllCountriesAsync } from "@/actions/actions";
import { getAllRegion } from "@/actions/admin";
import { getProviderDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import AddCountry from "@/app/components/provider/AddCountry";
import AddRegion from "@/app/components/provider/AddRegion";
import CountryTableList from "@/app/components/provider/CountryTableList";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import RegionTableList from "@/app/components/provider/RegionTableList";
import { Divider, Text } from "@mantine/core";
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
      <div className="flex gap-10">
        <AddCountry />
        <AddRegion countries={countries} />
      </div>
      <Divider py={10} />
      <Text
        style={{
          textAlign: "center",
        }}
        size="xl"
      >
        Danh sách quốc gia
      </Text>
      <CountryTableList countries={countries} />
      <Divider py={10} />
      <Text
        style={{
          textAlign: "center",
        }}
        size="xl"
      >
        Danh sách khu vực
      </Text>
      <RegionTableList regions={regions} />
    </DashboardLayout>
  );
}
