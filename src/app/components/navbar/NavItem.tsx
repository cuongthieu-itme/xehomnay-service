"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  active?: boolean;
  path: string;
}
const NavItem = ({ path, label }: NavItemProps) => {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <Link
      href={`${path}`}
      className={`text-gray-600 text-center hover:text-red-600 px-3 py-2 rounded-md text-lg font-medium cursor-pointer border-b-2 md:border-b-0 ${
        active ? "red_color" : "text-white md:text-gray-600"
      }`}
    >
      {label}
    </Link>
  );
};

export default NavItem;
