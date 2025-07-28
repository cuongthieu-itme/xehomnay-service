import { cn } from "@/lib/utils";

interface HeadingProps {
  label: string;
  gradient?: boolean;
  className?: string;
}

const Heading = ({ label, gradient, className }: HeadingProps) => {
  return (
    <div
      className={cn(
        "text-xl w-[175px] h-[70px] bg-center bg-no-repeat flex justify-center items-center uppercase",
        className,
        {
          'bg-[url("/images/title-round-bg-gradient.png")]': gradient,
          'bg-[url("/images/title-round-bg.png")]': !gradient,
        }
      )}
    >
      <span className="-mt-2.5">{label}</span>
    </div>
  );
};

export default Heading;
