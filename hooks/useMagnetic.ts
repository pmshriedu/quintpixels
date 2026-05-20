import { useRef, useEffect } from "react";
import { createMagnetic } from "@/lib/animations/magnetic";

export function useMagnetic<T extends HTMLElement = HTMLElement>(options?: {
  strength?: number;
  ease?: number;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    )
      return;
    return createMagnetic(el, options);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
