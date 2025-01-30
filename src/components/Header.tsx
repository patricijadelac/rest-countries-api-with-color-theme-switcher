import { faMoon as moonLight } from '@fortawesome/free-regular-svg-icons';
import { faMoon as moonDark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
  const headerClasses = clsx(
    'flex items-center justify-between px-4 py-7.5 bg-white shadow-custom',
    'dark:text-white dark:bg-dark-blue',
    'm:px-20 m:py-6'
  );

  return (
    <header className={headerClasses}>
      <p className="text-sm font-extrabold m:text-2xl">Where in the world?</p>
      <button
        onClick={onThemeToggle}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FontAwesomeIcon
          icon={isDarkMode ? moonDark : moonLight}
          className="text-base m:text-xl"
          aria-hidden="true"
        />
        <span className="text-xs font-semibold m:text-base">Dark Mode</span>
      </button>
    </header>
  );
}
