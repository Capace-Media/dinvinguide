"use client";

import { SubmitArrow } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useDebounce } from "use-debounce";

const Search = ({ search }: { search?: string }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 350);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`/skribenter/fredrikschelin`);
    } else {
      router.push(`/skribenter/fredrikschelin?search=${query}`);
    }
  }, [query]);

  const scrollWithSearch = () => {
    const element = document.getElementById("searchScroll");
    if (element) {
      // Scroll to the element and adjust for the 100px offset
      window.scrollTo({
        top: element.offsetTop - 160,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full text-[14px] bg-white relative shadow-md">
      <input
        type="text"
        name="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="search"
        placeholder="Den som söker den finner..."
        className="py-3 pl-2 w-full focus:outline-none"
      />

      <button
        type="submit"
        className=" bg-brand-secondary p-2 absolute right-2 center-y"
        onClick={() => {
          scrollWithSearch();
        }}
      >
        <SubmitArrow />
      </button>
    </div>
  );
};

export default Search;
