
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const achievementsList = [
    "Best Classical Violin Teacher Award recipient (Presented by Music Intuit Academy, Bangalore, 2022)",
    "Faculty collaborator at leading music academies worldwide",
    "15+ years of violin practice and performance experience",
    "Disciplined approach to teaching Carnatic music"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className={cn(
            "md:order-1 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-4">
              About the Teacher
            </h2>
            <p className="text-gray-600 mb-6">
              With over 15 years of experience, our instructor is an award-winning Carnatic violin teacher dedicated to providing high-quality music education.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              {achievementsList.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className={cn(
            "md:order-2 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <img
              src="/images/teacher-profile.jpg"
              alt="Teacher Profile"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
