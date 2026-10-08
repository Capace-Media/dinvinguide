import Link from "next/link";
import druvguiden from "../../../../public/Images/gronadruvklasar_i_vingard.jpeg";
import skribenter from "../../../../public/Images/vinproppar_samling.jpeg";
import Separater from "../Separater";

import vinskolan from "../../../../public/Images/fatlager.jpeg";
import ordlista from "../../../../public/Images/vin_glas_bilder.jpeg";
import recept from "../../../../public/Images/vin_och_ost_bord.jpeg";
import vinatlas from "../../../../public/Images/vintradgardsbild.jpeg";
import Image from "next/image";
interface ExplorePagesProps {}

const ExplorePages = ({}: ExplorePagesProps) => {
  return (
    <>
      <section className="layout contain  bg-white">
        <h2 className="pb-4">Utforska populära sidor</h2>
        <ul className="grid gap-4 md:grid-cols-2 md:auto-rows-[240px] lg:grid-cols-4 lg:auto-rows-[260px] ">
          <li className="relative md:row-span-2 group">
            <Link href="/skribenter" className="block h-[200px] md:h-full">
              <Image
                src={skribenter}
                alt="Samling av olika vinproppar med märkningar och illustrationer."
                width={skribenter.width}
                height={skribenter.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="w-full h-full object-cover"
              />
              <span className=" bg-[#0000005a] group-hover:bg-transparent transition-all duration-300 absolute top-0 left-0 w-full h-full z-10"></span>
              <p className="z-20 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-sub text-[22px]">
                Skribenter
                <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
              </p>
              <span className="sr-only">Utforska våra skribenter</span>
            </Link>
          </li>
          <li className="relative">
            <Link
              href="/druvguiden"
              className="block h-[200px] md:h-full group"
            >
              <Image
                src={druvguiden}
                alt="Gröna druvklasar hängande på en vinstock omgiven av vinblad."
                width={druvguiden.width}
                height={druvguiden.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="w-full h-full object-cover"
              />
              <span className=" bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent absolute top-0 left-0 w-full h-full z-10"></span>
              <p className="z-20  absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-sub text-[22px]">
                Druvguiden
                <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
              </p>
              <span className="sr-only">Utforska våra druvguider</span>
            </Link>
          </li>
          <li className="relative">
            <Link href="/vinatlas" className="block h-[200px] md:h-full group">
              <Image
                src={vinatlas}
                alt="En solig utsikt över en vingård med rader av vinstockar, omgivna av gröna kullar och träd."
                width={vinatlas.width}
                height={vinatlas.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="w-full h-full object-cover"
              />
              <span className=" bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent absolute top-0 left-0 w-full h-full z-10"></span>
              <p className="z-20  absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-sub text-[22px]">
                Vinatlas
                <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
              </p>
              <span className="sr-only">Utforska våra vinatlas</span>
            </Link>
          </li>
          <li className="relative">
            <Link href="/vinskolan" className="block h-[200px] md:h-full group">
              <Image
                src={vinskolan}
                alt="Trärader av lagringsfat med nummermärkningar i ett mörkt lager, med en belysningsstig i mitten."
                width={vinskolan.width}
                height={vinskolan.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="w-full h-full object-cover"
              />
              <span className=" bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent absolute top-0 left-0 w-full h-full z-10"></span>
              <p className="z-20  absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-sub text-[22px]">
                Vinskolan
                <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
              </p>
              <span className="sr-only">Utforska våra vinskolor</span>
            </Link>
          </li>
          <li className="relative">
            <Link href="/ordlistan" className="block h-[200px] md:h-full group">
              <Image
                src={ordlista}
                alt="Översikt av olika vinglas fyllda med rött, rosé och vitt vin."
                width={ordlista.width}
                height={ordlista.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="w-full h-full object-cover"
              />
              <span className=" bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent absolute top-0 left-0 w-full h-full z-10"></span>
              <p className="z-20  absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-sub text-[22px]">
                Ordlistan
                <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
              </p>
              <span className="sr-only">Utforska våra ordlistor</span>
            </Link>
          </li>
          <li className="relative md:col-span-2 md:row-span-1">
            <Link href="/recept" className="block h-[200px] md:h-full group">
              <Image
                src={recept}
                alt="Vinflaska, glas med rött vin, druvor och en bit ost på ett bord mot en mörk bakgrund."
                width={recept.width}
                height={recept.height}
                sizes="(max-width: 1024px) 90vw, (max-width: 1790px) 42vw, 801px"
                className="w-full h-full object-cover object-bottom"
              />
              <span className=" bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent absolute top-0 left-0 w-full h-full z-10"></span>
              <p className="z-20  absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-sub text-[22px]">
                Receptbanken
                <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
              </p>
              <span className="sr-only">Utforska våra recept</span>
            </Link>
          </li>
        </ul>
      </section>
      <Separater />
    </>
  );
};

export default ExplorePages;
