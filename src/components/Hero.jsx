import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Logo from './Logo';
import '../Hero.css';

function Hero({ isDarkMode, onQuery }) {
  useEffect(() => {
    console.log("Hero component mounted");
  }, []);

  const chats = [
    "I’m sick and I just relocated to Gwarimpa, Abuja. Which hospital is close to me?",
    "Is there a dentist at Gwarimpa General Hospital, and how many dentists do they have?",
    "What services are provided at Defense Headquarters Medical Centre Abuja?",
    "I’m new in Egbeda and need a medical checkup. Can you list the hospitals in Egbeda, Lagos?",
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