import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QueryInput from './components/QueryInput';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [queryHistory, setQueryHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [facilities, setFacilities] = useState([]);

  const handleQuery = (data) => {
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Lagos',
    });
    setQueryHistory((prevHistory) => [{ ...data, timestamp }, ...prevHistory]);
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
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Hero isDarkMode={isDarkMode} />
      <QueryInput onQuery={handleQuery} isDarkMode={isDarkMode} />
      <main className="container" style={{ flex: 1, marginLeft: '260px', marginTop: '120px', padding: '20px' }}>
        <ResultsDisplay results={queryHistory} isDarkMode={isDarkMode} />
        
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;