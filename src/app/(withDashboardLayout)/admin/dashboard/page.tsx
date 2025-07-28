import { getAdminDetails } from "@/actions/admin";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  IconAlertCircle,
  IconCar,
  IconMessage2,
  IconUsers,
} from "@tabler/icons-react";
import AdminStats from "@/app/components/admin/Stats";
import { adminStatics } from "@/actions/statics";

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
  const admin = await getAdminDetails(user?.id);
  const {totalBooking,totalCar,totalReview,totalUser} = await adminStatics();
  const data = [
    {
      title: "Booking",
      icon: <IconAlertCircle />,
      value: totalBooking?.toString(),
    },
    {
      title: "Total Cars",
      icon: <IconCar />,
      value: totalCar?.toString(),
    },

    {
      title: "Total Reviews",
      icon: <IconMessage2 />,
      value: totalReview?.toString(),
    },

    {
      title: "My Users",
      icon: <IconUsers />,
      value: totalUser?.toString(),
    },
  ];
  return (
    <AdminDashboard adminDetails={admin} user={user}>
      <AdminStats data={data}/>
    </AdminDashboard>
  );
}
