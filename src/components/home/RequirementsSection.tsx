
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const RequirementsSection = () => {
  return (
    <section id="requirements" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Before You Start</h2>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          What you'll need to begin your musical journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Instrument */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 h-48 rounded-md overflow-hidden">
              <img 
                src="/lovable-uploads/f9ac38e5-1bd9-4dbe-ac19-73b8866cc805.png" 
                alt="Violin" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instrument</h3>
            <p className="text-gray-600 mb-4">
              Quality student violin (3/4 or 4/4 size based on student age)
            </p>
          </div>
          
          {/* Accessories */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 h-48 rounded-md overflow-hidden">
              <img 
                src="/lovable-uploads/2386dc2f-15e2-4fbc-b5af-d210ea749099.png" 
                alt="Violin Accessories" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessories</h3>
            <p className="text-gray-600 mb-4">
              Shoulder rest, rosin, extra strings, and a digital tuner
            </p>
          </div>
          
          {/* Practice Space */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 h-48 rounded-md overflow-hidden">
              <img 
                src="/lovable-uploads/cc04dd6a-b479-4eae-a679-718755823964.png" 
                alt="Practice Space" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Practice Space</h3>
            <p className="text-gray-600 mb-4">
              Quiet room with good lighting and a sturdy chair without armrests
            </p>
          </div>
          
          {/* Time Commitment */}
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 h-48 rounded-md overflow-hidden">
              <img 
                src="/lovable-uploads/48f9d0f7-776f-493e-995f-6855aa1e6a6e.png" 
                alt="Practice Time" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Time Commitment</h3>
            <p className="text-gray-600 mb-4">
              20-30 minutes daily practice (beginners), 45-60 minutes (advanced)
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/beginner-guide" className="inline-flex items-center text-primary font-medium hover:underline">
            View Violin Purchase Guide <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
          <p className="text-gray-500 mt-2">
            Don't have an instrument yet? We provide guidance on selecting the right violin for your needs and budget.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
