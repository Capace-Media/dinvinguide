"use client";
import {
  DarkDvgLogo,
  DarkEmail,
  DarkFacebook,
  DarkInstagram,
  DvLogoWhiteMini,
  Email,
  Facebook,
  FacebookSm,
  Instagram,
  InstagramSm,
} from "@/components/icons";
import menuItems from "@/components/Layout/MenuItems.json";
import useRouteStyle from "@/hooks/useRouteStyle";
import Link from "next/link";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  const isDL = useRouteStyle();

  return (
    <footer
      className={`relative z-10 layout pt-11 ${
        isDL ? "text-[#333] bg-brand-dl" : "text-white bg-brand-primary"
      }`}
    >
      <div className="flex flex-col lg:flex-row w-full lg:items-baseline items-center gap-11 lg:gap-20 py-11">
        <div className="flex flex-col text-center lg:items-start lg:text-start items-center lg:w-[40%] gap-6">
          <figure>{isDL ? <DarkDvgLogo /> : <DvLogoWhiteMini />}</figure>
          <p className={`${isDL ? "text-[#333]" : "text-white"}`}>
            DinVinguide.se är en guide för människor som har mat, dryck, vin och
            livsnjutning som intressen. Våra namnkunniga skribenter inspirerar,
            utbildar och rapporterar om trender, nyheter och traditioner inom
            vinvärlden.
            <br />
            <br />
            Välkommen till DinVinguide.se!
          </p>
        </div>
        <div className="text-center flex flex-col lg:items-start lg:text-start items-center gap-4 lg:w-[20%]">
          <h2
            className={`font-sub text-xl ${
              isDL ? "text-[#333]" : "text-white"
            }`}
          >
            Kontakt
          </h2>

          <a
            href="mailto:info@dinvinguide.se"
            className={`flex items-center gap-2 ${
              isDL ? "text-[#333]" : "text-white"
            }`}
            aria-label="Skicka mail till info@dinvinguide.se"
          >
            {isDL ? <DarkEmail /> : <Email />}

            <span className={`${isDL ? "text-[#333]" : "text-white"}`}>
              info@dinvinguide.se
            </span>
          </a>
          <a
            href="https://www.instagram.com/dinvinguide.se/"
            target="_blank"
            className={`flex items-center gap-2 ${
              isDL ? "text-[#333]" : "text-white"
            }`}
            aria-label="besök vår Instagram"
          >
            {isDL ? <DarkInstagram /> : <InstagramSm />}
            <span>Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/dinvinguide"
            target="_blank"
            className={`flex items-center gap-2 ${
              isDL ? "text-[#333]" : "text-white"
            }`}
            aria-label="besök vår facebook"
          >
            {isDL ? <DarkFacebook /> : <FacebookSm />}
            <span>Facebook</span>
          </a>
        </div>
        <div className="flex flex-col text-center gap-5 lg:items-start lg:text-start lg:w-[20%]">
          <h2
            className={`font-sub text-xl ${
              isDL ? "text-[#333]" : "text-white"
            }`}
          >
            Information
          </h2>

          <ul className="flex flex-col lg:text-start text-center gap-2">
            {menuItems?.menu?.map((item: any) => {
              return (
                <li
                  className={`${isDL ? "text-[#333]" : "text-white"}`}
                  key={item.id}
                >
                  <Link
                    className={`${isDL ? "text-[#333]" : "text-white"}`}
                    href={item.uri}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col text-center gap-4 items-center lg:items-start lg:text-start lg:w-[20%]">
          <h2
            className={`font-sub text-xl ${
              isDL ? "text-[#333]" : "text-white"
            }`}
          >
            Följ oss
          </h2>
          <div className="flex items-center justify-center gap-4">
            <a
              className={`${isDL ? "text-[#333]" : "text-white"}`}
              href="https://www.instagram.com/dinvinguide.se/"
              target="_blank"
              aria-label="besök vår Instagram"
            >
              {isDL ? <DarkInstagram className="scale-150" /> : <Instagram />}
            </a>
            <a
              className={`${isDL ? "text-[#333]" : "text-white"}`}
              href="https://www.facebook.com/dinvinguide"
              target="_blank"
              aria-label="besök vår facebook"
            >
              {isDL ? <DarkFacebook className="scale-150" /> : <Facebook />}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`"border-t-2 w-full border-white flex flex-col lg:flex-row lg:justify-between items-center py-4 gap-2`}
      >
        <p className={`${isDL ? "text-[#333]" : "text-white"}`}>
          2023 © Copyright - DinVinguide.se
        </p>
        <p className={`${isDL ? "text-[#333]" : "text-white"} text-[14px]`}>
          Byggd med ♥ av{" "}
          <a
            href="https://capace.se/"
            className={`${isDL ? "text-[#333]" : "text-white"}`}
            target="_blank"
          >
            Capace Media
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
