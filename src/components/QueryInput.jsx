import React, { useState } from 'react';
import '../QueryInput.css';

function QueryInput({ isDarkMode, onQuery, loading }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const handleQuerySubmit = async () => {
    if (!query.trim() || loading) return;

    setError(null);
    await onQuery(query);
    setQuery(""); // Clear textarea after submission
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
        </div>
        {error && <p className="query-error">❌ {error}</p>}
      </div>
    </div>
  );
}

export default QueryInput;