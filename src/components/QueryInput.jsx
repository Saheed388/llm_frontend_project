import React, { useState } from 'react';
import '../QueryInput.css';

function QueryInput({ isDarkMode, onQuery }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuerySubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://healthllm-project-myapp.onrender.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      onQuery({ question: query, answer: data.answer, timestamp: new Date().toISOString() });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  const containerClass = `query-container ${isDarkMode ? 'dark-mode' : ''}`;

  return (
    <div className={containerClass}>
      <div className="query-header">
        <span className="query-title"></span>
      </div>
      <div className="query-box">
        <div className="query-input-wrapper">
          <textarea
            id="query-input"
            className="query-input"
            placeholder="Search hospital details near you in Abj and Lag"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleQuerySubmit()}
            disabled={loading}
          />
        </div>
        <div className="query-actions">
          <div>
            <button
              className="query-button"
              onClick={() => !loading && handleQuerySubmit()}
              disabled={loading}
            >
              {loading ? "Processing..." : "Search"}
            </button>
          </div>
          {/* <button className="mic-button" onClick={() => {}}> */}
            {/* <span role="img" aria-label="mic"></span> */}
          {/* </button> */}
        </div>
        {error && <p className="query-error">❌ {error}</p>}
      </div>
    </div>
  );
}

export default QueryInput;
