import Link from "next/link";
import druvguiden from "../../../public/Images/gronadruvklasar_i_vingard.jpeg";
import skribenter from "../../../public/Images/vinproppar_samling.jpeg";
import SectionSeparator from "./section-separator";

import vinskolan from "../../../public/Images/fatlager.jpeg";
import ordlista from "../../../public/Images/vin_glas_bilder.jpeg";
import recept from "../../../public/Images/vin_och_ost_bord.jpeg";
import vinatlas from "../../../public/Images/vintradgardsbild.jpeg";
import Image from "next/image";

const ExplorePages = () => {
  return (
    <>
      <section className="layout contain bg-white">
        <h2 className="pb-4">Utforska populära sidor</h2>
        <ul className="grid gap-4 md:auto-rows-[240px] md:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4">
          <li className="group relative md:row-span-2">
            <Link href="/skribenter" className="block h-[200px] md:h-full">
              <Image
                src={skribenter}
                alt="Samling av olika vinproppar med märkningar och illustrationer."
                width={skribenter.width}
                height={skribenter.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-0 left-0 z-10 h-full w-full bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent"></span>
              <p className="absolute top-2/4 left-2/4 z-20 -translate-x-2/4 -translate-y-2/4 font-sub text-[22px] text-white">
                Skribenter
                <span className="m-auto mt-3 flex h-[3px] w-[80%] items-center justify-center rounded-xl bg-white"></span>
              </p>
              <span className="sr-only">Utforska våra skribenter</span>
            </Link>
          </li>
          <li className="relative">
            <Link
              href="/druvguiden"
              className="group block h-[200px] md:h-full"
            >
              <Image
                src={druvguiden}
                alt="Gröna druvklasar hängande på en vinstock omgiven av vinblad."
                width={druvguiden.width}
                height={druvguiden.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-0 left-0 z-10 h-full w-full bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent"></span>
              <p className="absolute top-2/4 left-2/4 z-20 -translate-x-2/4 -translate-y-2/4 font-sub text-[22px] text-white">
                Druvguiden
                <span className="m-auto mt-3 flex h-[3px] w-[80%] items-center justify-center rounded-xl bg-white"></span>
              </p>
              <span className="sr-only">Utforska våra druvguider</span>
            </Link>
          </li>
          <li className="relative">
            <Link href="/vinatlas" className="group block h-[200px] md:h-full">
              <Image
                src={vinatlas}
                alt="En solig utsikt över en vingård med rader av vinstockar, omgivna av gröna kullar och träd."
                width={vinatlas.width}
                height={vinatlas.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-0 left-0 z-10 h-full w-full bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent"></span>
              <p className="absolute top-2/4 left-2/4 z-20 -translate-x-2/4 -translate-y-2/4 font-sub text-[22px] text-white">
                Vinatlas
                <span className="m-auto mt-3 flex h-[3px] w-[80%] items-center justify-center rounded-xl bg-white"></span>
              </p>
              <span className="sr-only">Utforska våra vinatlas</span>
            </Link>
          </li>
          <li className="relative">
            <Link href="/vinskolan" className="group block h-[200px] md:h-full">
              <Image
                src={vinskolan}
                alt="Trärader av lagringsfat med nummermärkningar i ett mörkt lager, med en belysningsstig i mitten."
                width={vinskolan.width}
                height={vinskolan.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-0 left-0 z-10 h-full w-full bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent"></span>
              <p className="absolute top-2/4 left-2/4 z-20 -translate-x-2/4 -translate-y-2/4 font-sub text-[22px] text-white">
                Vinskolan
                <span className="m-auto mt-3 flex h-[3px] w-[80%] items-center justify-center rounded-xl bg-white"></span>
              </p>
              <span className="sr-only">Utforska våra vinskolor</span>
            </Link>
          </li>
          <li className="relative">
            <Link href="/ordlistan" className="group block h-[200px] md:h-full">
              <Image
                src={ordlista}
                alt="Översikt av olika vinglas fyllda med rött, rosé och vitt vin."
                width={ordlista.width}
                height={ordlista.height}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 22vw, 395px"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-0 left-0 z-10 h-full w-full bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent"></span>
              <p className="absolute top-2/4 left-2/4 z-20 -translate-x-2/4 -translate-y-2/4 font-sub text-[22px] text-white">
                Ordlistan
                <span className="m-auto mt-3 flex h-[3px] w-[80%] items-center justify-center rounded-xl bg-white"></span>
              </p>
              <span className="sr-only">Utforska våra ordlistor</span>
            </Link>
          </li>
          <li className="relative md:col-span-2 md:row-span-1">
            <Link href="/recept" className="group block h-[200px] md:h-full">
              <Image
                src={recept}
                alt="Vinflaska, glas med rött vin, druvor och en bit ost på ett bord mot en mörk bakgrund."
                width={recept.width}
                height={recept.height}
                sizes="(max-width: 1024px) 90vw, (max-width: 1790px) 42vw, 801px"
                className="h-full w-full object-cover object-bottom"
              />
              <span className="absolute top-0 left-0 z-10 h-full w-full bg-[#0000005a] transition-all duration-300 group-hover:bg-transparent"></span>
              <p className="absolute top-2/4 left-2/4 z-20 -translate-x-2/4 -translate-y-2/4 font-sub text-[22px] text-white">
                Receptbanken
                <span className="m-auto mt-3 flex h-[3px] w-[80%] items-center justify-center rounded-xl bg-white"></span>
              </p>
              <span className="sr-only">Utforska våra recept</span>
            </Link>
          </li>
        </ul>
      </section>
      <SectionSeparator />
    </>
  );
};

export default ExplorePages;
