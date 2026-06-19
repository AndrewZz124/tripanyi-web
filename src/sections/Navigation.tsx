export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#242422] pt-20 pb-10 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          <div>
            <span className="font-['DM_Serif_Display'] text-[22px] tracking-[0.1em] text-[#f3f0ea] uppercase">
              TRIPANYI
            </span>
            <p className="font-['Inter'] text-[13px] text-[#969188] leading-[1.6] mt-4">
              Redefining bespoke global mobility and luxury lifestyle concierge
              at the intersection of human insight and predictive quantitative
              analysis.
            </p>
          </div>

          <div>
            <h4 className="font-['Inter'] text-[12px] uppercase tracking-[0.1em] text-[#f3f0ea] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Destinations", id: "destinations" },
                { label: "Experiences", id: "experiences" },
                { label: "Concierge", id: "concierge" },
                { label: "Network", id: "network" },
                { label: "Technology", id: "technology" },
                { label: "About Us", id: "about" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="font-['Inter'] text-[13px] text-[#f3f0ea] hover:text-[#969188] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Inter'] text-[12px] uppercase tracking-[0.1em] text-[#f3f0ea] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="font-['Inter'] text-[13px]
