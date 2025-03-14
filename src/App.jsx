import './App.css'
import Converter from './components/Converter'
import Footer from './components/Footer'
import Header from './components/Header'
import { useState, useEffect } from 'react'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111010] transition-colors duration-200">
      <Header />
      <Converter />
      <Footer toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    </div>
  )
}

export default App