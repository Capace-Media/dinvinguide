import Link from "next/link";
import druvguiden from "../../../../public/Images/gronadruvklasar_i_vingard.jpeg";
import skribenter from "../../../../public/Images/vinproppar_samling.jpeg";
import Separater from "../Separater";
import HandleImage from "../image";

import vinskolan from "../../../../public/Images/fatlager.jpeg";
import ordlista from "../../../../public/Images/vin_glas_bilder.jpeg";
import recept from "../../../../public/Images/vin_och_ost_bord.jpeg";
import vinatlas from "../../../../public/Images/vintradgardsbild.jpeg";
interface ExplorePagesProps {}

const ExplorePages = ({}: ExplorePagesProps) => {
  return (
    <>
      <section className="layout contain bg-white ">
        <h2 className="heading">Utforska populära sidor</h2>
        <div className="grid md:grid-cols-4 md:grid-rows-2 grid-row-4 grid-cols-2 md:h-[60vh] h-[95vh] gap-4">
          <Link href="/skribenter" className="row-span-2 relative">
            <HandleImage
              srcProp={skribenter}
              altProp="Samling av olika vinproppar med märkningar och illustrationer."
              classesProp="relative w-[100%] h-[100%] explore-overlay"
              objectFitProp="cover"
              sizesProp="(min-width: 1880px) 392px, (min-width: 1040px) calc(22.44vw - 25px), (min-width: 780px) calc(25vw - 34px), calc(25vw - 20px)"
            />
            <p className="absolute  center text-white font-sub text-[22px]">
              Skribenter
              <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
            </p>
          </Link>
          <Link href="/druvguiden" className="relative">
            <HandleImage
              srcProp={druvguiden}
              altProp="Gröna druvklasar hängande på en vinstock omgiven av vinblad."
              classesProp="relative w-[100%] h-[100%] explore-overlay"
              objectFitProp="cover"
              sizesProp="(min-width: 1880px) 392px, (min-width: 1040px) calc(22.44vw - 25px), (min-width: 780px) calc(25vw - 34px), calc(25vw - 20px)"
            />
            <p className="absolute  center text-white font-sub text-[22px]">
              Druvguiden
              <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
            </p>
          </Link>
          <Link href="/vinatlas" className="relative">
            <HandleImage
              srcProp={vinatlas}
              altProp="En solig utsikt över en vingård med rader av vinstockar, omgivna av gröna kullar och träd."
              classesProp="relative w-[100%] h-[100%] explore-overlay"
              objectFitProp="cover"
              sizesProp="(min-width: 1880px) 392px, (min-width: 1040px) calc(22.44vw - 25px), (min-width: 780px) calc(25vw - 34px), calc(25vw - 20px)"
            />
            <p className="absolute  center text-white font-sub text-[22px]">
              Vinatlas
              <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
            </p>
          </Link>
          <Link href="/vinskolan" className="relative">
            <HandleImage
              srcProp={vinskolan}
              altProp="Trärader av lagringsfat med nummermärkningar i ett mörkt lager, med en belysningsstig i mitten."
              classesProp="relative w-[100%] h-[100%] explore-overlay"
              objectFitProp="cover"
              sizesProp="(min-width: 1880px) 392px, (min-width: 1040px) calc(22.44vw - 25px), (min-width: 780px) calc(25vw - 34px), calc(25vw - 20px)"
            />
            <p className="absolute  center text-white font-sub text-[22px]">
              Vinskolan
              <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
            </p>
          </Link>
          <Link href="/ordlistan" className="relative">
            <HandleImage
              srcProp={ordlista}
              altProp="Översikt av olika vinglas fyllda med rött, rosé och vitt vin."
              classesProp="relative w-[100%] h-[100%] explore-overlay"
              objectFitProp="cover"
              sizesProp="(min-width: 1880px) 392px, (min-width: 1040px) calc(22.44vw - 25px), (min-width: 780px) calc(25vw - 34px), calc(25vw - 20px)"
            />
            <p className="absolute  center text-white font-sub text-[22px]">
              Ordlistan
              <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
            </p>
          </Link>
          <Link href="/recept" className="col-span-2 relative">
            <HandleImage
              srcProp={recept}
              altProp="Vinflaska, glas med rött vin, druvor och en bit ost på ett bord mot en mörk bakgrund."
              classesProp="relative w-[100%] h-[100%] explore-overlay"
              objectFitProp="cover"
              sizesProp="(min-width: 1880px) 801px, (min-width: 1040px) calc(45vw - 36px), (min-width: 780px) calc(50vw - 52px), calc(50vw - 24px)"
              objectPositionProp="bottom"
            />
            <p className="absolute  center text-white font-sub text-[22px]">
              Receptbanken
              <span className="w-[80%] mt-3 h-[3px] rounded-xl bg-white flex justify-center items-center m-auto "></span>
            </p>
          </Link>
        </div>
      </section>
      <Separater />
    </>
  );
};

export default ExplorePages;
