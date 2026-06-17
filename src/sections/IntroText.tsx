import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroText() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".intro-label", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".intro-headline", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".intro-body", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f3f0ea] py-[80px] lg:py-[120px] px-6 lg:px-8"
    >
      <div className="max-w-[800px] mx-auto text-center">
        <span className="intro-label block font-['Inter'] text-[12px] uppercase tracking-[0.1em] text-[#969188] mb-6">
          ABOUT TRIPANYI
        </span>

        <h2 className="intro-headline font-['DM_Serif_Display'] text-[34px] lg:text-[54px] text-[#242422] leading-[1.1] tracking-[-0.02em]">
          Your Journey,
          <br />
          Our Expertise
        </h2>

        <p className="intro-body font-['Inter'] text-[15px] lg:text-[17px] text-[#242422] leading-[1.6] tracking-[-0.01em] mt-8 max-w-[680px] mx-auto">
          We specialize in crafting bespoke travel experiences that transcend the
          ordinary. From secluded island retreats to vibrant cultural immersions,
          our team of seasoned travel designers curates journeys tailored to your
          unique desires — handling every detail so you can simply savor the
          moment.
        </p>
      </div>
    </section>
  );
}
