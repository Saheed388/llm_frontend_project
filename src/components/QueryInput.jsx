import React, { useState } from 'react';

function QueryInput({ isDarkMode, onQuery }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuerySubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/search", {
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
    <div className={containerClass} style={{ backgroundColor: '#F5F5F5', borderRadius: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <span style={{ color: '#006400', fontSize: '24px', fontWeight: 'bold' }}></span>
      </div>
      <div style={{ backgroundColor: '#F5F5F5', padding: '15px', borderRadius: '8px', color: '#fff' }}>
        <div style={{ position: 'relative' }}>
          <textarea
            id="query-input"
            className="query-input"
            placeholder="Search hospital details near you in Abj and Lag"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleQuerySubmit()}
            style={{
              width: '500px',
              height: '20px',
              backgroundColor: '#F5F5F5',
              color: '#000',
              border: '2px solid #228B22',
              borderRadius: '50px',
              padding: '10px 40px 10px 15px',
              fontSize: '16px',
              outline: 'none',
              resize: 'vertical', // Allows vertical resizing by user
              // minHeight: '40px', // Initial height
              // overflowY: 'auto', // Enables scrolling if content exceeds visible area
            }}
            disabled={loading}
          />
          <span
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#228B22',
              fontSize: '16px',
            }}
          >
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>
            <button
              className="query-button"
              onClick={() => !loading && handleQuerySubmit()}
              disabled={loading}
              style={{ backgroundColor: '#006400', color: '#F5F5F5', border: 'none', padding: '5px 10px', borderRadius: '50px', cursor: 'pointer' }}
            >
              {loading ? "Processing..." : "Search"}
            </button>
          </div>
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => {}}
          >
            <span role="img" aria-label="mic"></span>
          </button>
        </div>
        {error && <p style={{ color: '#FF4444', marginTop: '5px' }}>❌ {error}</p>}
      </div>
    </div>
  );
}

export default QueryInput;