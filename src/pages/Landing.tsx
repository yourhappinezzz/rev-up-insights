
import LandingHeader from "@/components/Landing/LandingHeader";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import BenefitsSection from "@/components/Landing/BenefitsSection";
import CTASection from "@/components/Landing/CTASection";
import LandingFooter from "@/components/Landing/LandingFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <BenefitsSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
