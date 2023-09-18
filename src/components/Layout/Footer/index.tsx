import {
  DvLogoWhiteMini,
  Email,
  Facebook,
  FacebookSm,
  Instagram,
  InstagramSm,
} from "@/components/icons";
import menuItems from "@/components/Layout/MenuItems.json";
import Link from "next/link";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <footer className=" bg-brand-primary flex flex-col w-full items-center gap-11 px-4 pt-11 text-white">
      <div className="flex flex-col text-center items-center gap-6">
        <figure>
          <DvLogoWhiteMini />
        </figure>
        <p>
          DinVinguide.se är en guide för människor som har mat, dryck, vin och
          livsnjutning som intressen. Våra namnkunniga skribenter inspirerar,
          utbildar och rapporterar om trender, nyheter och traditioner inom
          vinvärlden.
          <br />
          <br />
          Välkommen till DinVinguide.se!
        </p>
      </div>
      <div className="text-center flex flex-col items-center gap-4">
        <h2 className="font-sub text-xl">Kontakt</h2>

        <a
          href="mailto:info@dinvinguide.se"
          className="flex items-center gap-2"
        >
          <Email /> <span>info@dinvinguide.se</span>
        </a>
        <a
          href="https://www.instagram.com/dinvinguide.se/"
          target="_blank"
          className="flex items-center gap-2"
        >
          <InstagramSm /> <span>Instagram</span>
        </a>
        <a
          href="https://www.facebook.com/dinvinguide"
          target="_blank"
          className="flex items-center gap-2"
        >
          <FacebookSm /> <span>Facebook</span>
        </a>
      </div>
      <div className="flex flex-col text-center gap-5">
        <h2 className="font-sub text-xl">Information</h2>

        <ul className="flex flex-col text-center gap-2">
          {menuItems?.menu?.map((item: any) => {
            return (
              <li key={item.id}>
                <Link href={item.uri}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col text-center gap-4 items-center">
        <h2 className="font-sub text-xl">Följ oss</h2>
        <div className="flex items-center justify-center gap-4">
          <a href="https://www.instagram.com/dinvinguide.se/" target="_blank">
            <Instagram />
          </a>
          <a href="https://www.facebook.com/dinvinguide" target="_blank">
            <Facebook />
          </a>
        </div>
      </div>

      <div className="border-t-2 w-full border-white flex flex-col items-center py-4 gap-2">
        <p>2023 © Copyright - DinVinguide.se</p>
        <p className="text-[14px]">
          Byggd med ♥ av{" "}
          <a href="https://capace.se/" target="_blank">
            Capace Media
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
