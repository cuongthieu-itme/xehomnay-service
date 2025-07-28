interface ContainerProps {
  children: React.ReactNode;
}

const HeroContainer = ({ children }: ContainerProps) => {
  return (
    <div
      className="
        max-w-[1400px]
        mx-auto
        xl:px-24
        lg:px-20
        md:px-18
        sm:px-5
        md:px-4
        px-0
      "
    >
      {children}
    </div>
  );
};

export default HeroContainer;
