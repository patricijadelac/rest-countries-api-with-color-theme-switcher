import { faChevronDown as chevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

const REGIONS = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

interface RegionSelectProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export default function RegionSelect({
  selectedRegion,
  onRegionChange,
}: RegionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const handleSelect = (region: string) => {
    onRegionChange(region);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-50 text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center px-6 py-[14px] w-full leading-5 bg-white rounded-[5px] shadow-custom cursor-pointer dark:bg-dark-blue"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="region-label"
      >
        {selectedRegion || 'Filter by Region'}
        <FontAwesomeIcon
          icon={chevronDown}
          className={clsx('transition-all', isOpen ? '-rotate-180' : '')}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute flex flex-col items-start gap-2 mt-1 px-6 py-4 w-full bg-white rounded-[5px] shadow-custom z-10 dark:bg-dark-blue"
          role="listbox"
          aria-labelledby="region-label"
        >
          {REGIONS.map((region) => (
            <button
              key={region}
              role="option"
              aria-selected={selectedRegion === region}
              onClick={() => handleSelect(region)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleSelect(region);
              }}
              className="cursor-pointer"
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
