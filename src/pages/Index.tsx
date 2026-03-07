import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustSection from "@/components/landing/TrustSection";
import PositioningSection from "@/components/landing/PositioningSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import MockupShowcase from "@/components/landing/MockupShowcase";
import DifferentiationSection from "@/components/landing/DifferentiationSection";
import RiskReversalSection from "@/components/landing/RiskReversalSection";
import SwitchOfferSection from "@/components/landing/SwitchOfferSection";
import ReferencesSection from "@/components/landing/ReferencesSection";
import KassensystemSection from "@/components/landing/KassensystemSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <PositioningSection />
      <CalculatorSection />
      <ProblemSection />
      <SolutionSection />
      <MockupShowcase />
      <DifferentiationSection />
      <RiskReversalSection />
      <SwitchOfferSection />
      <ReferencesSection />
      <KassensystemSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
