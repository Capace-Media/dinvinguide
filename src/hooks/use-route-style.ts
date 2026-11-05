import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Base paths that use the drink list (DL) styling
const basePaths = [
  "/dryckeslistan",
  "/topplistan",
  "/dryckesutforskaren",
  "/topplistor",
  "/drycker",
];

const useRouteStyle = (): boolean => {
  const path = usePathname();

  const [isDL, setDL] = useState<boolean>(false);

  useEffect(() => {
    // Check if the current path starts with any of the base paths
    setDL(basePaths.some((basePath) => path.startsWith(basePath)));

    return () => {
      setDL(false);
    };
  }, [path]);

  return isDL;
};

export default useRouteStyle;
