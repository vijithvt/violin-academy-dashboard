
import { useState, useEffect, ChangeEvent } from "react";
import { Calculator, MapPin } from "lucide-react";
import { TEACHER_LOCATION, calculateDistance } from "./constants";
import { Spinner } from "@/components/ui/spinner";

const CourseTravelCalculator = () => {
  const [distance, setDistance] = useState<number>(5);
  const [travelCost, setTravelCost] = useState<number>(400);
  const [totalFee, setTotalFee] = useState<number>(2400);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isCalculatingLocation, setIsCalculatingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  
  useEffect(() => {
    // Rs 10 per km, round trip for each class, 4 classes per month
    const calculatedTravelCost = distance * 10 * 2 * 4; 
    setTravelCost(calculatedTravelCost);
    setTotalFee(2000 + calculatedTravelCost);
  }, [distance]);
  
  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDistance = Math.min(20, Math.max(1, Number(e.target.value)));
    setDistance(newDistance);
  };

  const getUserLocation = () => {
    setIsCalculatingLocation(true);
    setLocationError("");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          setUserLocation({ lat: userLat, lng: userLng });
          
          // Calculate distance from teacher's location
          const calculatedDistance = calculateDistance(
            TEACHER_LOCATION.lat, 
            TEACHER_LOCATION.lng, 
            userLat, 
            userLng
          );
          
          // Limit distance to 20km max for pricing
          const limitedDistance = Math.min(20, Math.max(1, calculatedDistance));
          setDistance(limitedDistance);
          setIsCalculatingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Could not get your location. Please enter distance manually.");
          setIsCalculatingLocation(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setIsCalculatingLocation(false);
    }
  };

  return (
    <div className="text-gray-800">
      <div className="mb-3 flex items-center justify-center text-sm text-maroon-700 font-medium border-b border-amber-200 pb-2">
        <Calculator className="h-4 w-4 mr-2" /> Estimate Your Monthly Fee
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="distance" className="text-sm font-medium">Distance (km):</label>
          <div className="flex items-center">
            <input 
              id="distance"
              type="range" 
              value={distance} 
              onChange={handleDistanceChange}
              min="1"
              max="20"
              step="1"
              className="w-24 h-2 accent-amber-500 bg-amber-100 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-2 text-sm font-medium w-6 text-center">{distance}</span>
          </div>
        </div>
        
        {!isCalculatingLocation ? (
          <button
            onClick={getUserLocation}
            className="text-xs py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md border border-amber-200 flex items-center justify-center mx-auto transition-colors"
          >
            <MapPin className="h-3 w-3 mr-1" /> Use my current location
          </button>
        ) : (
          <div className="flex items-center justify-center py-2">
            <Spinner size="sm" className="text-amber-600" />
            <span className="ml-2 text-xs text-amber-700">Finding your location...</span>
          </div>
        )}
        
        {locationError && (
          <div className="text-xs text-red-500 text-center">{locationError}</div>
        )}

        <div className="mt-2 bg-amber-50 rounded-md p-3">
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div className="text-gray-600">Tuition Fee:</div>
            <div className="text-right font-medium">₹2000</div>
            
            <div className="text-gray-600">
              <span className="tooltip" title="4 classes per month, round trips">
                Travel Cost:
              </span>
            </div>
            <div className="text-right font-medium">₹{travelCost}</div>
            
            <div className="col-span-2 text-xs text-gray-500 mt-1">
              ({distance}km × ₹10 × 2 × 4 classes)
            </div>
            
            <div className="col-span-2 h-px bg-amber-200 my-2"></div>
            
            <div className="text-maroon-800 font-medium">Total Monthly Fee:</div>
            <div className="text-right text-maroon-800 font-bold">₹{totalFee}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTravelCalculator;
