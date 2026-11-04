"use client";
import Image from "next/image";

import dynamic from "next/dynamic";
import vingard from "../../../../public/Images/gronadruvklasar_i_vingard.jpeg";

const NewsletterForm = dynamic(() => import("./newsletter-form"), {
  ssr: false,
});

export default function Newsletter() {
  return (
    <section className="">
      <div className="layout h-2 bg-white md:h-6 lg:h-10"></div>
      <div className="contain layout grid gap-10 bg-[#F6F6F6] md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="relative h-[300px] lg:h-[482px]">
          <div className="absolute top-0 left-0 h-[224px] w-[80%] bg-brand-primary lg:h-[410px]"></div>
          <div className="absolute right-0 bottom-0 h-[224px] w-[80%] bg-white lg:h-[410px]">
            <div className="relative h-full w-full">
              <Image
                unoptimized
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
      <div className="layout h-2 bg-white md:h-6 lg:h-10"></div>
    </section>
  );
}
