
import { useEffect } from "react";
import NavigationBar from "@/components/home/NavigationBar";
import HeroSection from "@/components/home/HeroSection";
import CoursesSection from "@/components/home/CoursesSection";
import RequirementsSection from "@/components/home/RequirementsSection";
import RecognitionSection from "@/components/home/RecognitionSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import PaymentSection from "@/components/home/PaymentSection";
import FooterSection from "@/components/home/FooterSection";
import FloatingButtons from "@/components/home/FloatingButtons";
import InstrumentSection from "@/components/home/InstrumentSection";
import AboutSection from "@/components/home/AboutSection";
import LearningProcessSection from "@/components/home/LearningProcessSection";
import VideoSection from "@/components/home/VideoSection";

const Home = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <NavigationBar />
      <HeroSection />
      <InstrumentSection />
      <VideoSection />
      <CoursesSection />
      <LearningProcessSection />
      <RequirementsSection />
      <RecognitionSection />
      <FAQSection />
      <ContactSection />
      <PaymentSection />
      <AboutSection /> {/* Moved to the end as requested */}
      <FooterSection />
      <FloatingButtons />
    </div>
  );
};

export default Home;
