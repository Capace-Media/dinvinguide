"use client";

import { SubmitArrow } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useDebounce } from "use-debounce";

const Search = ({ word, uri }: { word?: string; uri?: string }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(word);
  const [query] = useDebounce(text, 350);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`/skribenter/${uri}`);
    } else {
      router.push(`/skribenter/${uri}?search=${query}`);
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
    <div className="relative w-full bg-white text-[14px] shadow-md">
      <input
        type="text"
        name="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="search"
        placeholder="Den som söker den finner..."
        className="w-full py-3 pl-2 focus:outline-hidden"
      />

      <button
        type="submit"
        className="center-y absolute right-2 bg-brand-secondary p-2"
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
