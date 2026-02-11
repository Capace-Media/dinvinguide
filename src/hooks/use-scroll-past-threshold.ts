import { useSyncExternalStore } from "react";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback);
  return () => window.removeEventListener("scroll", callback);
}

export default function useScrollPastThreshold(threshold: number) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}
