import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight - 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navLinks = [
    { label: "DESTINATIONS", id: "destinations" },
    { label: "EXPERIENCES", id: "experiences" },
    { label: "CONCIERGE", id: "concierge" },
    { label: "NETWORK", id: "network" },
    { label: "TECH", id: "technology" },
    { label: "ABOUT", id: "about" },
    { label: "CONTACT", id: "newsletter" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled ? "bg-[#f3f0ea] shadow-[0_1px_0_#e0ddd6]" : "bg-transparent"
        }`}
        style={{ height: 80 }}
      >
        <div className="flex items-center justify-between h-full px-6 lg:px-8 max-w-[1400px] mx-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`font-['DM_Serif_Display'] text-xl tracking-[0.1em] uppercase transition-colors duration-400 ${
              scrolled ? "text-[#242422]" : "text-[#f3f0ea]"
            }`}
          >
            TRIPANYI
          </button>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`font-['Inter'] text-[11px] uppercase tracking-[0.05em] transition-colors duration-400 hover:opacity-70 ${
                  scrolled ? "text-[#242422]" : "text-[#f3f0ea]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className={`font-['Inter'] text-[11px] flex items-center gap-1 ${scrolled ? "text-[#242422]" : "text-[#f3f0ea]"}`}>
                  <User size={14} />
                  {user?.name || "Account"}
                </span>
                <button
                  onClick={logout}
                  className={`font-['Inter'] text-[11px] flex items-center gap-1 hover:opacity-70 transition-opacity ${scrolled ? "text-[#242422]" : "text-[#f3f0ea]"}`}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`font-['Inter'] text-[11px] uppercase tracking-[0.05em] transition-colors duration-400 hover:opacity-70 ${
                  scrolled ? "text-[#242422]" : "text-[#f3f0ea]"
                }`}
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => scrollTo("concierge")}
              className={`font-['Inter'] text-[11px] uppercase tracking-[0.05em] rounded-full px-4 py-1.5 transition-all duration-400 ${
                scrolled ? "bg-[#242422] text-white" : "bg-[#f3f0ea] text-[#242422]"
              }`}
            >
              INQUIRE
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled ? "bg-[#242422]" : "bg-[#f3f0ea]"} ${menuOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${scrolled ? "bg-[#242422]" : "bg-[#f3f0ea]"} ${menuOpen ? "-rotate-45 -translate-y-[1.5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#242422] flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-['Inter'] text-[14px] uppercase tracking-[0.1em] text-[#f3f0ea] hover:opacity-70 transition-opacity"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col items-center gap-4 mt-4">
            {isAuthenticated ? (
              <>
                <span className="font-['Inter'] text-[12px] text-[#f3f0ea] flex items-center gap-2">
                  <User size={14} />
                  {user?.name || "Account"}
                </span>
                <button
                  onClick={() => { setMenuOpen(false); logout(); }}
                  className="font-['Inter'] text-[12px] text-[#f3f0ea] flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="font-['Inter'] text-[14px] uppercase tracking-[0.1em] text-[#f3f0ea]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
