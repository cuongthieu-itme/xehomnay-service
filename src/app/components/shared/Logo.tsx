import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};
const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center text-[40px] font-bold text-gray-800 cursor-pointer uppercase",
        className
      )}
    >
      <Image
        alt="Logo"
        width={180}
        height={180}
        className="mr-1 w-14 h-14"
        src="/images/mini-car.gif"
      />
      <span className="text-2xl">Xe Hôm Nay</span>
    </Link>
  );
};

export default Logo;
