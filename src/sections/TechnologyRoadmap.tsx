import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  TrendingUp,
  Sparkles,
  LineChart,
  Target,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const roadmapStages = [
  {
    phase: "Phase I",
    title: "Data Foundation",
    description:
      "Aggregation of massive historical travel market data, consumer behavioral patterns, and economic pricing fluctuations across global GDS networks.",
    status: "completed",
    icon: Database,
  },
  {
    phase: "Phase II",
    title: "Predictive Modeling",
    description:
      "Application of econometric models and quantitative analysis to identify pricing trends, demand forecasting, and optimal routing algorithms.",
    status: "in_progress",
    icon: LineChart,
  },
  {
    phase: "Phase III",
    title: "Concierge Engine",
    description:
      "Proprietary machine learning platform that automates itinerary optimization based on individual preferences, market conditions, and real-time availability.",
    status: "upcoming",
    icon: Brain,
  },
  {
    phase: "Phase IV",
    title: "Autonomous Booking",
    description:
      "Full end-to-end automation: from preference learning to dynamic pricing negotiation, securing the optimal ultra-luxury experience at the best value.",
    status: "upcoming",
    icon: Sparkles,
  },
];

function Database(props: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

export default function TechnologyRoadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".roadmap-header > *", {
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

      gsap.from(".roadmap-card", {
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".roadmap-cards",
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="bg-[#f3f0ea] py-[80px] lg:py-[120px] px-6 lg:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="roadmap-header text-center mb-16">
          <span className="block font-['Inter'] text-[12px] uppercase tracking-[0.15em] text-[#969188] mb-4">
            TECHNOLOGY ROADMAP
          </span>
          <h2 className="font-['DM_Serif_Display'] text-[34px] lg:text-[54px] text-[#242422] leading-[1.1] tracking-[-0.02em]">
            The Future of Bespoke Mobility
          </h2>
          <p className="font-['DM_Serif_Display'] text-[20px] lg:text-[24px] text-[#242422] mt-4 italic">
            Intelligent Concierge Systems
          </p>
          <p className="font-['Inter'] text-[15px] text-[#242422] leading-[1.6] mt-4 max-w-[700px] mx-auto">
            Our proprietary technology stack parses historical travel market data,
            consumer behavioral patterns, and economic pricing fluctuations to
            optimize ultra-luxury itineraries.
          </p>
        </div>

        {/* Concept Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: TrendingUp,
              title: "Econometric Analysis",
              desc: "Advanced quantitative models analyzing price elasticity, demand curves, and market equilibrium across global travel networks.",
            },
            {
              icon: Target,
              title: "Behavioral Prediction",
              desc: "Adaptive systems that understand individual preferences, predicting ideal destinations, experiences, and travel patterns.",
            },
            {
              icon: Zap,
              title: "Dynamic Optimization",
              desc: "Real-time routing and pricing optimization, continuously adjusting itineraries based on live market data and availability.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
            >
              <item.icon size={22} className="text-[#242422] mb-4" />
              <h4 className="font-['DM_Serif_Display'] text-[20px] text-[#242422] mb-2">
                {item.title}
              </h4>
              <p className="font-['Inter'] text-[13px] text-[#969188] leading-[1.6]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Roadmap Timeline */}
        <div className="roadmap-cards space-y-4">
          {roadmapStages.map((stage, i) => (
            <div
              key={stage.phase}
              className={`roadmap-card flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 p-5 lg:p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                activePhase === i
                  ? "border-[#242422] bg-white shadow-sm"
                  : "border-[#e0ddd6] bg-white/50 hover:bg-white hover:border-[#242422]"
              }`}
              onClick={() => setActivePhase(i)}
            >
              {/* Phase Badge */}
              <div className="flex items-center gap-3 lg:w-[200px] shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stage.status === "completed"
                      ? "bg-[#242422]"
                      : stage.status === "in_progress"
                      ? "bg-[#242422]"
                      : "bg-[#e0ddd6]"
                  }`}
                >
                  <stage.icon
                    size={18}
                    className={
                      stage.status === "upcoming"
                        ? "text-[#969188]"
                        : "text-[#f3f0ea]"
                    }
                  />
                </div>
                <div>
                  <span className="font-['Inter'] text-[11px] uppercase tracking-[0.05em] text-[#969188]">
                    {stage.phase}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        stage.status === "completed"
                          ? "bg-green-500"
                          : stage.status === "in_progress"
                          ? "bg-amber-400 animate-pulse"
                          : "bg-[#e0ddd6]"
                      }`}
                    />
                    <span className="font-['Inter'] text-[10px] uppercase tracking-[0.05em] text-[#969188]">
                      {stage.status === "completed"
                        ? "Completed"
                        : stage.status === "in_progress"
                        ? "In Progress"
                        : "Planned"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="font-['DM_Serif_Display'] text-[18px] lg:text-[20px] text-[#242422]">
                  {stage.title}
                </h4>
                <p
                  className={`font-['Inter'] text-[13px] leading-[1.6] mt-1 transition-all duration-300 ${
                    activePhase === i ? "text-[#242422]" : "text-[#969188]"
                  }`}
                >
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
