import Image from "next/image";
import hero from "../../public/images/top/herotop.jpg";

const HeroTop = () => {
  return (
    <div className=" mb-20 relative bg-[#F8F8F9] max-w-screen-2xl mx-auto w-[100%] min-h-[400px] lg:min-h-[547px]">
      <div className="relative h-[170px] lg:h-[547px]">
        <Image src={hero} layout="fill" objectFit="cover" alt={"Hero bild"} />
      </div>

      <div className="absolute top-[170px] lg:top-[50%] lg:-translate-y-[40%] lg:left-[128px] p-[20px]">
        <h1 className="text-[14px] lg:text-[18px] font-body">TOPPLISTOR</h1>
        <p className="font-display lg:text-[32px] text-[20px] font-bold mb-3">
          Hitta din nya favorit bland <br /> våra drycker på topplistan
        </p>
        <p className="text-[14px] lg:text-[16px] font-bold">
          I topplistorna hittar du kategorier för <br className="lg:hidden" />{" "}
          viner på flaska, <br className="hidden lg:block" /> viner på bag in
          box, <br className="lg:hidden" /> mousserande och mycket mer.
        </p>
      </div>
    </div>
  );
};

export default HeroTop;
