"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="pointer">
          <div className="relative size-6">
            <span
              className={`bg-foreground absolute left-0 block h-0.5 w-6 transition-all duration-300 ${
                isOpen ? "top-2.5 rotate-45" : "top-1"
              }`}
            ></span>
            <span
              className={`bg-foreground absolute left-0 block h-0.5 w-6 transition-all duration-300 top-2.5 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-foreground absolute left-0 block h-0.5 w-6 transition-all duration-300 ${
                isOpen ? "top-2.5 -rotate-45" : "top-4"
              }`}
            ></span>
          </div>
          <span className="sr-only">
            {isOpen ? "Stäng menyn" : "Öppna menyn"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen h-screen ">
        <ul className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <li key={item.id || item.label}>
              <Link
                className="text-2xl hover:underline "
                href={item.uri}
                aria-label={`Gå till ${item.label} sidan`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
