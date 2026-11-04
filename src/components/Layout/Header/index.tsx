"use client";
import { DvLogoBlackMini } from "@/components/icons";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import menuItems from "@/components/Layout/MenuItems.json";
import { cn } from "@/lib/utils";
import TopNav from "./topnav";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SearchIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import useScrollPastThreshold from "@/hooks/use-scroll-past-threshold";

export default function Header() {
  const isMenuScroll = useScrollPastThreshold(44);
  return (
    <header className="m-auto h-[121px] bg-white xl:max-w-444.25">
      <TopNav />
      {/* Main nav sticks to top when scrolling past TopNav */}
      <nav
        className={cn(
          isMenuScroll
            ? "center-x fixed top-0 z-50 bg-white shadow-lg"
            : "center-x absolute",
          "layout grid w-full grid-cols-3 py-3",
          "border-b border-white/10 bg-white/90 shadow-sm backdrop-blur-sm",
        )}
      >
        <div className="flex items-center pt-1">
          <Link href="/">
            <DvLogoBlackMini />
            <span className="sr-only">Gå till startsidan</span>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.menu.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink
                    render={<Link href={item.uri} />}
                    className={cn("font-sub text-base hover:underline")}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="col-span-2 flex items-center justify-end gap-2 md:col-span-1">
          <div className="hidden items-center md:flex">
            <span
              className="overflow-hidden"
              id="google_translate_element"
            ></span>
            <span className="sr-only">Google Translate</span>
          </div>
          <Link
            href="/sok"
            aria-label="gå till sök sidan"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
          >
            <SearchIcon />
            <span className="sr-only">Gå till sök sidan</span>
          </Link>

          <MobileMenu menuItems={menuItems.menu} />
        </div>
      </nav>
    </header>
  );
}
