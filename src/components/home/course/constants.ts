
// Teacher's location coordinates
export const TEACHER_LOCATION = {
  lat: 8.519270751001878,
  lng: 77.05175901534338
};

// Teaching centers
export const TEACHING_CENTERS = [
  { 
    name: "Laya Tarang Academy of Music and Performing Arts",
    location: "Thiruvananthapuram",
    coordinates: { lat: 8.5241, lng: 76.9366 }
  },
  { 
    name: "Bharathakala Dance & Music Cultural Society",
    location: "Peyad, Thiruvananthapuram",
    coordinates: { lat: 8.5484, lng: 76.9701 }
  },
  { 
    name: "Musicintuit Academy India Pvt Ltd.",
    location: "Bengaluru",
    type: "Online"
  },
  { 
    name: "Jovens Academy",
    location: "Texas, USA",
    type: "Online"
  }
];

// Function to calculate distance between two points using the Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10; // Round to 1 decimal place
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

export type CourseCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  fee: string;
  time: string;
  highlights?: string[];
  isHomeTuition?: boolean;
};

export const courseCards = [
  {
    title: "1-to-1 Online Violin Class",
    description: "Personalized instruction tailored to your learning pace",
    icon: <Globe className="w-12 h-12 text-amber-600" />,
    fee: "₹2000 per month",
    time: "4 classes per month",
  },
  {
    title: "Online Group Class",
    description: "Learn alongside peers in an interactive setting",
    icon: <Users className="w-12 h-12 text-amber-600" />,
    fee: "₹700 per month",
    time: "Tue & Thu, 9-10 PM IST"
  },
  {
    title: "Home Tuition",
    description: "In-person classes at your location (Trivandrum only)",
    icon: <HomeIcon className="w-12 h-12 text-amber-600" />,
    fee: "₹2000 + travel per month",
    time: "4 classes per month",
    isHomeTuition: true
  }
];
