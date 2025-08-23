import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Logo from './Logo';
import '../Hero.css';

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
    <div className={`hero ${isDarkMode ? 'dark-mode' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo />
        <div className="description">
          <p className="hero-subtitle">Empowering Nigerian Healthcare by exploring health registry data with AI-driven insights to help you make informed decisions on the right healthcare facility based on reliable information from health.gov.ng.</p>
        </div>
        <h3 className="faq-title">Frequently Asked Questions</h3>
        {chats.map((chat, index) => (
          <div key={index} className="faq-item">
            {chat}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Hero;