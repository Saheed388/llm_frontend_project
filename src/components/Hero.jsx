import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Hero({ isDarkMode }) {
  const sentence = "Ensure the hospital you choose is properly licensed.";
  const words = sentence.split(" ");

  const [cycle, setCycle] = useState(0); // trigger rerender for looping

  // restart animation every 15s (sentence duration + delay)
  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 15000); // cycle time for slower wave animation

    return () => clearInterval(interval);
  }, []);

  const wordAnim = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotate: -10, // slight tilt for wave effect
      scale: 0.8 // slightly smaller for wave-like pop
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0, // return to normal orientation
      scale: 1, // return to normal size
      transition: { 
        duration: 0.2, // smooth duration for wave motion
        ease: "easeInOut", // smooth in-out for wave-like flow
        type: "spring", // springy feel for wave bounce
        stiffness: 150, // moderate spring stiffness
        damping: 150 // moderate damping for smooth wave
      } 
    }
  };

  return (
    <div 
      className="hero" 
      style={{ 
        background: `linear-gradient(rgba(0, 153, 51, 0.7), rgba(111, 163, 128, 0.7)), url('/public/nigerian-doctor.jpg')`, 
        backgroundSize: "cover", 
        boxShadow: "0 4px 8px rgba(14, 195, 38, 0.2)",
        marginTop: '10px' 
      }}
    >
      <h1 className="hero-title">Empowering Nigerian Healthcare</h1>
      <h2 className="hero-subtitle">Explore health registry data with AI-driven insights</h2>
      <h5 className="hero-subtitle">Helping you make informed decisions on the right healthcare facility based on reliable information.</h5>


      <motion.p 
        key={cycle} // re-mounts each loop
        className="hero-subtitle_ensure"
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordAnim}
            initial="hidden"
            animate="visible"
            transition={{ delay: i === 0 ? 0 : i * 4.5 + 4.5 }} // "Ensure" immediate, others 1.5s delay each
            style={{ display: "inline-block", marginRight: "6px", fontWeight: "bold"  }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}

export default Hero;