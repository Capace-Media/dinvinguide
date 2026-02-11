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
import { Separator } from "@/components/ui/separator";
import useRouteStyle from "@/hooks/useRouteStyle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

const NAV_ITEMS = [
  {
    id: "bestchampagne",
    href: "https://bestchampagne.se/",
    external: true,
    ariaLabel: "Besök BestChampagne.se",
    lightIcon: BcTopNav,
    darkIcon: DarkBcLogo,
  },
  {
    id: "dryckeslistan",
    href: "/dryckeslistan",
    external: false,
    ariaLabel: "Gå till DryckesListan",
    lightIcon: DlTopNav,
    darkIcon: DarkDlLogo,
  },
  {
    id: "dinspritguide",
    href: "https://www.dinspritguide.se/",
    external: true,
    ariaLabel: "Gå till dinspritguide.se",
    lightIcon: DinSpritguideWhite,
    darkIcon: DinSpritguideDark,
  },
] as const;

const TopNav = () => {
  const isDL = useRouteStyle();

  return (
    <nav aria-label="Partner-sajter" className={cn("flex justify-center items-center", isDL ? "bg-brand-dl text-[#333]" : "bg-brand-primary text-white")}>
      <ul className="flex flex-wrap md:flex-nowrap  w-[400px] md:w-full justify-center items-center gap-3 py-3  px-2">
        {NAV_ITEMS.map((item, index) => {
          const Icon = isDL ? item.darkIcon : item.lightIcon;
          const isLast = index === NAV_ITEMS.length - 1;
          const nextToLast = index === NAV_ITEMS.length - 2;

          return (
            <Fragment key={item.id}>
              <li>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                  >
                    <Icon />
                  </a>
                ) : (
                  <Link href={item.href} aria-label={item.ariaLabel}>
                    <Icon />
                  </Link>
                )}
              </li>
              {!isLast && (
                <Separator orientation="vertical" className={cn("data-[orientation=vertical]:h-5", nextToLast ? "hidden md:block" : "", isDL ? "bg-[#333333c4]" : "")} />
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default TopNav;
