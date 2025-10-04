import { getAdminDetails } from "@/actions/admin";
import { adminStatics } from "@/actions/statics";
import { authOptions } from "@/app/auth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import AdminStats from "@/app/components/admin/Stats";
import {
    IconAlertCircle,
    IconCar,
    IconMessage2,
    IconUsers,
} from "@tabler/icons-react";
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
  if (!getSession || user?.role !== "admin") {
    return redirect("/login");
  }
  const admin = await getAdminDetails(user?.id);
  const {totalBooking,totalCar,totalReview,totalUser} = await adminStatics();
  const data = [
    {
      title: "Đơn đặt xe",
      icon: <IconAlertCircle />,
      value: totalBooking?.toString(),
    },
    {
      title: "Tổng số xe",
      icon: <IconCar />,
      value: totalCar?.toString(),
    },

    {
      title: "Đánh giá",
      icon: <IconMessage2 />,
      value: totalReview?.toString(),
    },

    {
      title: "Người dùng",
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
