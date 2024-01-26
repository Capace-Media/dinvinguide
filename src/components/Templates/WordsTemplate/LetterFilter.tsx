"use client";

import { useRouter } from "next/navigation";

interface LetterFilterProps {
  word: any;
  searchParams: { [key: string]: string | string[] | any | undefined | null };
}

const LetterFilter = ({ word, searchParams }: LetterFilterProps) => {
  const router = useRouter();

  return (
    <button
      className={`text-[22px] px-2 py-1 duration-200 lg:hover:underline ease-in-out rounded-md ${
        searchParams?.filter === word?.slug
          ? " bg-brand-secondary text-white"
          : word?.slug === "a" && searchParams?.filter === undefined
          ? "bg-brand-secondary text-white"
          : ""
      }`}
      onClick={() => {
        router.push(`/ordlistan?filter=${word.slug}`, {
          scroll: false,
        });
      }}
    >
      {word.name}
    </button>
  );
};

export default LetterFilter;
