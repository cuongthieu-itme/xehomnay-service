import AboutPage from "@/app/components/about/About";
import Breadcrumb from "@/app/components/shared/Breadcrumb";

export default function About() {
  return (
    <>
      <Breadcrumb label="About Us" />
      <AboutPage />
    </>
  );
}
