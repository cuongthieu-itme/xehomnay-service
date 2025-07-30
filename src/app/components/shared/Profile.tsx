"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Toast from "@/lib/Toast";
import { LogOutIcon, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = ({ user }: any) => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Đăng xuất thành công");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="text-center">
      <Toast />
      <DropdownMenu>
        <DropdownMenuTrigger className="text-lg font-medium text-white md:text-gray-600 cursor-pointer">
          <Image
            src={user?.image || "/images/user.png"}
            alt={user?.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem
            className="text-lg font-medium text-gray-600 cursor-pointer w-full
            hover:bg-gray-100 p-2 rounded transition duration-100 ease-in-out"
          >
            {user?.role === "provider" && (
              <Link
                href={"/provider/dashboard"}
                className="flex items-center
            "
              >
                <User size={15} className="mr-2" />
                Thông tin
              </Link>
            )}
            {user?.role === "user" && (
              <>
                <Link
                  href={"/my-account/profile"}
                  className="flex items-center
       "
                >
                  <User size={15} className="mr-2" />
                  Thông tin
                </Link>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <Link
                  href={"/admin/dashboard"}
                  className="flex items-center
        "
                >
                  <User size={15} className="mr-2" />
                  Thông tin
                </Link>
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-lg font-medium text-gray-600 rounded cursor-pointer hover:bg-gray-100 p-2 transition duration-100 ease-in-out"
            onClick={handleLogout}
          >
            <div className="flex items-center">
              <LogOutIcon size={15} className="mr-2" />
              Đăng xuất
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
