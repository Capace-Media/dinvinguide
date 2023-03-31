import { useEffect, useState } from "react";

const useResized = (size) => {
  const [isSm, setSm] = useState(false);

  const sizeValue = size;

  const handleResize = (ref) => {
    if (ref?.innerWidth < sizeValue) {
      setSm(true);
    } else {
      setSm(false);
    }
    return () => {
      setSm(false);
    };
  };

  useEffect(() => {
    if (window?.innerWidth < sizeValue) {
      setSm(true);
    } else {
      setSm(false);
    }
    window.addEventListener("resize", () => handleResize(window));
    return () => removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSm]);

  return isSm;
};

export default useResized;
