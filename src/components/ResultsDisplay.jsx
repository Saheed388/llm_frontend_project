function ResultsDisplay({ results, isDarkMode }) {
  const containerClass = `results-container ${isDarkMode ? 'dark-mode' : ''}`;

  return (
    <div className={containerClass}>
      {/* <h2 className="results-title">Query History</h2> */}
      {results.length > 0 ? (
        <div className="results-list">
          {results.map((item, index, array) => (
            <div key={array.length - index - 1} className="result-item">
              <p className="results-question">{item.question}</p>
              <p className="results-text"><strong></strong> {item.answer}</p>
              <p className="results-timestamp">Posted: {item.timestamp}</p>
              <hr className="result-divider" />
            </div>
          ))}
        </div>
      ) : (
        <p className="results-placeholder">Enter a query to view results.</p>
      )}
    </div>
  );
}

export default ResultsDisplay;