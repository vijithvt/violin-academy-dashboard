
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Class Schedule & Attendance",
      answer: "Classes are scheduled at mutually agreed times. Missed classes require 6+ hours notice for rescheduling. Classes cancelled by the instructor will always be rescheduled. Regular attendance and punctuality are expected, with equipment checked before class."
    },
    {
      question: "Fee Structure & Payments",
      answer: "Monthly fees are due by the 1st of each month and are non-refundable except in serious cases. Payments accepted via UPI, Google Pay, or bank transfer. Late payments may result in suspended classes. New students may pay a one-time registration fee. 5% discount for quarterly payments."
    },
    {
      question: "Practice & Progress",
      answer: "Daily practice (minimum 30 minutes) is essential. Complete weekly assignments before the next class. Progress is monitored through monthly assessments. Parents of younger students should supervise practice. Recording practice sessions helps identify areas for improvement."
    },
    {
      question: "Materials & Recordings",
      answer: "Learning materials are for personal use only. Students receive access to an online portal with lesson materials, practice tracks, and examples. The academy maintains a digital library of classical compositions and educational resources."
    },
    {
      question: "Online Class Policy",
      answer: "Video must remain ON during online classes. Required: stable 2 Mbps internet, proper camera positioning, minimal background noise, and headphones recommended. Join 5 minutes early to set up. In case of connectivity issues, backup options are available."
    },
    {
      question: "Performance & Participation",
      answer: "Performance opportunities based on merit and preparedness. Some classes may be recorded for quality review. The academy organizes quarterly student concerts, annual showcases, and masterclasses with guest artists."
    },
    {
      question: "Rewards & Certifications",
      answer: "Points awarded for attendance, practice, and improvement. Quarterly rewards include special masterclass access or performance opportunities. Milestone certificates awarded for completing learning modules. 'Student of the Month' recognition for exceptional commitment."
    },
    {
      question: "Referral Policy",
      answer: "Current students receive ₹500 for each successful referral. Referred students get 5% first-month discount. ₹750 bonus for students who've been with the academy over a year. Family referrals qualify for 10% discount for both parties."
    },
    {
      question: "Discontinuation Policy",
      answer: "One-week advance notice required for discontinuing classes. The academy may terminate enrollment for excessive absences or misconduct. Exit interviews gather feedback for improvement. Students may rejoin within three months without a new registration fee."
    },
    {
      question: "How many classes per month?",
      answer: "Students receive 4 classes per month, typically once per week. Additional classes may be scheduled for performance preparation or exam readiness at no extra cost. During festival seasons or academy events, classes may be rescheduled with advance notice."
    },
    {
      question: "What age groups do you teach?",
      answer: "We welcome students of all ages, from 6 years old to seniors. We customize teaching approaches based on age groups: 6-12 years (playful learning), 13-18 years (structured technique development), and adults (flexible programs accommodating busy schedules)."
    },
    {
      question: "How long does it take to learn violin?",
      answer: "Progress varies by individual commitment and natural aptitude. Most beginners can play simple melodies within 3-6 months of regular practice. Intermediate proficiency typically requires 1-2 years, while advanced mastery may take 3+ years of dedicated study."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900 mb-6 md:mb-10 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="bg-amber-50 rounded-xl shadow-md">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-amber-200 last:border-0">
                <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 hover:bg-amber-100/50 text-left font-medium text-maroon-800 text-sm md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 text-gray-700 text-sm md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
