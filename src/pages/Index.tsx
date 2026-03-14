import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustSection from "@/components/landing/TrustSection";
import PositioningSection from "@/components/landing/PositioningSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import MockupShowcase from "@/components/landing/MockupShowcase";
import PricingSection from "@/components/landing/PricingSection";
import POSSection from "@/components/landing/POSSection";
import TransaktionsUmlageSection from "@/components/landing/TransaktionsUmlageSection";
import DifferentiationSection from "@/components/landing/DifferentiationSection";
import FounderTrustSection from "@/components/landing/FounderTrustSection";
import ProcessSection from "@/components/landing/ProcessSection";
import RiskReversalSection from "@/components/landing/RiskReversalSection";
import SwitchOfferSection from "@/components/landing/SwitchOfferSection";
import ReferencesSection from "@/components/landing/ReferencesSection";
import PartnerSection from "@/components/landing/PartnerSection";
import FAQSection from "@/components/landing/FAQSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* ATTENTION */}
      <HeroSection />
      <TrustSection />
      {/* INTEREST */}
      <PositioningSection />
      <CalculatorSection />
      <ProblemSection />
      <SolutionSection />
      <MockupShowcase />
      {/* DESIRE */}
      <PricingSection />
      <POSSection />
      <TransaktionsUmlageSection />
      <DifferentiationSection />
      <FounderTrustSection />
      <ProcessSection />
      <RiskReversalSection />
      <SwitchOfferSection />
      <ReferencesSection />
      <PartnerSection />
      <FAQSection />
      {/* ACTION */}
      <ContactSection />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
