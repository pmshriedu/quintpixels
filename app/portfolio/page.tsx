import { Navigation } from "@/components/Navigation";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackHomeLink } from "@/components/BackHomeLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — We Are The Pixels",
  description:
    "Selected work across SaaS platforms, enterprise systems, mobile apps, and AI products.",
};

export default function PortfolioPage() {
  return (
    <main className="relative">
      <Navigation />
      <BackHomeLink />
      <div className="pt-28 pb-16 px-6 md:px-10 lg:px-16 bg-(--pix-white)">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
            Portfolio
          </span>
          <div className="h-px w-12 bg-(--pix-border)" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-(--pix-gray-light)">
            Selected Work
          </span>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-pixel text-display-lg text-(--pix-black) leading-none">
            SELECTED
            <br />
            WORK
          </h1>
        </div>
      </div>
      <PortfolioSection />
      <ContactSection />
    </main>
  );
}
