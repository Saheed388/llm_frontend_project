import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Logo from './Logo';


function Hero({ isDarkMode }) {
  useEffect(() => {
    console.log("Hero component mounted");
  }, []);

  const chats = [
    "- How large is Mamagi Primary Health Clinic in terms of staff and beds?",
    "- Does Accolade Medical Clinic have laboratory scientists or technicians?",
    "- What services are provided at Defense Headquarters Medical Centre Abuja?",
    "- Does Lafiak Hospital Abaji have a dentist or dental technician?",
    "- What is the summary of Agyana Health Clinic in Pandagi Agyana, Abaji, Fct?",
  ];

  return (
    <div
      className="hero"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100vh",
        backgroundColor: "#1A1A1A",
        padding: "20px 10px",
        boxShadow: "5px 0 5px rgba(57, 171, 120, 0.5)",
        color: "#F5F5F5",
        overflowY: "auto",
        zIndex: 1000, // Ensure it stays on top
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        
        <Logo />

       
        <div style={{ marginBottom: "30px" }}>
          <p style={{fontSize: '20px', marginTop: "50px"}}>Empowering Nigerian Healthcare by exploring health registry data with AI-driven insights to help you make informed decisions on the right healthcare facility based on reliable information from health.gov.ng.</p>
        </div>
        
        <h3 style={{ margin: "20px 0 10px 0", fontSize: "16px", color: "#FFD700" }}>Frequently Ask Question</h3>
        {chats.map((chat, index) => (
          <div
            key={index}
            style={{
              padding: "5px 0",
              fontSize: "14px",
              color: index === chats.length - 1 ? "#F5F5F5" : "#F5F5F5",
            }}
          >
            {chat}
          </div>
        ))}
       
      </motion.div>
    </div>
  );
}

export default Hero;