
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /home from the root path
    navigate("/home");
  }, [navigate]);

  return null;
};

export default Index;
