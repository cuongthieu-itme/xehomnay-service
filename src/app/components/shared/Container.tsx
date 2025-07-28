interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className="
        max-w-[1400px]
        mx-auto
        xl:px-24
        lg:px-20
        md:px-18
        sm:px-5
        px-4
      "
    >
      {children}
    </div>
  );
};

export default Container;
