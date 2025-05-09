
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
      answer: "Classes are scheduled at mutually agreed times between student and instructor. Missed classes are not rescheduled unless valid prior notice is given (minimum 6 hours before the scheduled time). Classes cancelled by the instructor will always be rescheduled at a convenient time for the student. Regular attendance is crucial for steady progress in learning the violin. Students are expected to join classes on time and be prepared with their instruments tuned. In case of technical issues, students are encouraged to check their setup before class begins."
    },
    {
      question: "Fee Structure & Payments",
      answer: "Monthly fees are due on or before the 1st day of each month. Fees are non-refundable except in serious cases such as prolonged illness or relocation. Payments can be made via UPI, Google Pay, or Bank Transfer. Late payments will receive a single reminder, after which classes may be suspended until payment is received. New students may be required to pay a one-time registration fee. Fee receipts are provided electronically for all transactions. A discount of 5% is available for students who pay for three months in advance. International students have different payment options available including PayPal and wire transfers."
    },
    {
      question: "Practice & Progress",
      answer: "Regular practice is essential for mastering the violin. Students are expected to practice at least 30 minutes daily. Weekly assignments must be completed before the next class. Progress is monitored through monthly assessments, and additional practice materials are provided for areas needing improvement. Parents of younger students are encouraged to supervise practice sessions. Practice journals are recommended to track improvement over time. Video recording your practice sessions can help identify areas needing improvement. The academy provides structured practice guides for students at different levels, with specific exercises designed to build technique progressively. For beginners, even 15 minutes of focused daily practice can yield significant results."
    },
    {
      question: "Materials & Recordings",
      answer: "All learning materials including PDFs, audio recordings, and instructional videos are provided for personal use only. Redistribution or sharing these materials with non-enrolled students is strictly prohibited. Students receive access to a dedicated online portal containing lesson materials, practice tracks, and performance examples. Additional resources are regularly added to support learning. The academy maintains a comprehensive digital library of classical compositions, exercises, and theoretical texts that students can access. Custom learning materials are created for students with specific learning needs or goals. Audio and video recordings of lessons may be made available to students for review purposes. Students are encouraged to create their own library of practice recordings to track their progress over time."
    },
    {
      question: "Online Class Policy",
      answer: "For online classes, students must keep their video ON throughout the session unless specifically instructed otherwise. A stable internet connection with minimum 2 Mbps speed is required. The camera should be positioned to clearly show the student's posture, both hands, and the violin. Background noise should be minimized, and a pair of earphones/headphones is recommended for better sound quality. Students should join the class 5 minutes before the scheduled time to set up and warm up. Virtual background features should be turned off as they can interfere with the teacher's ability to observe technique. In case of connectivity issues, backup plans include phone classes or rescheduling. Students should ensure their learning space is well-lit, especially for evening classes, to ensure proper visibility of finger positions and bowing technique."
    },
    {
      question: "Performance & Participation",
      answer: "Participation in concerts and recitals is based on merit and preparedness. Students who demonstrate consistent progress and dedication will be invited to perform. Some classes may be recorded for quality review and development of teaching materials. Selected student performances may be featured on the academy's social media platforms with prior consent. The academy organizes quarterly student concerts to provide performance experience in a supportive environment. Annual showcases feature advanced students performing complete compositions. Masterclasses with guest artists are organized periodically and students are selected based on their readiness and commitment. Students are encouraged to participate in local music competitions and events to gain exposure and performance experience. Collaborative performances with other instrumental students are organized to develop ensemble skills."
    },
    {
      question: "Rewards & Certifications",
      answer: "Points are awarded for regular attendance, consistent practice, and improvement. Students who accumulate sufficient points receive quarterly rewards such as special masterclass access or performance opportunities. Milestone certificates are awarded upon completion of specific learning modules or grade levels. Annual recognition is given to outstanding students based on their dedication and progress. A 'Student of the Month' is selected based on exceptional commitment and improvement. Digital badges are awarded for mastering specific techniques or compositions. The academy's achievement program includes Bronze, Silver, Gold, and Platinum tiers based on comprehensive assessments. Students who complete the full curriculum receive a graduation certificate recognized by affiliated music institutions. Exceptional students may receive letters of recommendation for music college applications or scholarship opportunities."
    },
    {
      question: "Referral Policy",
      answer: "Current students who refer a new student will receive a ₹500 reward after the referred student completes one month of lessons. Multiple referrals are encouraged and rewarded individually. Referred students also receive a 5% discount on their first month's fees. This policy aims to build a community of dedicated violin learners. Referral bonuses increase to ₹750 for students who have been with the academy for more than a year. Family referrals (siblings, cousins) qualify for a special 10% discount for both parties. The academy's Ambassador Program allows students to earn additional benefits by consistently bringing in new referrals. Referral credits can be accumulated and applied toward future lessons or special workshops. The referral system helps create a supportive community of learners with shared interests and goals."
    },
    {
      question: "Discontinuation Policy",
      answer: "Students wishing to discontinue classes must provide at least one week's advance notice. This allows for proper closure of the learning process and completion of pending modules. The academy reserves the right to terminate enrollment in cases of excessive absenteeism, misconduct, or consistent lack of practice. In such cases, a counseling session will be conducted before final termination. Exit interviews are conducted to gather feedback for improvement of teaching methodologies. Students who discontinue may rejoin within three months without paying a new registration fee. Long-term students (more than one year) who need to take a break due to examinations or other commitments can pause their enrollment for up to two months without losing their spot or progress tracking. Digital certificates of completion are provided to students who have completed specific curriculum modules before discontinuing."
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
