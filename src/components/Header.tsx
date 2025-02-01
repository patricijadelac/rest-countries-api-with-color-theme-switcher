import { faMoon as moonLight } from '@fortawesome/free-regular-svg-icons';
import { faMoon as moonDark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
  return (
    <header className="py-7.5 shadow-custom bg-white m:py-6 dark:bg-dark-blue">
      <div className="container flex items-center justify-between">
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
      </div>
    </header>
  );
}
