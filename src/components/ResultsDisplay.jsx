import React, { useState, useEffect } from 'react';
import '../ResultsDisplay.css';

function ResultsDisplay({ results: propResults, isDarkMode }) {
  const [results, setResults] = useState(() => propResults || []);

  useEffect(() => {
    const savedResults = localStorage.getItem('searchResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchResults', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    if (propResults) {
      setResults(propResults);
    }
  }, [propResults]);

  const containerClass = `results-container ${isDarkMode ? 'dark-mode' : ''}`;

  return (
    <div className={containerClass}>
      {results.length > 0 ? (
        <div className="results-list">
          {results.map((item, index) => (
            <div key={index} className="result-item">
              <p className="results-question">{item.question}</p>
              <p className="results-text"><strong></strong> {item.answer}</p>
              <p className="results-timestamp">Posted: {item.timestamp}</p>
              <hr className="result-divider" />
            </div>
          ))}
        </div>
      ) : (
        <p className="results-placeholder"></p>
      )}
    </div>
  );
}

export default ResultsDisplay;