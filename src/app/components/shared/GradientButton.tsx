"use client";

import { ArrowRightCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface GradientButtonProps {
  label: string;
  path: string;
}
const GradientButton = ({ label, path }: GradientButtonProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`${path}`)}
      className="text-lg bg-btn-gradient px-5 py-2 rounded-xl 
      mt-5 font-medium  transition-all      
      hover:before:bg-btn-gradient-hover
      relative  
      overflow-hidden  
      shadow-2xl  before:absolute 
      before:bottom-0 before:left-0 before:top-0
      before:z-0 before:h-full before:w-0 
      before:bg-btn-gradient before:transition-all 
      before:duration-500 hover:text-white hover:before:left-0 
      hover:before:w-full
      "
    >
      <span className="relative z-10">
        {label} <ArrowRightCircleIcon size={20} className="inline-block" />
      </span>
    </button>
  );
};

export default GradientButton;
