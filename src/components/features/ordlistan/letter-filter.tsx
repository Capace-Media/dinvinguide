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
      className={`text-[22px] px-2 py-1 duration-200 lg:hover:underline ease-in-out rounded-md ${
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
