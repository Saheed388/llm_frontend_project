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
      setError(err.message || '💡 Hmm, the request timed out. Don’t worry, just try again and we’ll get it sorted 👍');
    }
  };

  // Prevent Enter key from adding newline in textarea, only submit
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
        {/* Fixed invalid self-closing p tag and unclear instruction */}
        <div className="query-input-wrapper">
          <textarea
            id="query-input"
            className="query-input"
            placeholder="Find hospital details in Abuja & Lagos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress} // Use dedicated handler for keypress
            disabled={loading}
            rows={4} // Added for better UX, adjust as needed
          />
        </div>
        <div className="query-actions">
          <button
            className="query-button"
            onClick={handleQuerySubmit} // Simplified, no need for inline condition
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