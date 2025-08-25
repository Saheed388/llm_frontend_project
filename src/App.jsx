import { useState } from 'react';
import Hero from './components/Hero';
import QueryInput from './components/QueryInput';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [queryHistory, setQueryHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const handleQuerySubmit = async (query) => {
    if (!query || typeof query !== 'string' || !query.trim()) {
      console.error('Invalid query:', query);
      setQueryHistory((prevHistory) => [
        {
          question: query || 'Unknown',
          answer: 'Error: Invalid query provided',
          timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Africa/Lagos',
          }),
        },
        ...prevHistory,
      ]);
      return;
    }

    console.log('Sending query to API:', query);
    setLoading(true); // Set loading state

    try {
      const res = await fetch("https://healthllm-project-myapp.onrender.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: AbortSignal.timeout(30000), // Increased to 30 seconds
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log('API response:', data);

      const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Lagos',
      });

      setQueryHistory((prevHistory) => [
        { question: query, answer: data.answer || 'No answer provided', timestamp, facilities: data.facilities || [] },
        ...prevHistory,
      ]);

      if (data?.facilities && Array.isArray(data.facilities)) {
        setFacilities(data.facilities);
      } else {
        setFacilities([]);
      }
    } catch (err) {
      console.error('Fetch error details:', {
        message: err.message,
        name: err.name,
        stack: err.stack,
        query,
      });

      const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Lagos',
      });

      setQueryHistory((prevHistory) => [
        { question: query, answer: `Error: ${err.message}`, timestamp },
        ...prevHistory,
      ]);
    } finally {
      setLoading(false); // Clear loading state
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={isDarkMode ? 'dark-mode' : 'light-mode'}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      {loading && <div className="loading">Processing your request...</div>}
      <Hero isDarkMode={isDarkMode} onQuery={handleQuerySubmit} />
      <QueryInput onQuery={handleQuerySubmit} isDarkMode={isDarkMode} loading={loading} />
      <main
        className="container"
        style={{ flex: 1, marginLeft: '260px', marginTop: '120px', padding: '20px' }}
      >
        <ResultsDisplay results={queryHistory} isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;