import { getProviderDetails, providerGetReviews } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import Reviews from "@/app/components/provider/Reviews";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ProviderReviews() {
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
  const reviews = await providerGetReviews(providerDetails?.Provider[0]?.id);
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      <Reviews reviews={reviews} user={user} />
    </DashboardLayout>
  );
}
