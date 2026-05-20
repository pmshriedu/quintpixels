"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateHeroEntrance } from "@/lib/animations/hero";

gsap.registerPlugin(ScrollTrigger);

const PIXEL_SIZE = 44; // px — chunky pixel-art sized blocks

type PixelCell = {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  g: number;
  b: number;
};

function buildPixelGrid(
  width: number,
  height: number,
  size: number,
): PixelCell[] {
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const cells: PixelCell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Subtle dark tone variation — warm-ish near-blacks
      const v = 8 + Math.floor(Math.random() * 12);
      const warm = Math.floor(Math.random() * 4);
      cells.push({
        x: col * size,
        y: row * size,
        w: size + 1,
        h: size + 1,
        r: v + warm,
        g: v,
        b: Math.max(0, v - 2),
      });
    }
  }

  // Fisher-Yates shuffle — true random scatter order
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  return cells;
}

interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
}

export function HeroSection({
  subheadline = "We engineer cinematic digital experiences—\nwhere craft meets computation.",
  ctaPrimaryText = "Explore Work",
  ctaPrimaryHref = "/portfolio",
  ctaSecondaryText = "Our Studio",
  ctaSecondaryHref = "/about",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<PixelCell[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!hero || !container || !canvas) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    // ── Canvas setup ──────────────────────────────────────────────
    const setupCanvas = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      pixelsRef.current = buildPixelGrid(
        canvas.width,
        canvas.height,
        PIXEL_SIZE,
      );
    };
    setupCanvas();

    // ── Scoped GSAP context (cleans up on unmount) ────────────────
    const gsapCtx = gsap.context(() => {
      // Entrance animation
      animateHeroEntrance(container);

      // ── Pixel dispersion scroll effect ────────────────────────────
      const WAVE_FRAC = 0.07;

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=130%",
        pin: true,
        pinSpacing: true,
        scrub: 1.8,
        onUpdate(self) {
          const progress = self.progress;
          const cells = pixelsRef.current;
          const total = cells.length;
          const waveSize = total * WAVE_FRAC;
          const filled = progress * total;

          ctx2d.clearRect(0, 0, canvas.width, canvas.height);

          for (let i = 0; i < Math.ceil(filled + waveSize); i++) {
            if (i >= total) break;
            const cell = cells[i];
            const t = Math.min(1, Math.max(0, (filled - i) / waveSize));
            if (t <= 0) continue;

            const halfW = cell.w / 2;
            const halfH = cell.h / 2;
            const cx = cell.x + halfW;
            const cy = cell.y + halfH;

            ctx2d.save();
            ctx2d.translate(cx, cy);
            ctx2d.scale(t, t);
            ctx2d.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
            ctx2d.fillRect(-halfW, -halfH, cell.w, cell.h);
            ctx2d.restore();
          }
        },
      });

      // Subtle typographic scale-down on scroll
      gsap.to(container, {
        scale: 0.9,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=130%",
          scrub: 1.8,
        },
      });
    }, hero);

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      setupCanvas();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsapCtx.revert(); // scoped cleanup — doesn't kill other components' triggers
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-(--pix-white)"
    >
      {/* Background dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute w-full h-full opacity-[0.1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Pixel dispersion canvas — sits above content ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main typography */}
      <div
        ref={containerRef}
        className="relative z-10 w-full px-6 md:px-10 lg:px-16 pt-24"
      >
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-(--pix-gray) mb-8 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-(--pix-gray)" />
          Creative Technology Studio — Est. 2024
        </div>

        <div className="overflow-hidden">
          <h1
            data-hero-top
            className="font-pixel text-hero-label text-(--pix-gray) leading-none select-none"
          >
            WE ARE THE
          </h1>
        </div>

        <div className="overflow-hidden">
          <div
            data-hero-main
            className="font-pixel text-hero-main text-(--pix-black) leading-none select-none"
          >
            PIXELS
          </div>
        </div>

        <div className="mt-10 max-w-lg">
          <p
            data-hero-sub
            className="font-sans text-base md:text-lg text-(--pix-gray) leading-relaxed"
          >
            {subheadline.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br className="hidden md:block" />}
              </span>
            ))}
          </p>
        </div>

        <div data-hero-cta className="mt-10 flex items-center gap-6">
          <a
            href={ctaPrimaryHref}
            className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] uppercase border border-(--pix-black) px-6 py-3.5 hover:bg-(--pix-black) hover:text-(--pix-white) transition-all duration-300"
          >
            {ctaPrimaryText}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={ctaSecondaryHref}
            className="font-mono text-xs tracking-[0.15em] uppercase text-(--pix-gray) hover:text-(--pix-black) transition-colors duration-300"
          >
            {ctaSecondaryText}
          </a>
        </div>

        <div className="mt-20 pb-10 flex items-end justify-between">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-(--pix-gray-light)">
            Scroll to explore
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-(--pix-gray-light)">
            Web · Mobile · AI · Cloud
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-30 z-10">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-px h-16 bg-(--pix-black) relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/3 bg-(--pix-black) animate-[slideDown_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
