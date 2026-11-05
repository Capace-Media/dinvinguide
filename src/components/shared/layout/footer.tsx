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
import menuItems from "@/components/shared/layout/menu-items.json";
import useRouteStyle from "@/hooks/useRouteStyle";
import Link from "next/link";

const Footer = () => {
  const isDL = useRouteStyle();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`layout relative z-10 pt-11 ${
        isDL ? "bg-brand-dl text-[#333]" : "bg-brand-primary text-white"
      }`}
    >
      <div className="flex w-full flex-col items-center gap-11 py-11 lg:flex-row lg:items-baseline lg:gap-20">
        <div className="flex flex-col items-center gap-6 text-center lg:w-[40%] lg:items-start lg:text-start">
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
        <div className="flex flex-col items-center gap-4 text-center lg:w-[20%] lg:items-start lg:text-start">
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
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
          >
            {isDL ? <DarkFacebook /> : <FacebookSm />}
            <span>Facebook</span>
          </a>
        </div>
        <div className="flex flex-col gap-5 text-center lg:w-[20%] lg:items-start lg:text-start">
          <h2
            className={`font-sub text-xl ${
              isDL ? "text-[#333]" : "text-white"
            }`}
          >
            Information
          </h2>

          <ul className="flex flex-col gap-2 text-center lg:text-start">
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

        <div className="flex flex-col items-center gap-4 text-center lg:w-[20%] lg:items-start lg:text-start">
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
              rel="noopener noreferrer"
            >
              {isDL ? <DarkInstagram className="scale-150" /> : <Instagram />}
            </a>
            <a
              className={`${isDL ? "text-[#333]" : "text-white"}`}
              href="https://www.facebook.com/dinvinguide"
              target="_blank"
              aria-label="besök vår facebook"
              rel="noopener noreferrer"
            >
              {isDL ? <DarkFacebook className="scale-150" /> : <Facebook />}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`flex w-full flex-col items-center gap-2 border-t-2 border-white py-4 lg:flex-row lg:justify-between`}
      >
        <p className={`${isDL ? "text-[#333]" : "text-white"}`}>
          {currentYear} © Copyright - DinVinguide.se
        </p>
        <p className={`${isDL ? "text-[#333]" : "text-white"} text-[14px]`}>
          Byggd med ♥ av{" "}
          <a
            href="https://capace.se/"
            className={`${isDL ? "text-[#333]" : "text-white"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Capace Media
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
