import Navigation from "@/sections/Navigation";
import Hero from "@/sections/Hero";
import IntroText from "@/sections/IntroText";
import FeaturedDestinations from "@/sections/FeaturedDestinations";
import SignatureExperiences from "@/sections/SignatureExperiences";
import EliteConcierge from "@/sections/EliteConcierge";
import GlobalNetwork from "@/sections/GlobalNetwork";
import TechnologyRoadmap from "@/sections/TechnologyRoadmap";
import Newsletter from "@/sections/Newsletter";
import Footer from "@/sections/Footer";
import { useLenis } from "@/hooks/useLenis";

export default function Home() {
  useLenis();

  return (
    <div className="bg-[#f3f0ea]">
      <Navigation />
      <Hero />
      <IntroText />
      <FeaturedDestinations />
      <SignatureExperiences />
      <EliteConcierge />
      <GlobalNetwork />
      <TechnologyRoadmap />
      <Newsletter />
      <Footer />
    </div>
  );
}
