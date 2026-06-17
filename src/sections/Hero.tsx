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
      // Video entrance: scale from 1.08 to 1
      gsap.from(videoRef.current, {
        scale: 1.08,
        duration: 1.8,
        ease: "power2.out",
      });

      // Caption fade in
      gsap.from(".hero-caption", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      });

      // Headline fade in
      gsap.from(".hero-headline", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 0.55,
      });

      // Subtitle fade in
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.7,
      });

      // CTA fade in
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

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)",
        }}
      />

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-[2] flex flex-col items-center justify-center h-full text-center px-6"
      >
        <span className="hero-caption font-['Inter'] text-[12px] uppercase tracking-[0.15em] text-[#f3f0ea] opacity-80 mb-6">
          TRIPANYI LUXURY TRAVEL
        </span>

        <h1 className="hero-headline font-['DM_Serif_Display'] text-[38px] sm:text-[52px] lg:text-[80px] text-[#f3f0ea] leading-[1.1] tracking-[-0.02em] text-shadow">
          Bespoke Journeys
          <br />
          Crafted for You
        </h1>

        <p className="hero-subtitle font-['Inter'] text-[15px] lg:text-[17px] text-[#f3f0ea] opacity-90 max-w-[500px] mt-6 leading-relaxed">
          Curated luxury travel experiences, tailored to your unique desires.
        </p>

        <button
          onClick={scrollToDestinations}
          className="hero-cta mt-8 bg-[#f3f0ea] text-[#242422] rounded-full px-8 py-3.5 font-['Inter'] text-[12px] uppercase tracking-[0.05em] hover:bg-white transition-colors duration-300"
        >
          EXPLORE OUR WORLD
        </button>
      </div>
    </section>
  );
}
