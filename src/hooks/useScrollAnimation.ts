import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(
  options?: ScrollTrigger.Vars
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
          ...options,
        },
      });
    });

    return () => ctx.revert();
  }, [options]);

  return ref;
}

export function useStaggerAnimation(
  selector: string,
  staggerDelay: number = 0.15
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = container.querySelectorAll(selector);

    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [selector, staggerDelay]);

  return containerRef;
}
