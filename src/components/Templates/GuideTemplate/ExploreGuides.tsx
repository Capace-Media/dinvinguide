import Image from "next/image";
import Link from "next/link";
import vinskolan from "../../../../public/Images/fatlager.jpeg";
import druvguiden from "../../../../public/Images/gronadruvklasar_i_vingard.jpeg";
import ordlista from "../../../../public/Images/vin_och_ost_bord.jpeg";
import vinatlas from "../../../../public/Images/vintradgardsbild.jpeg";

interface ExploreGuidesProps {}

const ExploreGuides = ({}: ExploreGuidesProps) => {
  return (
    <section className="layout bg-white">
      <h2 className="pb-10">Utforska våra guider</h2>

      <ul className="grid gap-3 grid-cols-2 md:grid-cols-4 md:grid-rows-2">
        <li className="md:row-span-2 ">
          <Link
            className=" relative min-h-[200px] md:min-h-[250px] h-full flex justify-center items-center"
            href="/vinskolan"
          >
            <span className=" bg-[#0000005a] absolute top-0 left-0 w-full h-full z-2"></span>
            <Image
              src={vinskolan}
              alt="bild på fatlager"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <span className="absolute x-center y-center z-3 text-white font-sub text-[22px] pb-1 border-b-2 ">
              Vinskolan
            </span>
          </Link>
        </li>
        <li className="md:row-span-2 ">
          <Link
            className=" relative min-h-[200px] md:min-h-[250px] h-full flex justify-center items-center"
            href="/vinatlas"
          >
            <span className=" bg-[#0000005a] absolute top-0 left-0 w-full h-full z-2"></span>
            <Image
              src={vinatlas}
              alt="bild på fatlager"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <span className="absolute x-center y-center z-3 text-white font-sub text-[22px] pb-1 border-b-2 ">
              Vinatlas
            </span>
          </Link>
        </li>
        <li className=" md:col-span-2">
          <Link
            className=" relative min-h-[200px] md:min-h-[250px] h-full flex justify-center items-center"
            href="/druvguiden"
          >
            <span className=" bg-[#0000005a] absolute top-0 left-0 w-full h-full z-2"></span>
            <Image
              src={druvguiden}
              alt="bild på fatlager"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <span className="absolute x-center y-center z-3 text-white font-sub text-[22px] pb-1 border-b-2 ">
              Druvguiden
            </span>
          </Link>
        </li>
        <li className="md:col-span-2">
          <Link
            className=" relative min-h-[200px] md:min-h-[250px] h-full flex justify-center items-center"
            href="/ordlistan"
          >
            <span className=" bg-[#0000005a] absolute top-0 left-0 w-full h-full z-2"></span>
            <Image
              src={ordlista}
              alt="bild på fatlager"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />
            <span className="absolute x-center y-center z-3 text-white font-sub text-[22px] pb-1 border-b-2 ">
              Ordlistan
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ExploreGuides;
