import { faMoon as moonLight } from '@fortawesome/free-regular-svg-icons';
import { faMoon as moonDark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
  return (
    <header className="py-7.5 shadow-custom bg-white m:py-6 dark:bg-dark-blue">
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          aria-label="Go to homepage"
          className="text-sm font-extrabold m:text-2xl"
        >
          Where in the world?
        </Link>
        <button
          type="button"
          onClick={onThemeToggle}
          aria-pressed={isDarkMode}
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
          className="flex items-center gap-2 text-xs font-semibold cursor-pointer m:text-base"
        >
          <FontAwesomeIcon
            icon={isDarkMode ? moonDark : moonLight}
            className="text-base m:text-xl"
            aria-hidden="true"
          />
          {`${isDarkMode ? 'Light' : 'Dark'} Mode`}
        </button>
      </div>
    </header>
  );
}
