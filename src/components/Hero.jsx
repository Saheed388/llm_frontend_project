import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Logo from './Logo';
import '../Hero.css';

function Hero({ isDarkMode, onQuery }) {
  useEffect(() => {
    console.log("Hero component mounted");
  }, []);

  const chats = [
    "How large is Mamagi Primary Health Clinic in terms of staff and beds?",
    "Does Accolade Medical Clinic have laboratory scientists or technicians?",
    "What services are provided at Defense Headquarters Medical Centre Abuja?",
    "Does Lafiak Hospital Abaji have a dentist or dental technician?",
    "What is the summary of Agyana Health Clinic in Pandagi Agyana, Abaji, Fct?",
  ];

  const handleChatClick = (chat) => {
    onQuery(chat); // Directly call the onQuery function with the chat text
  };

  return (
    <div className={`hero ${isDarkMode ? 'dark-mode' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo />
        <div className="description">
          <div className="line-color"></div>
          <p className="hero-subtitle">
            Empowering Nigerian healthcare with AI insights from 
            <span> health.gov.ng</span> to help you choose the right facility with confidence.
          </p>
        </div>
        <div className="line-color"></div>

        <h3 className="faq-title">Frequently Asked Questions</h3>
        <ul className="faq-list">
          {chats.map((chat, index) => (
            <li 
              key={index} 
              className="faq-item"
              onClick={() => handleChatClick(chat)}
              style={{ cursor: "pointer" }}
            >
              {chat}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default Hero;