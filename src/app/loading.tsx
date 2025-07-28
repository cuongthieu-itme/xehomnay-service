export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-center items-center">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-white rounded-full animate-ping absolute opacity-25"></div>
      </div>
    </div>
  );
}
