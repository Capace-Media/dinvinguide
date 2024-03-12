import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";

interface DrinkTipsHeroProps {
  data: any;
}

const DrinkTipsHero = ({ data }: DrinkTipsHeroProps) => {
  return (
    <>
      <div className="layout w-full py-[73px] md:pt-[172px] bg-white">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-[180px] order-last md:order-first">
          <div className="flex flex-col justify-between gap-2 lg:min-h-[461px]">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-6 ">
                <div className="text-[14px]">
                  <p>Dryckestips</p>

                  {data?.page_content?.intro ? (
                    handleParse(data?.page_content?.intro)
                  ) : data?.acf_grape?.kortBeskrivning ? (
                    <>
                      <h1>{data?.title}</h1>
                      <p>{data?.acf_grape?.kortBeskrivning}</p>
                    </>
                  ) : (
                    <h1>{data?.title}</h1>
                  )}
                </div>
              </div>

              <menu className="flex flex-wrap gap-3 pt-4">
                <li className="border-b-2 border-brand-primary">
                  <Link
                    className="uppercase bg-brand-primary text-white py-[6.5px] px-[12px] text-[14px]"
                    href="/dryckeslistan"
                  >
                    dryckeslistan
                  </Link>
                </li>
                <li className="border-b-2 border-brand-primary">
                  <Link
                    className="uppercase text-brand-primary text-[14px]"
                    href="/dryckesutforskaren"
                  >
                    Dryckesutforskaren
                  </Link>
                </li>
                <li className="border-b-2 border-brand-primary">
                  <Link
                    className="uppercase text-brand-primary text-[14px]"
                    href="/recept/receptbanken"
                  >
                    Receptbanken
                  </Link>
                </li>
              </menu>
            </div>
          </div>

          <div className="w-full  order-first h-[370px] relative md:order-last lg:h-[520px]">
            <div className="absolute w-[95%] center-y left-0 h-[300px] lg:h-[430px] z-10">
              <div className="relative w-full h-full shadow-xl bg-brand-secondary flex p-4 lg:p-8">
                <div className=" lg:w-[55%] w-full h-full lg:pr-8">
                  <h2 className="text-white flex flex-col border-b-2 pb-3 lg:pb-6">
                    <span className="text-[12px] font-main uppercase">
                      betygsskala
                    </span>
                    <span className="text-[22px] lg:text-[26px]">
                      Vad betyder betygen?
                    </span>
                  </h2>
                  <ul className="text-white lg:pt-6 pt-3 flex flex-col gap-2 lg:gap-4">
                    <li className="flex justify-between items-center">
                      <span className="font-sub">96-100</span>
                      <span>Exceptionellt</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-sub">90-95</span>
                      <span>Enastående</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-sub">80-89</span>
                      <span>Mycket bra - fynd</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-sub">70-79</span>
                      <span>Medel - prisvärt</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-sub">60-69</span>
                      <span>Under medel</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-sub">50-59</span>
                      <span>Oacceptabelt</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white w-[45%] relative h-full hidden lg:block">
                  <Image
                    src="/images/dryckestipbetyg.jpg"
                    alt="bild från DinVinguide"
                    fill
                    sizes="(min-width: 1860px) 278px, calc(19.63vw - 83px)"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
            <div className=" bg-brand-beige w-[85%] md:w-[100%] h-[100%] center-y absolute -right-4 md:-right-11 lg:-right-20">
              {data?.featuredImage?.node?.mediaItemUrl && (
                <Image
                  src={data?.featuredImage?.node?.mediaItemUrl}
                  alt={
                    data?.featuredImage?.node?.altText
                      ? data?.featuredImage?.node?.altText
                      : "Bild från DinVinguide"
                  }
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="(min-width: 1880px) 687px, (min-width: 1040px) calc(38.17vw - 23px), (min-width: 780px) calc(42.5vw - 38px), (min-width: 380px) calc(85vw - 27px), calc(25vw + 189px)"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrinkTipsHero;
