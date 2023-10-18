export default function Skeleton() {
  return (
    <ul className="lg:grid lg:grid-cols-4 md:grid-cols-2 lg:gap-5">
      {[...Array(8)].map((movie, index) => (
        <li key={index} className="animate-pulse">
          <div className="w-full relative h-[14.2rem] bg-gray-300"></div>
          <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-600"></p>
          <p className="mt-2 block h-4 rounded-lg bg-gray-600 text-sm font-medium"></p>
          <p className="mt-2 block h-4 rounded-lg bg-gray-600 text-sm font-medium"></p>
        </li>
      ))}
    </ul>
  );
}
