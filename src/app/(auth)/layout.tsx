import "@mantine/core/styles.css";

import Footer from "../components/footer/Footer";
import Mobile from "../components/navbar/Mobile";
import Navbar from "../components/navbar/Navbar";
import "../globals.css";

export default function commonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={` w-full h-full m-0 p-0 overflow-x-hidden`}>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Mobile />
      {children}
      <Footer />
    </div>
  );
}
