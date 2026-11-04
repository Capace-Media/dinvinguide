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
      <ul className="grid gap-3 md:grid-cols-2 lg:gap-0">
        {topLists.slice(start).map((topList, i) => (
          <TopListCategory
            key={topList.id}
            topList={topList}
            index={start + i}
          />
        ))}
        <li className="">
          <Link href={`/dryckesutforskaren`} className="group lg:relative">
            <div className="hidden lg:absolute lg:z-10 lg:block lg:h-full lg:w-full lg:cursor-pointer lg:bg-[#e1e5d458] lg:opacity-0 lg:duration-300 lg:ease-in-out lg:group-hover:opacity-100"></div>
            <div className={`relative h-[223.54px] w-full lg:h-[312.84px]`}>
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
              <div className="absolute bottom-4 left-4 z-10 flex justify-between lg:items-end">
                <div>
                  <p className="text-[14px] text-white uppercase group-hover:underline">
                    Dryckesutforskaren
                  </p>
                  <h3 className="text-[23px] text-white group-hover:underline">
                    Utforska alla drycker
                  </h3>
                  <p className="text-[12px] text-white group-hover:underline">
                    Testad av redaktionen
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </li>
        <li className="">
          <Link href={`/recept`} className="group lg:relative">
            <div className="hidden lg:absolute lg:z-10 lg:block lg:h-full lg:w-full lg:cursor-pointer lg:bg-[#e1e5d458] lg:opacity-0 lg:duration-300 lg:ease-in-out lg:group-hover:opacity-100"></div>
            <div className={`relative h-[223.54px] w-full lg:h-[312.84px]`}>
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
              <div className="absolute bottom-4 left-4 z-10 flex justify-between lg:items-end">
                <div className="">
                  <p className="text-[14px] text-white uppercase group-hover:underline">
                    ReceptUTFORSKAREN
                  </p>
                  <h3 className="text-[23px] text-white group-hover:underline">
                    Utforska våra härliga recept
                  </h3>
                  <p className="text-[12px] text-white group-hover:underline">
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
