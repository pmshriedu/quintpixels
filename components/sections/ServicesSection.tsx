"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  revealChars,
  revealLines,
  revealLine,
  revealFade,
} from "@/lib/animations/textReveal";
import {
  AppWindow,
  Code2,
  Cpu,
  Database,
  Monitor,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Web App\nDevelopment",
    desc: "Full-stack web applications built with precision — from architecture to interface. React, Next.js, and beyond.",
    Icon: Monitor,
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    num: "02",
    title: "Software\nDevelopment",
    desc: "Systems that scale. We build robust backend infrastructure, APIs, and distributed services.",
    Icon: Code2,
    tags: ["Node.js", "Python", "Go"],
  },
  {
    num: "03",
    title: "Mobile App\nDevelopment",
    desc: "Cross-platform mobile experiences that feel native — elegant, fast, and purposeful.",
    Icon: AppWindow,
    tags: ["React Native", "Swift", "Kotlin"],
  },
  {
    num: "04",
    title: "UI/UX\nSystems",
    desc: "Design systems that speak a coherent visual language — from atoms to entire product experiences.",
    Icon: Sparkles,
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    num: "05",
    title: "AI\nIntegrations",
    desc: "Intelligent systems woven seamlessly into your product. LLMs, vision models, and custom pipelines.",
    Icon: Cpu,
    tags: ["LLMs", "ML Pipelines", "Agents"],
  },
  {
    num: "06",
    title: "Cloud\nEngineering",
    desc: "Infrastructure that breathes. DevOps, CI/CD, and cloud architecture for demanding workloads.",
    Icon: Database,
    tags: ["AWS", "GCP", "Kubernetes"],
  },
];

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  Monitor,
  Code2,
  AppWindow,
  Sparkles,
  Cpu,
  Database,
};

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  icon?: string;
  tags: string[];
}

interface ServicesSectionProps {
  services?: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const displayServices =
    services && services.length > 0
      ? services
      : SERVICES.map((s) => ({
          ...s,
          icon: s.Icon.displayName ?? s.Icon.name,
        }));
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current)
        revealChars(headingRef.current, { start: "top 80%" });
      if (lineRef.current)
        revealLine(lineRef.current, { start: "top 82%", delay: 0.3 });

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        // Icon hover choreography
        const icon = item.querySelector("[data-service-icon]");
        if (icon) {
          item.addEventListener("mouseenter", () => {
            gsap.to(icon, {
              rotation: 15,
              scale: 1.15,
              duration: 0.4,
              ease: "power2.out",
            });
          });
          item.addEventListener("mouseleave", () => {
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-(--pix-white)"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
          002
        </span>
        <div
          ref={lineRef}
          className="h-px flex-1 max-w-20 bg-(--pix-border)"
          style={{ transformOrigin: "left" }}
        />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray)">
          What We Do
        </span>
      </div>

      {/* Section heading */}
      <div className="overflow-hidden mb-20">
        <h2
          ref={headingRef}
          className="font-pixel text-[2rem] md:text-display-lg text-(--pix-black) leading-none"
        >
          SERVICES
        </h2>
      </div>

      {/* Services list */}
      <ul className="divide-y divide-(--pix-border)">
        {displayServices.map(({ num, title, desc, icon, tags }, i) => {
          const Icon = icon && ICON_MAP[icon] ? ICON_MAP[icon] : Monitor;
          return (
            <li
              key={num}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="group py-10 md:py-12 grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr_1fr_1fr] gap-x-5 gap-y-4 md:gap-10 items-start cursor-default"
            >
              {/* Number — col 1 on both mobile and desktop */}
              <span className="font-mono text-[11px] tracking-[0.2em] text-(--pix-gray-light) pt-1">
                {num}
              </span>

              {/* Title — col 2 on mobile, col 2 on desktop */}
              <div className="overflow-hidden">
                <h3 className="font-pixel text-[1rem] sm:text-[1.25rem] md:text-display-sm text-(--pix-black) whitespace-pre-line leading-none group-hover:opacity-70 transition-opacity duration-300">
                  {title}
                </h3>
              </div>

              {/* Description — col 2 on mobile (indented under title), col 3 on desktop */}
              <p className="col-start-2 md:col-start-3 font-sans text-sm md:text-base text-(--pix-gray) leading-relaxed md:max-w-sm">
                {desc}
              </p>

              {/* Icon + Tags — col 2 on mobile (aligned with content), col 4 on desktop */}
              <div className="col-start-2 md:col-start-4 flex flex-col items-start md:items-end gap-4">
                <div
                  data-service-icon
                  className="text-(--pix-gray-light) group-hover:text-(--pix-black) transition-colors duration-300"
                >
                  <Icon size={28} strokeWidth={1} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-[0.15em] uppercase text-(--pix-gray) border border-(--pix-border) px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
