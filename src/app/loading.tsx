export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-lg">Loading...</h1>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
