"use client";
import {
  Avbrytare,
  BcTopNav,
  DarkBcLogo,
  DarkDlLogo,
  DinSpritguideDark,
  DinSpritguideWhite,
  DlTopNav,
} from "@/components/icons";
import useRouteStyle from "@/hooks/useRouteStyle";
import Link from "next/link";

// Define an interface for the styles
interface RouteStyle {
  backgroundColor: string;
  textColor: string;
}

const TopNav = () => {
  const isDL = useRouteStyle();
  return (
    <div className="relative h-[60px] layout">
      <div
        className={`${
          isDL ? "text-[#333] bg-brand-dl" : "text-white bg-brand-primary"
        } absolute center-x flex justify-center gap-2 items-center py-4 w-full`}
      >
        <figure>
          <a
            href="https://bestchampagne.se/"
            target="_blank"
            aria-label="Besök BestChampagne.se"
          >
            {isDL ? <DarkBcLogo /> : <BcTopNav />}
          </a>
        </figure>
        <figure>
          <Avbrytare />
        </figure>
        <figure>
          <Link href="/dryckeslistan" aria-label="Gå till DryckesListan.se">
            {isDL ? <DarkDlLogo /> : <DlTopNav />}
          </Link>
        </figure>
        <figure>
          <Avbrytare />
        </figure>
        <figure>
          <a
            target="_blank"
            href="https://www.dinspritguide.se/"
            aria-label="Gå till dinspritguide.se"
          >
            {!isDL ? <DinSpritguideWhite /> : <DinSpritguideDark />}
          </a>
        </figure>
      </div>
    </div>
  );
};

export default TopNav;
