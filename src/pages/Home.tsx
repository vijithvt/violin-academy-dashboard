
import NavigationBar from "@/components/home/NavigationBar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import TeacherSection from "@/components/home/TeacherSection";
import CoursesSection from "@/components/home/CoursesSection";
import RequirementsSection from "@/components/home/RequirementsSection";
import LearningProcessSection from "@/components/home/LearningProcessSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import FooterSection from "@/components/home/FooterSection";
import FloatingButtons from "@/components/home/FloatingButtons";
import FloatingTrialButton from "@/components/home/FloatingTrialButton";
import PaymentSection from "@/components/home/PaymentSection";
import RecognitionSection from "@/components/home/RecognitionSection";
import VideoSection from "@/components/home/VideoSection";
import InstrumentSection from "@/components/home/InstrumentSection";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <TeacherSection />
      <CoursesSection />
      <RequirementsSection />
      <InstrumentSection />
      <LearningProcessSection />
      <VideoSection />
      <RecognitionSection />
      <PaymentSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
      <FloatingButtons />
      <FloatingTrialButton />
    </div>
  );
};

export default Home;
