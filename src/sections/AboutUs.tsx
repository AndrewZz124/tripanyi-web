import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Globe, TrendingUp, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Global Partners", value: "50+", icon: Globe },
  { label: "Routes Analyzed", value: "12,400+", icon: TrendingUp },
  { label: "Clients Served", value: "500+", icon: Users },
  { label: "Countries Covered", value: "80+", icon: MapPin },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-header > *", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".about-col", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".about-stat", {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#242422] py-[80px] lg:py-[120px] px-6 lg:px-8"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="about-header text-center mb-16">
          <span className="block font-['Inter'] text-[12px] uppercase tracking-[0.15em] text-[#969188] mb-4">
            ABOUT ANYI
          </span>
          <h2 className="font-['DM_Serif_Display'] text-[34px] lg:text-[54px] text-[#f3f0ea] leading-[1.1] tracking-[-0.02em]">
            Intelligence-Driven
            <br />
            Luxury Travel
          </h2>
        </div>

        {/* Two Column Content */}
        <div className="about-grid grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div className="about-col">
            <p className="font-['Inter'] text-[15px] text-[#f3f0ea] leading-[1.8] opacity-90">
              ANYI Travel & Experience LLC is a Houston-based luxury travel
              concierge and mobility intelligence firm. We are redefining the
              way discerning travelers experience the world — not through
              intuition alone, but through the precision of data.
            </p>
            <p className="font-['Inter'] text-[15px] text-[#f3f0ea] leading-[1.8] opacity-90 mt-6">
              Our team applies proprietary econometric models and quantitative
              market analysis to identify optimal routing, pricing
              inefficiencies, and exclusive inventory across global GDS
              networks — delivering measurable value where others rely on
              guesswork.
            </p>
            <div className="flex items-start gap-3 mt-8">
              <MapPin size={16} className="text-[#969188] mt-0.5 shrink-0" />
              <div>
                <p className="font-['Inter'] text-[13px] text-[#969188] leading-[1.6]">
                  2323 South Voss Road, Suite 125M
                  <br />
                  Houston, TX 77057, United States
                </p>
              </div>
            </div>
          </div>

          <div className="about-col">
            <p className="font-['Inter'] text-[15px] text-[#f3f0ea] leading-[1.8] opacity-90">
              Our mission is to leverage predictive analytics and AI-driven
              platforms to help travelers access world-class experiences while
              maximizing economic efficiency — both for our clients and for
              the regional economies they visit.
            </p>
            <p className="font-['Inter'] text-[15px] text-[#f3f0ea] leading-[1.8] opacity-90 mt-6">
              We specialize in elite aviation consulting, luxury hospitality
              access, and fully bespoke itinerary design — all powered by
              real-time data intelligence and deep industry partnerships with
              leading global networks including WorldVia, Fora, Amadeus, and
              Sabre.
            </p>
            <p className="font-['Inter'] text-[13px] text-[#969188] italic leading-[1.6] mt-8">
              "At ANYI, every journey is a strategic decision — and we make
              sure it's the right one."
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="about-stat bg-[#3a3a38] rounded-lg p-6 text-center"
            >
              <stat.icon
                size={20}
                className="mx-auto text-[#969188] mb-3"
              />
              <p className="font-['DM_Serif_Display'] text-[32px] text-[#f3f0ea]">
                {stat.value}
              </p>
              <p className="font-['Inter'] text-[11px] uppercase tracking-[0.05em] text-[#969188] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
