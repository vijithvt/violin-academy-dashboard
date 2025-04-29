
const GuidelinesSection = () => {
  const studentGuidelines = [
    {
      title: "Be Punctual",
      description: "Join classes on time and be prepared"
    },
    {
      title: "Maintain Discipline",
      description: "Respect teacher and peers during sessions"
    },
    {
      title: "Practice Regularly",
      description: "Follow daily routine as prescribed"
    },
    {
      title: "Stay Organized",
      description: "Manage materials and notes systematically"
    },
    {
      title: "Participate Actively",
      description: "Submit recordings, join activities"
    },
    {
      title: "Use Dashboard",
      description: "Track attendance and monitor progress"
    },
    {
      title: "Honest Submissions",
      description: "Send genuine practice recordings"
    },
    {
      title: "Communicate Well",
      description: "Inform prior if absent (min. 6 hours notice)"
    }
  ];

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-10 text-center">
          Student Guidelines
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {studentGuidelines.map((guideline, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-amber-100 p-5 hover:shadow-md transition-all">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                  <span className="text-amber-700 font-medium">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-maroon-800 mb-2">{guideline.title}</h3>
                <p className="text-center text-gray-600 text-sm">{guideline.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
