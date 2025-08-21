import React, { useState } from 'react';

function QueryInput({ isDarkMode, onQuery }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const handleQuerySubmit = async () => {
  //   if (!query.trim()) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/search", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ query }),
  //     });

  //     if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

  //     const data = await res.json();
  //     onQuery({ question: query, answer: data.answer });
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //     setQuery("");
  //   }
  // };

  const containerClass = `query-container ${isDarkMode ? 'dark-mode' : ''}`;

  return (
    <div className={containerClass}>
      <label htmlFor="query-input" className="query-label">
        Searching for a hospital or clinic today?
      </label>
      <textarea
        id="query-input"
        className="query-input"
        rows="4"
        placeholder="E.g., 'How many doctors in Alimosho LGA?'"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></textarea>
      <button className="query-button" onClick={handleQuerySubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit Query"}
      </button>
      {error && <p className="error">❌ {error}</p>}
    </div>
  );
}

export default QueryInput;