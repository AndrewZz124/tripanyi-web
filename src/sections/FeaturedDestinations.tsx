import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: "Maldives",
    subtitle: "Island Paradise",
    image: "/images/dest-maldives.jpg",
  },
  {
    name: "Santorini",
    subtitle: "Aegean Romance",
    image: "/images/dest-santorini.jpg",
  },
  {
    name: "Patagonia",
    subtitle: "Wilderness Escape",
    image: "/images/dest-patagonia.jpg",
  },
];

export default function FeaturedDestinations() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const cards = section.querySelectorAll(".dest-card");

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const imageWrap = card.querySelector(".dest-image-wrap");
        const image = card.querySelector(".dest-image");
        const text = card.querySelector(".dest-text");

        if (imageWrap && image) {
          gsap.fromTo(
            imageWrap,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.9,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
              delay: index * 0.2,
            }
          );

          gsap.fromTo(
            image,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
              delay: index * 0.2,
            }
          );
        }

        if (text) {
          gsap.from(text, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
            delay: index * 0.2 + 0.3,
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="bg-[#f3f0ea] py-[80px] lg:py-[120px] px-6 lg:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-['Inter'] text-[12px] uppercase tracking-[0.1em] text-[#969188]">
            FEATURED DESTINATIONS
          </span>
          <h2 className="font-['DM_Serif_Display'] text-[34px] lg:text-[54px] text-[#242422] leading-[1.1] tracking-[-0.02em] mt-4">
            Where Will You Go?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((dest) => (
            <div key={dest.name} className="dest-card group cursor-pointer">
              <div
                className="dest-image-wrap overflow-hidden rounded"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="dest-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="dest-text mt-4">
                <h3 className="font-['DM_Serif_Display'] text-[24px] text-[#242422]">
                  {dest.name}
                </h3>
                <p className="font-['Inter'] text-[14px] text-[#969188] mt-1">
                  {dest.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
