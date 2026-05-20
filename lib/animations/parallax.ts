import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Multi-speed parallax — different layers move at different rates
 */
export function createParallax(
  el: HTMLElement,
  options: {
    speed?: number; // positive = slower (moves up), negative = faster (moves down)
    start?: string;
    end?: string;
  } = {},
) {
  const { speed = 0.3, start = "top bottom", end = "bottom top" } = options;

  gsap.to(el, {
    yPercent: speed * -100,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Horizontal parallax for backgrounds
 */
export function createHorizontalParallax(
  el: HTMLElement,
  options: { speed?: number } = {},
) {
  const { speed = 0.2 } = options;

  gsap.to(el, {
    xPercent: speed * -50,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/**
 * Scale parallax for oversized background text
 */
export function createScaleParallax(
  el: HTMLElement,
  options: {
    fromScale?: number;
    toScale?: number;
    fromOpacity?: number;
    toOpacity?: number;
  } = {},
) {
  const {
    fromScale = 1,
    toScale = 1.15,
    fromOpacity = 0.06,
    toOpacity = 0.02,
  } = options;

  gsap.fromTo(
    el,
    { scale: fromScale, opacity: fromOpacity },
    {
      scale: toScale,
      opacity: toOpacity,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    },
  );
}
