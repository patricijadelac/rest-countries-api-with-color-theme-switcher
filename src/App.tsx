import { useEffect, useState } from 'react';
import Header from './components/Header';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  // Retrieve theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      <main>
        <p>Hi! 👋🏻</p>
      </main>
    </div>
  );
}
