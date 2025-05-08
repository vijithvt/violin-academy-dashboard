
import { useEffect } from "react";
import NavigationBar from "@/components/home/NavigationBar";
import HeroSection from "@/components/home/HeroSection";
import CoursesSection from "@/components/home/CoursesSection";
import RequirementsSection from "@/components/home/RequirementsSection";
import RecognitionSection from "@/components/home/RecognitionSection";
import FAQSection from "@/components/home/FAQSection";
import FooterSection from "@/components/home/FooterSection";
import FloatingButtons from "@/components/home/FloatingButtons";
import InstrumentSection from "@/components/home/InstrumentSection";
import AboutSection from "@/components/home/AboutSection";
import LearningProcessSection from "@/components/home/LearningProcessSection";
import FloatingTrialButton from "@/components/home/FloatingTrialButton";

const Home = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add animation classes when elements come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <NavigationBar />
      <HeroSection />
      <InstrumentSection />
      {/* VideoSection temporarily hidden */}
      {/* <VideoSection /> */}
      <CoursesSection />
      <LearningProcessSection />
      <RequirementsSection />
      <RecognitionSection />
      <FAQSection />
      <AboutSection /> {/* Moved from end */}
      <FooterSection />
      <FloatingTrialButton />
      <FloatingButtons />
    </div>
  );
};

export default Home;
