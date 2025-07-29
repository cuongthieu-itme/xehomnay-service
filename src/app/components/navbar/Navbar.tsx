import { Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import AuthButton from "../shared/AuthButton";
import Container from "../shared/Container";
import Logo from "../shared/Logo";
import NavItem from "./NavItem";

const navItems = [
  // { name: "Home", path: "/", current: false },
  { name: "Xe cho thuê", path: "/cars", current: false },
  { name: "Về chúng tôi", path: "/about", current: false },
  { name: "Dịch vụ khác", path: "/other-services", current: false },
  { name: "FAQ", path: "/faq", current: false },
  { name: "Liên hệ", path: "/contact", current: false },
];
export default function Navbar() {
  return (
    <>
      {/* only desktop */}
      <nav className="hidden nv md:block fixed w-full h-[90px] bg-white shadow-md z-50 top-0">
        <Container>
          <div className="flex relative items-center justify-between py-3">
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="grid gap-2">
              <div className="flex justify-between z-50">
                <Link href="/" className="flex items-center space-x-2">
                  <MapPin size={24} className="text-red-500" />{" "}
                  <span className="text-white font-medium text-base">
                    10/253 Nguyễn Khang, Yên Hòa, Hà Nội
                  </span>
                </Link>
                <Link href="/" className="flex items-center space-x-2">
                  <Mail size={24} className="text-red-500" />{" "}
                  <span className="text-white font-medium text-base">
                    thuexe@todaytravel.vn
                  </span>
                </Link>
                <Link href="/" className="flex items-center space-x-2">
                  <PhoneCall size={24} className="text-red-500" />{" "}
                  <span className="text-white font-medium text-base">
                    085.234.2525
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/`}
                  className={`text-gray-600 text-center hover:text-red-600 px-3 py-2 rounded-md text-lg font-medium cursor-pointer border-b-2 md:border-b-0 md:text-gray-600
                  `}
                >
                  Trang chủ
                </Link>
                {navItems.map((item) => (
                  <NavItem key={item.name} path={item.path} label={item.name} />
                ))}

                <AuthButton />

                {/*<DashboardButton /> */}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
