import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa'; // Import icons

function Footer({ isDarkMode }) {
  return (
    <footer className="footer">
      <p>
        HealthREG AI | Built By Jimoh Saheed Tunde{' '} | 
        {' '}<a href="https://github.com/Saheed388" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </a>{' '}
        |{' '}
        <a href="https://www.linkedin.com/in/jimoh-saheed-5480b820b/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </a>{' '}
        |{' '}
        <a href="https://saheed.vercel.app/" target="_blank" rel="noopener noreferrer">
          <FaGlobe /> Portfolio
        </a>
      </p>
    </footer>
  );
}

export default Footer;
