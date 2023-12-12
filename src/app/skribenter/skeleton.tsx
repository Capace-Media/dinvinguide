import { ArrowNextActive, ArrowPrevActive } from "@/components/icons";

export default function Skeleton() {
  return (
    <>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        {[...Array(8)].map((movie, index) => (
          <li key={index + "sdlcjxkgndf"} className="animate-pulse">
            <div className="">
              <div className="w-full relative h-[12.2rem] bg-gray-300"></div>
              <div className="h-[12.9rem]  flex flex-col justify-between py-2">
                <div className="flex flex-col">
                  <p className="mt-2 h-3 w-1/2 rounded-lg bg-gray-600"></p>
                  <p className="mt-2 block h-3 rounded-lg bg-gray-600 text-sm font-medium"></p>
                  <br />
                  <p className="mt-2 block h-2 rounded-lg bg-gray-600 text-sm font-medium"></p>
                  <p className="mt-2 block h-2 rounded-lg bg-gray-600 text-sm font-medium"></p>
                  <p className="mt-2 block h-2 rounded-lg bg-gray-600 text-sm font-medium"></p>
                </div>
                <p className="mt-2 h-3 w-1/2 rounded-lg bg-gray-600"></p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <div className="flex justify-center items-center gap-2 py-10">
          <button
            aria-label="föregående sida för posterna"
            className={` p-[10px] flex items-center justify-center $`}
          >
            <ArrowPrevActive />
          </button>

          <div className="flex justify-center items-center gap-3">
            <span className="w-[28px] flex justify-center items-center h-[28px] text-white bg-brand-secondary"></span>{" "}
            av
            <span className="w-[28px] flex justify-center items-center h-[28px] text-white bg-gray-300"></span>{" "}
          </div>

          <button
            aria-label="nästa sida för posterna"
            className={` p-[10px] flex items-center justify-center `}
          >
            <ArrowNextActive />
          </button>
        </div>
      </div>
    </>
  );
}
