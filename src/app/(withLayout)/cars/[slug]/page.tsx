import { getCarDetails } from "@/actions/carAction";
import { authOptions } from "@/app/auth";
import CarDetails from "@/app/components/cars/details/CarDetails";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface CarDetailsPageProps {
  params: any;
  searchParams: any;
}

export default async function Page({ params }: CarDetailsPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }
  if (!params) {
    return redirect("/cars");
  }
  const { slug } = params as { slug: string };
  const user = session?.user as { id: string };
  const carDetails = await getCarDetails(user?.id, slug);
  return (
    <>
      <Breadcrumb label={"Đặt xe"} />

      <section className="py-10">
        <div className="mx-auto">
          <CarDetails carDetails={carDetails?.car} user={carDetails?.user} />
        </div>
      </section>
    </>
  );
}
