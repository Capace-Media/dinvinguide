import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useRouteStyle = (): boolean => {
  const path = usePathname();

  const [isDL, setDL] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if the path is one of the specific routes
    const checkPath = () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;

        // Base paths that you want to match
        const basePaths = [
          "/dryckeslistan",
          "/topplistan",
          "/dryckesutforskaren",
          "/topplistor",
          "/drycker",
        ];

        // Check if the current path starts with any of the base paths
        return basePaths.some((basePath) => path.startsWith(basePath));
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
