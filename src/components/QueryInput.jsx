import React, { useState } from 'react';
import '../QueryInput.css'; // Adjusted path to match convention (relative path)

function QueryInput({ isDarkMode, onQuery, loading }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const handleQuerySubmit = async () => {
    if (!query.trim() || loading) return;

    setError(null);
    try {
      await onQuery(query);
      setQuery(''); // Clear textarea after successful submission
    } catch (err) {
      setError('💡 Hmm, the request timed out. Don’t worry, just try again and we’ll get it sorted 👍');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault(); // Prevent default Enter behavior (newline)
      handleQuerySubmit();
    }
  };

  const containerClass = `query-container ${isDarkMode ? 'dark-mode' : ''}`;

  return (
    <div className={containerClass}>
      <div className="query-header">
        <span className="query-title"></span> {/* Consider adding content or removing if unused */}
      </div>
      <div className="query-box">
        <div className="query-input-wrapper">
          <textarea
            id="query-input"
            className="query-input"
            placeholder="Find hospital details in Abuja & Lagos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            rows={4}
          />
        </div>
        <div className="query-actions">
          <button
            className="query-button"
            onClick={handleQuerySubmit}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Search'}
          </button>
        </div>
        {error && <p className="query-error">❌ {error}</p>}
      </div>
    </div>
  );
}

export default QueryInput;