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

  // Update the data-theme attribute on the html element whenever the theme changes
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

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
    <>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      <main className="container py-6 l:py-12">
        <RouterProvider router={router} />
      </main>
    </>
  );
}
