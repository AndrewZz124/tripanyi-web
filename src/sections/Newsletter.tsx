import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trpc } from "@/providers/trpc";
import { CheckCircle, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubscribed(true);
      setEmail("");
    },
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".newsletter-content > *", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({ email });
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="bg-[#f3f0ea] py-[80px] lg:py-[120px] px-6 lg:px-8"
    >
      <div className="max-w-[600px] mx-auto text-center newsletter-content">
        <h2 className="font-['DM_Serif_Display'] text-[34px] lg:text-[40px] text-[#242422] leading-[1.2] tracking-[-0.01em]">
          Join Our World
        </h2>

        <p className="font-['Inter'] text-[15px] text-[#242422] leading-[1.6] mt-4">
          Receive curated travel inspiration, exclusive destination guides, and
          insider access to limited-edition journeys.
        </p>

        {subscribed ? (
          <div className="mt-8 flex items-center justify-center gap-2 text-[#242422]">
            <CheckCircle size={20} />
            <span className="font-['Inter'] text-[14px]">
              Thank you for subscribing.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 h-12 px-4 bg-[#eeeeee] rounded font-['Inter'] text-[14px] text-[#242422] outline-none focus:ring-1 focus:ring-[#242422] transition-all placeholder:text-[#969188]"
            />
            <button
              type="submit"
              disabled={subscribe.isPending}
              className="h-12 px-6 bg-[#242422] text-white rounded font-['Inter'] text-[12px] uppercase tracking-[0.05em] hover:bg-[#3a3a38] transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              {subscribe.isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                </>
              ) : (
                "SUBSCRIBE"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
