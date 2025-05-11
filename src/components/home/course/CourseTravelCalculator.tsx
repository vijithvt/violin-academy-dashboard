
import { useState, useEffect, ChangeEvent } from "react";
import { Calculator, MapPin } from "lucide-react";
import { TEACHER_LOCATION, calculateDistance } from "./constants";

const CourseTravelCalculator = () => {
  const [distance, setDistance] = useState<number>(5);
  const [travelCost, setTravelCost] = useState<number>(100);
  const [totalFee, setTotalFee] = useState<number>(2100);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isCalculatingLocation, setIsCalculatingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  
  useEffect(() => {
    const calculatedTravelCost = distance * 10 * 2; // Rs 10 per km, round trip
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
    <div className="mt-3 border-t pt-3 border-dashed border-amber-200">
      <div className="text-xs text-gray-600 mb-1 flex items-center justify-center">
        <Calculator className="h-3 w-3 mr-1" /> Travel Cost Calculator
      </div>
      <div className="flex items-center justify-between gap-2 mb-1">
        <label htmlFor="distance" className="text-xs text-gray-600">Distance (km):</label>
        <input 
          id="distance"
          type="number" 
          value={distance} 
          onChange={handleDistanceChange}
          min="1"
          max="20"
          className="w-16 h-6 text-xs border border-amber-200 rounded px-1"
        />
      </div>
      {!isCalculatingLocation && (
        <button
          onClick={getUserLocation}
          className="text-xs px-2 py-1 mt-1 mb-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded border border-amber-200 flex items-center justify-center mx-auto"
        >
          <MapPin className="h-3 w-3 mr-1" /> Calculate from my location
        </button>
      )}
      {isCalculatingLocation && (
        <div className="text-xs text-amber-600 mt-1 mb-2">Calculating distance...</div>
      )}
      {locationError && (
        <div className="text-xs text-red-500 mt-1 mb-2">{locationError}</div>
      )}
      <div className="text-xs text-gray-600 flex flex-col gap-1 mt-2">
        <div className="flex justify-between">
          <span>Tuition Fee:</span>
          <span>₹2000</span>
        </div>
        <div className="flex justify-between">
          <span>Travel Cost ({distance}km x ₹10 x 2):</span>
          <span>₹{travelCost}</span>
        </div>
        <div className="flex justify-between font-medium text-maroon-800 border-t border-amber-100 pt-1 mt-1">
          <span>Total Fee:</span>
          <span>₹{totalFee}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseTravelCalculator;
