import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Database,
  TrendingUp,
  Shield,
  Link2,
  BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "WorldVia", role: "Host Network Partner" },
  { name: "Fora", role: "Strategic Alliance" },
  { name: "Amadeus", role: "GDS Integration" },
  { name: "Sabre", role: "Fare Analytics Engine" },
];

const gdsMetrics = [
  { label: "Routes Analyzed", value: "12,400+", icon: Globe },
  { label: "Fare Rules Parsed", value: "850K+", icon: Database },
  { label: "Price Points", value: "2.4M+", icon: BarChart3 },
  { label: "Accuracy", value: "99.7%", icon: TrendingUp },
];

export default function GlobalNetwork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".network-header > *", {
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

      gsap.from(".partner-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".partner-cards",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".metric-card", {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".metrics-grid",
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="network"
      ref={sectionRef}
      className="bg-[#242422] py-[80px] lg:py-[120px] px-6 lg:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="network-header text-center mb-16">
          <span className="block font-['Inter'] text-[12px] uppercase tracking-[0.15em] text-[#969188] mb-4">
            GLOBAL RESOURCE INTEGRATION
          </span>
          <h2 className="font-['DM_Serif_Display'] text-[34px] lg:text-[54px] text-[#f3f0ea] leading-[1.1] tracking-[-0.02em]">
            Strategic Industry Alliances
          </h2>
          <p className="font-['Inter'] text-[15px] text-[#f3f0ea] opacity-80 leading-[1.6] mt-6 max-w-[700px] mx-auto">
            Empowered by deep-rooted integrations with premier global host
            networks, unlocking algorithmic pricing advantages, unlisted
            inventory, and unparalleled elite amenities.
          </p>
        </div>

        {/* Partners */}
        <div className="partner-cards grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="partner-card bg-[#3a3a38] rounded-lg p-6 text-center hover:bg-[#454543] transition-colors duration-300"
            >
              <Link2
                size={20}
                className="mx-auto text-[#f3f0ea] opacity-60 mb-3"
              />
              <h4 className="font-['DM_Serif_Display'] text-[20px] text-[#f3f0ea]">
                {partner.name}
              </h4>
              <p className="font-['Inter'] text-[11px] uppercase tracking-[0.05em] text-[#969188] mt-1">
                {partner.role}
              </p>
            </div>
          ))}
        </div>

        {/* GDS Dashboard */}
        <div className="bg-[#3a3a38] rounded-lg p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Database size={22} className="text-[#f3f0ea]" />
              <div>
                <h3 className="font-['DM_Serif_Display'] text-[24px] text-[#f3f0ea]">
                  Real-Time GDS Fare Metrics
                </h3>
                <p className="font-['Inter'] text-[12px] text-[#969188] mt-1">
                  Global Distribution System — Sabre / Amadeus Analytics Engine
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-['Inter'] text-[11px] uppercase tracking-[0.05em] text-[#969188]">
                Live Data Feed
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid grid grid-cols-2 lg:grid-cols-4 gap-4">
            {gdsMetrics.map((metric, i) => (
              <div
                key={metric.label}
                className="metric-card bg-[#242422] rounded-lg p-5 cursor-default transition-all duration-300"
                onMouseEnter={() => setHoveredMetric(i)}
                onMouseLeave={() => setHoveredMetric(null)}
                style={{
                  transform:
                    hoveredMetric === i
                      ? "translateY(-4px)"
                      : "translateY(0)",
                }}
              >
                <metric.icon
                  size={18}
                  className={`transition-colors duration-300 ${
                    hoveredMetric === i
                      ? "text-[#f3f0ea]"
                      : "text-[#969188]"
                  }`}
                />
                <p className="font-['DM_Serif_Display'] text-[28px] lg:text-[32px] text-[#f3f0ea] mt-3">
                  {metric.value}
                </p>
                <p className="font-['Inter'] text-[11px] uppercase tracking-[0.05em] text-[#969188] mt-1">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Data Interface Note */}
          <div className="mt-6 flex items-center gap-2 text-[#969188]">
            <Shield size={14} />
            <span className="font-['Inter'] text-[11px]">
              Data updated in real-time via encrypted API connections to Sabre
              and Amadeus GDS endpoints
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
