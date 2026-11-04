import Image from "next/image";
import Link from "next/link";
import vinskolan from "../../../public/Images/fatlager.jpeg";
import druvguiden from "../../../public/Images/gronadruvklasar_i_vingard.jpeg";
import ordlista from "../../../public/Images/vin_och_ost_bord.jpeg";
import vinatlas from "../../../public/Images/vintradgardsbild.jpeg";

const ExploreGuides = () => {
  return (
    <section className="layout bg-white">
      <h2 className="pb-10">Utforska våra guider</h2>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        <li className="md:row-span-2">
          <Link
            className="relative flex h-full min-h-50 items-center justify-center md:min-h-62.5"
            href="/vinskolan"
          >
            <span className="absolute top-0 left-0 z-2 h-full w-full bg-[#0000005a]"></span>
            <Image
              src={vinskolan}
              alt="bild på fatlager"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <span className="absolute z-3 border-b-2 pb-1 font-sub text-[22px] text-white">
              Vinskolan
            </span>
          </Link>
        </li>
        <li className="md:row-span-2">
          <Link
            className="relative flex h-full min-h-50 items-center justify-center md:min-h-62.5"
            href="/vinatlas"
          >
            <span className="absolute top-0 left-0 z-2 h-full w-full bg-[#0000005a]"></span>
            <Image
              src={vinatlas}
              alt="bild på fatlager"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <span className="absolute z-3 border-b-2 pb-1 font-sub text-[22px] text-white">
              Vinatlas
            </span>
          </Link>
        </li>
        <li className="md:col-span-2">
          <Link
            className="relative flex h-full min-h-50 items-center justify-center md:min-h-62.5"
            href="/druvguiden"
          >
            <span className="absolute top-0 left-0 z-2 h-full w-full bg-[#0000005a]"></span>
            <Image
              src={druvguiden}
              alt="bild på fatlager"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <span className="absolute z-3 border-b-2 pb-1 font-sub text-[22px] text-white">
              Druvguiden
            </span>
          </Link>
        </li>
        <li className="md:col-span-2">
          <Link
            className="relative flex h-full min-h-50 items-center justify-center md:min-h-62.5"
            href="/ordlistan"
          >
            <span className="absolute top-0 left-0 z-2 h-full w-full bg-[#0000005a]"></span>
            <Image
              src={ordlista}
              alt="bild på fatlager"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />
            <span className="absolute z-3 border-b-2 pb-1 font-sub text-[22px] text-white">
              Ordlistan
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ExploreGuides;
