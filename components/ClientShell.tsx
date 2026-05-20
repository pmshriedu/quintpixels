"use client";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { subscribePage404, getPage404 } from "@/lib/page404Flag";
import { CinematicScrollbar } from "./scrollbar/CinematicScrollbar";
import { FloatingActions } from "./sidebar/FloatingActions";

export function ClientShell() {
  const pathname = usePathname();
  const is404 = useSyncExternalStore(subscribePage404, getPage404, () => false);
  if (pathname.startsWith("/pixels") || is404) return null;
  return (
    <>
      <CinematicScrollbar />
      <FloatingActions />
    </>
  );
}
