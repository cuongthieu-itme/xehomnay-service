import { getProviderDetails } from "@/actions/auth";
import { carTypeStatics, prodiverStatics } from "@/actions/statics";
import { authOptions } from "@/app/auth";
import { CarStats } from "@/app/components/provider/CarStats";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import Stats from "@/app/components/provider/Stats";
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
  if (!getSession || user?.role !== "provider") return redirect("/login");
  const providerDetails = await getProviderDetails(user?.id);
  const { totalBooking, totalCar, totalReview, totalUser } =
    await prodiverStatics(providerDetails?.Provider?.[0]?.id);
  const carType = await carTypeStatics(providerDetails?.Provider?.[0]?.id);
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
      value: totalUser?.userId?.toString(),
    },
  ];
  //car type
  const dataCar = Object?.entries(carType?.carType)?.map(([label, value]) => ({
    label,
    value,
  }));
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      <Stats data={data} />
      <CarStats dataCar={dataCar} />
    </DashboardLayout>
  );
}
