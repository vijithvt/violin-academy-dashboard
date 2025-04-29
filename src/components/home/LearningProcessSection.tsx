
const LearningProcessSection = () => {
  const learningSteps = [
    {
      title: "Join class",
      description: "Select your preferred mode and schedule"
    },
    {
      title: "Attend sessions",
      description: "Regular practice with instructor guidance"
    },
    {
      title: "Submit recordings",
      description: "Monthly video submissions for assessment"
    },
    {
      title: "Get feedback",
      description: "Personalized tips and improvement areas"
    },
    {
      title: "Track progress",
      description: "Monitor your growth on student dashboard"
    },
    {
      title: "Earn certificates",
      description: "Receive recognition for level completion"
    }
  ];

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Learning Process
        </h2>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-300 hidden md:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {learningSteps.map((step, index) => (
              <div key={index} className="flex items-center md:items-start">
                <div className="bg-maroon-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 z-10">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-maroon-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcessSection;
