import { getTopLists } from "@/lib/api/pages/get-pages";
import Image from "next/image";
import Link from "next/link";
import TopListCategory from "./top-list-category";

import drinks from "../../../public/Images/dryckesutforskaren.jpeg";
import recipes from "../../../public/Images/receptutforskaren.jpeg";
import Overlay from "@/components/graphic/overlay";

const TopListLinks = async () => {
  const topLists = await getTopLists();
  // The last two top lists are featured here; the rest live on /dryckeslistan.
  const start = Math.max(topLists.length - 2, 0);

  return (
    <section className="relative z-10 pb-10">
      <ul className="grid gap-3 md:grid-cols-2 lg:gap-0 ">
        {topLists.slice(start).map((topList, i) => (
          <TopListCategory key={topList.id} topList={topList} index={start + i} />
        ))}
        <li className="">
          <Link href={`/dryckesutforskaren`} className="lg:relative group">
            <div className="hidden lg:block lg:absolute lg:w-full lg:h-full lg:opacity-0 lg:z-10 lg:bg-[#e1e5d458] lg:group-hover:opacity-100 lg:ease-in-out lg:duration-300 lg:cursor-pointer "></div>
            <div className={`relative w-full  h-[223.54px] lg:h-[312.84px]`}>
              <Overlay direction="b" />
              <Image
                unoptimized
                src={drinks}
                alt="Elegant rödvinflaska och fyllt vinglas på träunderlägg med marmorbakgrund för vinälskare."
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1380px) 980px, (min-width: 1040px) calc(81.25vw - 125px), (min-width: 380px) 280px, calc(73.33vw + 16px)"
              />
              <div className="flex z-10 justify-between lg:items-end absolute bottom-4 left-4">
                <div>
                  <p className="group-hover:underline uppercase text-white text-[14px]">
                    Dryckesutforskaren
                  </p>
                  <h3 className="group-hover:underline text-white text-[23px]">
                    Utforska alla drycker
                  </h3>
                  <p className="group-hover:underline text-white text-[12px]">
                    Testad av redaktionen
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </li>
        <li className="">
          <Link href={`/recept`} className="lg:relative group ">
            <div className="hidden lg:block lg:absolute lg:w-full lg:h-full lg:opacity-0 lg:z-10 lg:bg-[#e1e5d458] lg:group-hover:opacity-100 lg:ease-in-out lg:duration-300 lg:cursor-pointer "></div>
            <div className={`relative w-full  h-[223.54px] lg:h-[312.84px]`}>
              <Overlay direction="b" />
              <Image
                unoptimized
                src={recipes}
                alt="Elegant rödvinflaska och fyllt vinglas på träunderlägg med marmorbakgrund för vinälskare."
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1380px) 980px, (min-width: 1040px) calc(81.25vw - 125px), (min-width: 380px) 280px, calc(73.33vw + 16px)"
              />
              <div className="flex z-10 justify-between lg:items-end absolute bottom-4 left-4">
                <div className="">
                  <p className="uppercase group-hover:underline text-white text-[14px]">
                    ReceptUTFORSKAREN
                  </p>
                  <h3 className="text-white text-[23px] group-hover:underline">
                    Utforska våra härliga recept
                  </h3>
                  <p className="text-white text-[12px] group-hover:underline">
                    Recept skrivna av redaktionen
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default TopListLinks;
