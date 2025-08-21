import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QueryInput from './components/QueryInput';
import ResultsDisplay from './components/ResultsDisplay';
import FacilityMap from './components/FacilityMap';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [queryHistory, setQueryHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [facilities, setFacilities] = useState([]);

  const handleQuery = (data) => {
    // Add timestamp to the query data
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Lagos',
    });
    // Prepend new query to history (add to start of array)
    setQueryHistory((prevHistory) => [{ ...data, timestamp }, ...prevHistory]);
    // Update facilities if the response includes them
    if (data?.facilities && Array.isArray(data.facilities)) {
      setFacilities(data.facilities);
    } else {
      setFacilities([]);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Hero isDarkMode={isDarkMode} />
      <main className="container">
        <QueryInput onQuery={handleQuery} isDarkMode={isDarkMode} />
        <ResultsDisplay results={queryHistory} isDarkMode={isDarkMode} />
        {facilities.length > 0 && (
          <FacilityMap isDarkMode={isDarkMode} facilities={facilities} />
        )}
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;