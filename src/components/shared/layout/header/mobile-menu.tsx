"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  menuItems: {
    label: string;
    uri: string;
    id?: string;
  }[];
};

export default function MobileMenu({ menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          render={
            <Button variant="ghost" size="icon-lg" className="cursor-pointer" />
          }
        >
          <div className="relative size-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isOpen ? "top-2.5 rotate-45" : "top-1"
              }`}
            ></span>
            <span
              className={`absolute top-2.5 left-0 block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isOpen ? "top-2.5 -rotate-45" : "top-4"
              }`}
            ></span>
          </div>
          <span className="sr-only">
            {isOpen ? "Stäng menyn" : "Öppna menyn"}
          </span>
        </PopoverTrigger>
        <PopoverContent className="h-screen w-screen bg-white/90 shadow-sm backdrop-blur-sm">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item.id || item.label}>
                <Link
                  className="text-2xl hover:underline"
                  href={item.uri}
                  aria-label={`Gå till ${item.label} sidan`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="flex items-center gap-2 text-2xl hover:underline"
                href="/sok"
                aria-label="gå till sök sidan"
              >
                <SearchIcon /> Sök
              </Link>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
