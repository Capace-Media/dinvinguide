"use client";

import type alphabet from "@/json/alphabet.json";
import { useRouter } from "next/navigation";

interface LetterFilterProps {
  letter: (typeof alphabet)[number];
  activeFilter?: string;
}

const LetterFilter = ({ letter, activeFilter }: LetterFilterProps) => {
  const router = useRouter();
  const isActive =
    activeFilter === letter.slug ||
    (letter.slug === "a" && activeFilter === undefined);

  return (
    <button
      className={`rounded-md px-2 py-1 text-[22px] duration-200 ease-in-out lg:hover:underline ${
        isActive ? "bg-brand-secondary text-white" : ""
      }`}
      onClick={() => {
        router.push(`/ordlistan?filter=${letter.slug}`, {
          scroll: false,
        });
      }}
    >
      {letter.name}
    </button>
  );
};

export default LetterFilter;
