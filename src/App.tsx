import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

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

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/country',
      element: <DetailPage />,
    },
  ]);

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}
