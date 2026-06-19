import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(videoRef.current, {
        scale: 1.08,
        duration: 1.8,
        ease: "power2.out",
      });
      gsap.from(".hero-caption", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      });
      gsap.from(".hero-headline", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 0.55,
      });
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.7,
      });
      gsap.from(".hero-cta", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.85,
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToDestinations = () => {
    const el = document.getElementById("destinations");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay - 加深让文字清晰 */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-[2] flex flex-col items-center justify-center h-full text-center px-6"
      >
        <span className="hero-caption font-['Inter'] text-[13px] uppercase tracking-[0.2em] text-white opacity-90 mb-6">
          TRIPANYI LUXURY TRAVEL
        </span>
        <h1
          className="hero-headline font-['DM_Serif_Display'] text-[48px] sm:text-[64px] lg:text-[96px] text-white leading-[1.05] tracking-[-0.02em]"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
        >
          Bespoke Journeys
          <br />
          Crafted for You
        </h1>
        <p
          className="hero-subtitle font-['Inter'] text-[16px] lg:text-[18px] text-white opacity-90 max-w-[520px] mt-6 leading-relaxed"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
        >
          Curated luxury travel experiences, tailored to your unique desires.
        </p>
        <button
          onClick={scrollToDestinations}
          className="hero-cta mt-10 bg-white text-[#242422] rounded-full px-10 py-4 font-['Inter'] text-[12px] uppercase tracking-[0.08em] hover:bg-[#f3f0ea] transition-colors duration-300"
        >
          EXPLORE OUR WORLD
        </button>
      </div>
    </section>
  );
}
