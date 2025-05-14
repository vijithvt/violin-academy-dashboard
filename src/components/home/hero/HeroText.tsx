
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const HeroText = () => {
  // Text animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="relative inline-block"
        initial="hidden"
        animate="visible"
        variants={headingVariants}
      >
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-maroon-950 mb-2">
          Learn Carnatic Classical Violin
          <span className="text-maroon-800 relative inline-block">
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500 scale-x-100 origin-left animate-[expandWidth_1.2s_ease-out]"></span>
          </span>
        </h1>
        <div className="absolute -bottom-2 left-0 w-24 h-1 bg-amber-500"></div>
      </motion.div>
      
      <motion.p 
        className="text-lg text-gray-700"
        initial="hidden"
        animate="visible"
        variants={paragraphVariants}
      >
        Learn the traditional South Indian violin technique from an experienced teacher. 
        Personalized lessons for beginners to advanced students.
      </motion.p>
      
      <motion.div 
        className="flex flex-wrap gap-4"
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        whileHover="hover"
      >
        <Button
          size="lg"
          className="bg-maroon-700 hover:bg-maroon-800 transition-all duration-300"
          asChild
        >
          <a href="https://forms.gle/FCuVKb2bqED64QV3A" target="_blank" rel="noopener noreferrer">
            Enroll Now
          </a>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="border-amber-300 hover:bg-amber-50 text-maroon-800 transition-all duration-300"
          asChild
        >
          <Link to="/login" className="flex items-center gap-2">
            <LogIn size={18} />
            Student Login
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroText;
