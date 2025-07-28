import { getAllCars } from "@/actions/carAction";
import { Suspense } from "react";
import AboutUs from "../components/home/AboutUs";
import CarSection from "../components/home/CarSection";
import HeroSection from "../components/home/HeroSection";
import SkeletonGrid from "../components/shared/SkelitonGrid";

export default async function Home() {
  const cars = await getAllCars();
  return (
    <>
      <HeroSection />
      <Suspense fallback={<SkeletonGrid />}>
        <CarSection cars={cars} />
      </Suspense>
      <AboutUs />
    </>
  );
}
