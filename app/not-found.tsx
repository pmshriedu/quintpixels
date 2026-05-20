import type { Metadata } from "next";
import { NotFoundScene } from "@/components/not-found/NotFoundScene";

export const metadata: Metadata = {
  title: "404 — Signal Lost | WE ARE THE PIXELS",
  description: "The route you requested does not exist within this system.",
};

export default function NotFoundPage() {
  return <NotFoundScene />;
}
