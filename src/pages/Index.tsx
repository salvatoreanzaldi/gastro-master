import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustSection from "@/components/landing/TrustSection";
import TargetGroupSection from "@/components/landing/TargetGroupSection";
import PositioningSection from "@/components/landing/PositioningSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import MockupShowcase from "@/components/landing/MockupShowcase";
import PricingSection from "@/components/landing/PricingSection";
import POSSection from "@/components/landing/POSSection";
import PickUpScreenSection from "@/components/landing/PickUpScreenSection";
import TransaktionsUmlageSection from "@/components/landing/TransaktionsUmlageSection";
import DifferentiationSection from "@/components/landing/DifferentiationSection";
import VideoTestimonialSection from "@/components/landing/VideoTestimonialSection";
import FounderTrustSection from "@/components/landing/FounderTrustSection";
import LanguageBadgeSection from "@/components/landing/LanguageBadgeSection";
import MomentumSection from "@/components/landing/MomentumSection";
import ProcessSection from "@/components/landing/ProcessSection";
import RiskReversalSection from "@/components/landing/RiskReversalSection";
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
      <TargetGroupSection />
      <PositioningSection />
      <CalculatorSection />
      <ProblemSection />
      <SolutionSection />
      <MockupShowcase />
      {/* DESIRE */}
      <PricingSection />
      <POSSection />
      <PickUpScreenSection />
      <TransaktionsUmlageSection />
      <DifferentiationSection />
      <VideoTestimonialSection />
      <FounderTrustSection />
      <LanguageBadgeSection />
      <MomentumSection />
      <ProcessSection />
      <RiskReversalSection />
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
