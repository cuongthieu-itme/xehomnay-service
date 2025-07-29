import { getAdminDetails, getAllReviews } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import ReviewList from "@/app/components/admin/ReviewList";
import ReviewStats from "@/app/components/admin/ReviewStats";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ReviewManagementPage() {
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
  const reviews = await getAllReviews();

  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <ReviewStats reviews={reviews} />
      <ReviewList reviews={reviews} />
    </AdminDashboard>
  );
}