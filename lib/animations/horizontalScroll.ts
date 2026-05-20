import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontal scroll section using containerAnimation pattern
 * The track slides left as user scrolls down
 */
export function createHorizontalScroll(
  sectionEl: HTMLElement,
  trackEl: HTMLElement,
) {
  const totalWidth = trackEl.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollAmount = totalWidth - viewportWidth;

  const tween = gsap.to(trackEl, {
    x: -scrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: sectionEl,
      start: "top top",
      end: `+=${scrollAmount}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  return tween;
}
