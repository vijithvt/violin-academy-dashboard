
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
      answer: "Missed classes are not rescheduled unless valid prior notice is given (min. 6 hours). Instructor-cancelled classes will be rescheduled."
    },
    {
      question: "Fee Structure & Payments",
      answer: "Monthly fees are due on/before 1st of each month. Non-refundable except for serious cases (e.g. illness). Payments via UPI, Google Pay, or Bank Transfer. Late payment → single reminder only."
    },
    {
      question: "Practice & Progress",
      answer: "Regular practice and assignment completion are mandatory for effective learning and progress."
    },
    {
      question: "Materials & Recordings",
      answer: "PDFs, audio, videos are provided for personal use only. Redistribution is strictly prohibited."
    },
    {
      question: "Online Class Policy",
      answer: "Keep video ON unless instructed otherwise. Good internet connection and proper camera setup are required."
    },
    {
      question: "Performance & Participation",
      answer: "Participation in events is merit-based. Some classes may be recorded for quality review purposes."
    },
    {
      question: "Rewards & Certifications",
      answer: "Points are awarded for attendance, practice, and consistency. Quarterly rewards and milestone certificates will be provided to deserving students."
    },
    {
      question: "Referral Policy",
      answer: "Refer 1 student (who completes 1 month) → ₹500 reward will be given as a token of appreciation."
    },
    {
      question: "Discontinuation Policy",
      answer: "1-week notice required before discontinuing classes. Excessive absenteeism or misconduct may result in termination of enrollment."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="bg-amber-50 rounded-xl shadow-md">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-amber-200 last:border-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-amber-100/50 text-left font-medium text-maroon-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700">
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
