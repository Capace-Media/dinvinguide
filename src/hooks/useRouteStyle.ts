import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useRouteStyle = (): boolean => {
  const path = usePathname();
  const [isDL, setDL] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if the path is one of the specific routes
    const checkPath = () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        return [
          "/dryckeslistan",
          "/drycker",
          "/topplistan",
          "/dryckesutforskaren",
          "/topplistor",
        ].includes(path);
      }
      return false;
    };

    const isSpecificRoute = checkPath();
    setDL(isSpecificRoute ? true : false);

    return () => {
      setDL(false);
    };
  }, [path]);

  return isDL;
};

export default useRouteStyle;
