import Image from "next/image";

import dynamic from "next/dynamic";
import vingard from "../../../../public/Images/gronadruvklasar_i_vingard.jpeg";

const NewsletterForm = dynamic(() => import("./NewletterForm"), {
  ssr: false,
});

export default function Newsletter() {
  return (
    <section className="">
      <div className="bg-white h-2 md:h-6 lg:h-10 layout"></div>
      <div className="contain layout bg-[#F6F6F6] grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20">
        <div className="relative h-[300px] lg:h-[482px]">
          <div className=" bg-brand-primary h-[224px] lg:h-[410px] w-[80%] absolute top-0 left-0"></div>
          <div className=" bg-white h-[224px] lg:h-[410px] w-[80%] absolute bottom-0 right-0">
            <div className="w-full h-full relative">
              <Image
                src={vingard}
                alt="Bild på en vinranka med vindruvor"
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1880px) 615px, (min-width: 1040px) calc(35.98vw - 54px), (min-width: 780px) calc(40vw - 61px), calc(80vw - 26px)"
              />
            </div>
          </div>
        </div>

        <NewsletterForm />
      </div>
      <div className="bg-white h-2 md:h-6 lg:h-10 layout"></div>
    </section>
  );
}
