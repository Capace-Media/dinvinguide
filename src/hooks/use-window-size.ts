import { useEffect, useState } from "react";

function useWindowSize() {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // Set up event listener
    window.addEventListener("resize", handleResize);

    // Call once to set initial value
    handleResize();

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default useWindowSize;
