"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardButton = () => {
  const pathname = usePathname();
  const isLogin = false;

  if (!isLogin) {
    return null;
  }

  return (
    <Link
      href="/dashboard"
      className={`bg-green-500 hover:bg-green-600 transition duration-100 ease-in-out rounded text-white px-3 py-1 text-lg font-medium cursor-pointer `}
    >
      Dashboard
    </Link>
  );
};

export default DashboardButton;
