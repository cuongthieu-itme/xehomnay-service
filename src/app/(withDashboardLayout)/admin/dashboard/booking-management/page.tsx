import { getAdminDetails, getAllBookings } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import BookingList from "@/app/components/admin/BookingList";
import BookingStats from "@/app/components/admin/BookingStats";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BookingManagementPage() {
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
  const bookings = await getAllBookings();

  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <BookingStats bookings={bookings} />
      <BookingList bookings={bookings} />
    </AdminDashboard>
  );
}