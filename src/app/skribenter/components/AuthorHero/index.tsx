"use client";
import Image from "next/image";

import handleParse from "@/lib/utils/handleParse";
import heroImage from "../../../../../public/Images/Vinsamling-korkar.jpeg";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

interface AuthorHeroProps {
  promise?: any;
}

export default function AuthorHero({ promise }: AuthorHeroProps) {
  const [data, setData] = useState(promise);

  useEffect(() => {
    setData(promise);
  }, [promise]);

  const scrollToArticles = () => {
    const articles = document.getElementById("articles");
    if (articles) {
      const offset = 100;
      const top =
        articles.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="layout bg-white">
      <div className="relative h-199.75 overflow-hidden text-brand-dark lg:h-177.75">
        <div className="relative h-93 bg-brand-primary after:absolute after:inset-0 after:bg-[#15151599] lg:h-127.75">
          <Image
            src={heroImage}
            alt="Samling av vinflaskkorkar med olika märken och tryck, perfekt för vinälskare i Sverige."
            fill
            style={{
              objectFit: "cover",
            }}
          />
          <div className="center-x absolute -bottom-[30%] z-10 h-[50%] w-[200%] rotate-[8deg] bg-white lg:rotate-[7deg]"></div>
        </div>

        <div className="center-x absolute top-[13%] z-10 flex h-163.75 w-[89%] flex-col gap-8 bg-white p-2 shadow-lg lg:top-[50%] lg:h-127.75 lg:w-[85%] lg:-translate-y-[40%] lg:flex-row lg:p-4">
          <div className="relative aspect-square min-w-[36%]">
            {data?.acf_user?.bild?.mediaItemUrl && (
              <Image
                src={data.acf_user.bild.mediaItemUrl}
                alt={
                  data?.acf_user?.bild?.altText
                    ? data.acf_user.bild.altText
                    : `bild på ${data?.name}`
                }
                width={data?.acf_user?.bild?.mediaDetails?.width}
                height={data?.acf_user?.bild?.mediaDetails?.height}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-col justify-between pt-4">
            <div>
              <h1 className="flex flex-col font-sub text-[28px] md:text-[42px] lg:text-[53px] lg:leading-18">
                <span className="font-main text-[18px] leading-4.5 md:text-[23px] md:leading-5.75">
                  Skribent
                </span>
                <span className="block">{data?.name}</span>
              </h1>
              <div className="line-clamp-14 max-w-2xl text-[14px] leading-5.75">
                {handleParse(data?.description)}
              </div>
            </div>
            <div>
              <Button onClick={scrollToArticles}>
                Utforska {data?.firstName}s artiklar <ArrowDown />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
