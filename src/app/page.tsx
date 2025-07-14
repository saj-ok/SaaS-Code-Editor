import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import DemoSection from "./_components/DemoSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import CTASection from "./_components/CTASection";

export default function LandingPage() {
  return (
    <div className=" min-h-screen bg-[#0a0a0f] ">
      <NavigationHeader />
      
      <main>
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}