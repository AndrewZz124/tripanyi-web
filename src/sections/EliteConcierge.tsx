import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trpc } from "@/providers/trpc";
import {
  Plane,
  Hotel,
  Compass,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "elite_aviation" as const,
    label: "Elite Aviation",
    description: "First & Business Class routing analysis",
    icon: Plane,
  },
  {
    id: "luxury_hospitality" as const,
    label: "Luxury Hospitality",
    description: "Aman, Capella, Hyatt Privé",
    icon: Hotel,
  },
  {
    id: "curated_experiences" as const,
    label: "Curated Experiences",
    description: "Bespoke itineraries worldwide",
    icon: Compass,
  },
];

const budgetOptions = [
  { value: "under_25k", label: "Under $25,000" },
  { value: "25k_to_50k", label: "$25,000 - $50,000" },
  { value: "50k_to_100k", label: "$50,000 - $100,000" },
  { value: "100k_to_250k", label: "$100,000 - $250,000" },
  { value: "above_250k", label: "Above $250,000" },
];

export default function EliteConcierge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "elite_aviation" as
      | "elite_aviation"
      | "luxury_hospitality"
      | "curated_experiences",
    destination: "",
    travelDates: "",
    budget: "" as
      | ""
      | "under_25k"
      | "25k_to_50k"
      | "50k_to_100k"
      | "100k_to_250k"
      | "above_250k",
    message: "",
  });

  const createInquiry = trpc.inquiry.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".concierge-content > *", {
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
    });

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return;
    createInquiry.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || undefined,
      category: formData.category,
      destination: formData.destination || undefined,
      travelDates: formData.travelDates || undefined,
      budget: formData.budget || undefined,
      message: formData.message || undefined,
    });
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedCategory = categories.find((c) => c.id === formData.category);

  return (
    <section
      id="concierge"
      ref={sectionRef}
      className="bg-[#f3f0ea] py-[80px] lg:py-[120px] px-6 lg:px-8"
    >
      <div className="max-w-[900px] mx-auto concierge-content">
        <div className="text-center mb-12">
          <span className="block font-['Inter'] text-[12px] uppercase tracking-[0.1em] text-[#969188] mb-4">
            THE ELITE CONCIERGE GATEWAY
          </span>
          <h2 className="font-['DM_Serif_Display'] text-[34px] lg:text-[54px] text-[#242422] leading-[1.1] tracking-[-0.02em]">
            Request Private Consultation
          </h2>
          <p className="font-['Inter'] text-[15px] text-[#242422] leading-[1.6] mt-4 max-w-[600px] mx-auto">
            Begin your bespoke journey. Our travel designers will craft a
            tailored itinerary based on your preferences.
          </p>
        </div>

        {/* Progress Steps */}
        {!submitted && (
          <div className="flex items-center justify-center gap-4 mb-10">
            {[0, 1, 2].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-['Inter'] text-[12px] font-medium transition-all duration-300 ${
                    s <= step
                      ? "bg-[#242422] text-white"
                      : "bg-[#e0ddd6] text-[#969188]"
                  }`}
                >
                  {s < step ? (
                    <CheckCircle size={16} />
                  ) : (
                    s + 1
                  )}
                </div>
                {s < 2 && (
                  <div
                    className={`w-16 h-[1px] transition-colors duration-300 ${
                      s < step ? "bg-[#242422]" : "bg-[#e0ddd6]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-lg p-6 lg:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle
                size={48}
                className="mx-auto text-[#242422] mb-4"
              />
              <h3 className="font-['DM_Serif_Display'] text-[28px] text-[#242422] mb-2">
                Inquiry Received
              </h3>
              <p className="font-['Inter'] text-[15px] text-[#969188]">
                Our concierge team will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              {/* Step 0: Category + Personal Info */}
              {step === 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-4">
                      Select Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => update("category", cat.id)}
                          className={`flex flex-col items-center gap-3 p-5 rounded-lg border transition-all duration-300 ${
                            formData.category === cat.id
                              ? "border-[#242422] bg-[#242422] text-white"
                              : "border-[#e0ddd6] hover:border-[#242422]"
                          }`}
                        >
                          <cat.icon size={24} />
                          <div className="text-center">
                            <span className="block font-['Inter'] text-[12px] font-medium uppercase tracking-[0.03em]">
                              {cat.label}
                            </span>
                            <span
                              className={`block font-['Inter'] text-[11px] mt-1 ${
                                formData.category === cat.id
                                  ? "text-white/70"
                                  : "text-[#969188]"
                              }`}
                            >
                              {cat.description}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className="w-full h-12 px-4 bg-[#eeeeee] rounded font-['Inter'] text-[14px] text-[#242422] outline-none focus:ring-1 focus:ring-[#242422] transition-all"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className="w-full h-12 px-4 bg-[#eeeeee] rounded font-['Inter'] text-[14px] text-[#242422] outline-none focus:ring-1 focus:ring-[#242422] transition-all"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="w-full h-12 px-4 bg-[#eeeeee] rounded font-['Inter'] text-[14px] text-[#242422] outline-none focus:ring-1 focus:ring-[#242422] transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className="w-full h-12 px-4 bg-[#eeeeee] rounded font-['Inter'] text-[14px] text-[#242422] outline-none focus:ring-1 focus:ring-[#242422] transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Travel Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    {selectedCategory && (
                      <>
                        <selectedCategory.icon
                          size={18}
                          className="text-[#242422]"
                        />
                        <span className="font-['Inter'] text-[14px] text-[#242422]">
                          {selectedCategory.label}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-2">
                        Destination
                      </label>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) =>
                          update("destination", e.target.value)
                        }
                        className="w-full h-12 px-4 bg-[#eeeeee] rounded font-['Inter'] text-[14px] text-[#242422] outline-none focus:ring-1 focus:ring-[#242422] transition-all"
                        placeholder="e.g., Maldives, Paris, Tokyo"
                      />
                    </div>
                    <div>
                      <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-2">
                        Travel Dates
                      </label>
                      <input
                        type="text"
                        value={formData.travelDates}
                        onChange={(e) =>
                          update("travelDates", e.target.value)
                        }
                        className="w-full h-12 px-4 bg-[#eeeeee] rounded font-['Inter'] text-[14px] text-[#242422] outline-none focus:ring-1 focus:ring-[#242422] transition-all"
                        placeholder="e.g., March 2026, Flexible"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-2">
                      Estimated Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => update("budget", opt.value)}
                          className={`py-3 px-2 rounded-lg border font-['Inter'] text-[11px] text-center transition-all duration-300 ${
                            formData.budget === opt.value
                              ? "border-[#242422] bg-[#242422] text-white"
                              : "border-[#e0ddd6] text-[#242422] hover:border-[#242422]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Message + Submit */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-2">
                      Additional Details
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 bg-[#eeeeee] rounded font-['Inter'] text-[14px] text-[#242422] outline-none focus:ring-1 focus:ring-[#242422] transition-all resize-none"
                      placeholder="Tell us about your ideal journey, special requests, or any preferences..."
                    />
                  </div>

                  <div className="bg-[#f3f0ea] rounded-lg p-5">
                    <h4 className="font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] mb-3">
                      Inquiry Summary
                    </h4>
                    <div className="space-y-2 font-['Inter'] text-[13px] text-[#242422]">
                      <p>
                        <span className="text-[#969188]">Name:</span>{" "}
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p>
                        <span className="text-[#969188]">Email:</span>{" "}
                        {formData.email}
                      </p>
                      {formData.phone && (
                        <p>
                          <span className="text-[#969188]">Phone:</span>{" "}
                          {formData.phone}
                        </p>
                      )}
                      <p>
                        <span className="text-[#969188]">Category:</span>{" "}
                        {selectedCategory?.label}
                      </p>
                      {formData.destination && (
                        <p>
                          <span className="text-[#969188]">Destination:</span>{" "}
                          {formData.destination}
                        </p>
                      )}
                      {formData.budget && (
                        <p>
                          <span className="text-[#969188]">Budget:</span>{" "}
                          {
                            budgetOptions.find(
                              (b) => b.value === formData.budget
                            )?.label
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 0 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#969188] hover:text-[#242422] transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 2 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-[#242422] text-white rounded-full px-6 py-3 font-['Inter'] text-[12px] uppercase tracking-[0.05em] hover:bg-[#3a3a38] transition-colors"
                  >
                    Continue
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={createInquiry.isPending}
                    className="flex items-center gap-2 bg-[#242422] text-white rounded-full px-6 py-3 font-['Inter'] text-[12px] uppercase tracking-[0.05em] hover:bg-[#3a3a38] transition-colors disabled:opacity-50"
                  >
                    {createInquiry.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <CheckCircle size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
