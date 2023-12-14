import { getTopLists } from "@/lib/queries/getTopLists";
import Image from "next/image";
import Link from "next/link";
import TopListCategory from "./TopListCategory";

import drinks from "../../../../public/Images/dryckesutforskaren.jpeg";
import recipes from "../../../../public/Images/receptutforskaren.jpeg";

interface TopListLinksProps {}
async function getData() {
  const res = await getTopLists();

  return { data: res };
}

const TopListLinks = async ({}: TopListLinksProps) => {
  const { data } = await getData();
  const elements = [];
  // Start from the second last element and iterate to the end
  for (let i = data.length - 2; i < data.length; i++) {
    elements.push(
      <TopListCategory key={data[i].id} data={data[i]} index={i} />
    );
  }

  return (
    <section className="relative z-10">
      <ul className="grid gap-3 md:grid-cols-2 lg:gap-0 ">
        {elements}
        <li className="">
          <Link href={`/dryckesutforskaren`} className="lg:relative group">
            <div className="hidden lg:block lg:absolute lg:w-full lg:h-full lg:opacity-0 lg:z-10 lg:bg-[#e1e5d458] lg:group-hover:opacity-100 lg:ease-in-out lg:duration-300 lg:cursor-pointer "></div>
            <div
              className={`relative w-full link-overlay h-[223.54px] lg:h-[312.84px]`}
            >
              <Image
                src={drinks}
                alt="Elegant rödvinflaska och fyllt vinglas på träunderlägg med marmorbakgrund för vinälskare."
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1380px) 980px, (min-width: 1040px) calc(81.25vw - 125px), (min-width: 380px) 280px, calc(73.33vw + 16px)"
              />
              <div className="flex z-10 justify-between lg:items-end absolute bottom bottom-4 left-4">
                <div>
                  <p className="uppercase text-white text-[14px]">
                    Dryckesutforskaren
                  </p>
                  <h3 className="text-white text-[23px]">
                    Utforska alla drycker
                  </h3>
                  <p className="text-white text-[12px]">
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
            <div
              className={`relative w-full link-overlay h-[223.54px] lg:h-[312.84px]`}
            >
              <Image
                src={recipes}
                alt="Elegant rödvinflaska och fyllt vinglas på träunderlägg med marmorbakgrund för vinälskare."
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1380px) 980px, (min-width: 1040px) calc(81.25vw - 125px), (min-width: 380px) 280px, calc(73.33vw + 16px)"
              />
              <div className="flex z-10 justify-between lg:items-end absolute bottom bottom-4 left-4">
                <div>
                  <p className="uppercase text-white text-[14px]">
                    ReceptUTFORSKAREN
                  </p>
                  <h3 className="text-white text-[23px]">
                    Utforska våra härliga recept
                  </h3>
                  <p className="text-white text-[12px]">
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
