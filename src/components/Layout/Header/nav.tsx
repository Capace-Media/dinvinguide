"use client";

import menuItems from "@/components/Layout/MenuItems.json";
import { DvLogoBlackMini, Logo } from "@/components/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import PhoneMenu from "./PhoneMenu";

interface NavProps {}

const Nav = ({}: NavProps) => {
  const [isMenuScroll, setIsMenuScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 20) {
        setIsMenuScroll(true);
      } else {
        setIsMenuScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      className={`py-4 z-20 layout bg-white flex justify-between items-center w-full duration-75 transition-all ease-in-out ${
        isMenuScroll ? "fixed top-0 center-x bg-white shadow-lg" : "relative"
      }`}
    >
      <Link href="/" className="z-50 md:hidden block">
        <DvLogoBlackMini />
      </Link>
      <Link href="/" className="z-50  hidden md:block">
        <Logo />
      </Link>

      <ul className=" lg:flex hidden font-sub lg:gap-6 text-[19px] pr-28">
        {menuItems?.menu?.map((item: any) => {
          return (
            <li
              className="hover:text-brand-primary hover:underline"
              key={item?.id}
            >
              <Link href={item?.uri}>{item?.label}</Link>
            </li>
          );
        })}
      </ul>

      <PhoneMenu isMenuScroll={isMenuScroll} menuItems={menuItems} />

      <div className="items-center hidden space-x-2 lg:flex lg:w-24">
        <span className="w-5 lg:w-10" id="google_translate_element"></span>
      </div>
    </nav>
  );
};

export default Nav;
