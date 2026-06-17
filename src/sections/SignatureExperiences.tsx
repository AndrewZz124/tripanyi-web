import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureExperiences() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".exp-image", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".exp-content > *", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToConcierge = () => {
    const el = document.getElementById("concierge");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="bg-[#f3f0ea] py-[80px] lg:py-[120px] px-6 lg:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Left: Large Image */}
          <div className="w-full lg:w-[55%]">
            <div
              className="exp-image overflow-hidden rounded"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src="/images/experience.jpg"
                alt="Luxury yacht experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-[45%] exp-content">
            <span className="block font-['Inter'] text-[12px] uppercase tracking-[0.1em] text-[#969188] mb-4">
              SIGNATURE EXPERIENCES
            </span>

            <h2 className="font-['DM_Serif_Display'] text-[34px] lg:text-[54px] text-[#242422] leading-[1.1] tracking-[-0.02em]">
              Moments That
              <br />
              Last Forever
            </h2>

            <p className="font-['Inter'] text-[15px] text-[#242422] leading-[1.6] mt-6">
              From private yacht charters in the Mediterranean to exclusive wine
              tastings in Bordeaux, we design experiences that become your most
              cherished memories. Every journey is crafted with meticulous
              attention to detail and a deep understanding of what makes travel
              truly transformative.
            </p>

            <button
              onClick={scrollToConcierge}
              className="inline-block mt-6 font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#242422] underline underline-offset-4 hover:text-[#969188] transition-colors duration-300"
            >
              Discover Our Experiences
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
