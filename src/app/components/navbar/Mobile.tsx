"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "../shared/Container";
import Logo from "../shared/Logo";
import MobileAuthButton from "../shared/MobileAuthButton";
interface NavItemProps {
  label: string;
  active?: boolean;
  path: string;
  onClick?: () => void;
}
const navItems = [
  // { name: "Home", path: "/", current: false },
  { name: "Rent a Car", path: "/cars", current: false },
  { name: "About", path: "/about", current: false },
  { name: "Other Services", path: "/other-services", current: false },
  { name: "Faq", path: "/faq", current: false },
  { name: "Contact", path: "/contact", current: false },
];

export default function Mobile() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({ path, label, active, onClick }: NavItemProps) => {
    return (
      <Link
        href={`${path}`}
        onClick={onClick}
        className={`text-gray-600 text-center hover:text-red-600 px-3 py-2 rounded-md text-lg font-medium cursor-pointer border-b-2 md:border-b-0 ${
          active ? "red_color" : "text-white md:text-gray-600"
        }`}
      >
        {label}
      </Link>
    );
  };
  return (
    <div
      className={`absolute top-0 left-0 w-full z-50 md:hidden ${
        pathname === "/login" || pathname === "/register"
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-3">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-10 w-10 ${
                  pathname === "/login" ||
                  pathname === "/register" ||
                  pathname === "/my-account" ||
                  pathname === "/my-account/profile" ||
                  pathname === "/my-account/bookings"
                    ? "text-black"
                    : "text-white"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </SheetTrigger>
            <SheetContent className="bg-[#0d0101]" id="content">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex-shrink-0">
                    <Logo />
                  </div>
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                <NavItem
                  path="/"
                  label="Home"
                  onClick={() => setIsOpen(false)}
                />
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    path={item.path}
                    label={item.name}
                    active={pathname === item.path}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
                <div className="space-y-3"></div>
                <MobileAuthButton />
                {/*<DashboardButton /> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </div>
  );
}
