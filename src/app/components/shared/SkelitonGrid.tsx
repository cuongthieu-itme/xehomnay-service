const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-300 h-48 w-full rounded-md"
        ></div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
