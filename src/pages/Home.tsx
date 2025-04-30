
import NavigationBar from "@/components/home/NavigationBar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import CoursesSection from "@/components/home/CoursesSection";
import RequirementsSection from "@/components/home/RequirementsSection";
import InstrumentSection from "@/components/home/InstrumentSection";
import LearningProcessSection from "@/components/home/LearningProcessSection";
import RecognitionSection from "@/components/home/RecognitionSection";
import GuidelinesSection from "@/components/home/GuidelinesSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import PaymentSection from "@/components/home/PaymentSection";
import FooterSection from "@/components/home/FooterSection";
import FloatingButtons from "@/components/home/FloatingButtons";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <RequirementsSection />
      <InstrumentSection />
      <LearningProcessSection />
      <RecognitionSection />
      <GuidelinesSection />
      <FAQSection />
      <ContactSection />
      <PaymentSection />
      <FooterSection />
      <FloatingButtons />
    </div>
  );
};

export default Home;
