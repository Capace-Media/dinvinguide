import Image from "next/image";
import Link from "next/link";
import DVLogoFooter from "../../public/images/dv-logo-footer.png";
import { DarkLogo, Email, FbLg, FbSm, IgLg, IgSm } from "../icons";
export default function Footer() {
  return (
    <footer className="pt-20 pb-7 text-center font-body bg-[#E1E5D4] text-black">
      <div className="contain mb-10 lg:grid lg:grid-cols-5 lg:gap-10">
        <div className="mb-10 lg:col-span-2">
          <div className="flex justify-center lg:justify-start">
            <DarkLogo />
          </div>

          <div className="text-center lg:text-left">
            <p className="max-w-5xl text-[14px] mx-auto mt-5 flex flex-col gap-5">
              DinVinguide.se är en guide för människor som har mat, dryck, vin
              och livsnjutning som intressen. Våra namnkunniga skribenter
              inspirerar, utbildar och rapporterar om trender, nyheter och
              traditioner inom vinvärlden.
              <span>Välkommen till DinVinguide.se!</span>
            </p>
          </div>
        </div>

        <div className="mb-10">
          <a
            href="https://winepublishing.se"
            className="inline-block lg:flex text-[18px] mt-10 lg:mt-0 mb-5 font-bold font-display"
            rel="noreferrer"
            target="_blank"
          >
            Kontakta oss
          </a>

          <ul className="flex flex-col gap-2">
            <li>
              <a
                className="flex items-center lg:justify-start gap-3 justify-center"
                href="mailto:info@dinvinguide.se"
                target="_blank"
                rel="noreferrer"
              >
                <Email /> <span>info@dinvinguide.se</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center lg:justify-start gap-3 justify-center"
                href="https://www.facebook.com/dinvinguide"
                target="_blank"
                rel="noreferrer"
              >
                <FbSm /> <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center lg:justify-start gap-3 justify-center"
                href="https://www.instagram.com/dinvinguide.se/"
                target="_blank"
                rel="noreferrer"
              >
                <IgSm /> <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-10">
          <p className="font-display lg:flex font-bold text-[18px] mb-3">
            Information
          </p>
          <ul className="flex flex-col lg:justify-start lg:items-start gap-2">
            <li>
              <Link href="/dryckeslistan">
                <a>Topplistor</a>
              </Link>
            </li>
            <li>
              <Link href="/recept">
                <a>Recept</a>
              </Link>
            </li>
            <li>
              <Link href="/guide">
                <a>Guide</a>
              </Link>
            </li>
            <li>
              <Link href="/skribenter">
                <a>Skribenter</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-10">
          <p className="font-display lg:flex font-bold text-[18px] mb-3">
            Följ oss
          </p>

          <ul className="flex justify-center lg:justify-start items-center gap-4">
            <li>
              <a
                className="flex items-center gap-3 justify-center"
                href="https://www.instagram.com/dinvinguide.se/"
                target="_blank"
                rel="noreferrer"
              >
                <IgLg />
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 justify-center"
                href="https://www.facebook.com/dinvinguide"
                target="_blank"
                rel="noreferrer"
              >
                <FbLg />
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center text-[12px] border-t-2 border-black mx-5 lg:mx-0 pt-5 lg:col-span-5 lg:flex-row lg:justify-between">
          <div className="">
            {new Date().getFullYear()} © Copyright - DinVinguide.se
          </div>

          <div className="">
            Byggd med ♥ av{" "}
            <a
              className="underline"
              target="_blank"
              rel="noreferrer"
              href="https://capace.se/"
            >
              Capace Media
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
