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
} from "@/components/ui/navigation-menu"
import { SearchIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import useScrollPastThreshold from "@/hooks/use-scroll-past-threshold";


export default function Header() {
  const isMenuScroll = useScrollPastThreshold(44);
  return (
    <header className="h-[121px] m-auto xl:max-w-444.25 bg-white">
      <TopNav />
      {/* Main nav sticks to top when scrolling past TopNav */}
      <nav className={cn(isMenuScroll ? "fixed z-50 top-0 center-x bg-white shadow-lg" : "absolute center-x",
        "grid grid-cols-3 w-full py-3 layout",
        "border-b border-white/10 bg-white/90 shadow-sm backdrop-blur-sm"
      )}>
        <div className="flex items-center pt-1">

          <Link
            href="/"

          >
            <DvLogoBlackMini />
            <span className="sr-only">Gå till startsidan</span>
          </Link>
        </div>

        <div className="md:flex hidden md:items-center md:justify-center">

          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.menu.map((item) => (

                <NavigationMenuItem key={item.id}>

                  <NavigationMenuLink asChild className={cn("text-base font-sub hover:underline")}>
                    <Link href={item.uri}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className=" flex items-center justify-end gap-2 col-span-2 md:col-span-1">
          <div className="md:flex items-center hidden">
            <span className="overflow-hidden" id="google_translate_element"></span>
            <span className="sr-only">Google Translate</span>
          </div>
          <Link href="/sok" aria-label="gå till sök sidan" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
            <SearchIcon />
            <span className="sr-only">Gå till sök sidan</span>
          </Link>

          <MobileMenu menuItems={menuItems.menu} />
        </div>

      </nav>

    </header>
  );
};

