import { faChevronDown as chevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

interface RegionSelectProps {
  regions: string[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export default function RegionSelect({
  regions,
  selectedRegion,
  onRegionChange,
}: RegionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const dropdownBtnRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (open: boolean) => {
    setIsOpen(open);

    requestAnimationFrame(() => {
      if (!open) {
        dropdownBtnRef.current?.focus();
      } else {
        setHighlightedIndex(regions.indexOf(selectedRegion));
      }
    });
  };

  const handleSelect = (region: string) => {
    onRegionChange(region);
    toggleDropdown(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(regions.indexOf(selectedRegion));
        } else if (highlightedIndex >= 0) {
          handleSelect(regions[highlightedIndex]);
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        if (!isOpen) {
          toggleDropdown(true);
        } else if (highlightedIndex >= 0) {
          setHighlightedIndex((prev) =>
            event.key === 'ArrowDown'
              ? Math.min(prev + 1, regions.length - 1)
              : Math.max(prev - 1, 0)
          );
        }
        event.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        dropdownBtnRef.current?.focus();
        event.preventDefault();
        break;
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const listItems =
        dropdownRef.current?.querySelectorAll('[role="option"]');
      listItems?.[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div
      ref={dropdownRef}
      onBlur={handleBlur}
      className="relative w-50 text-xs m:text-sm"
    >
      <div id="combo1-label" className="sr-only">
        Select a region
      </div>

      <div
        ref={dropdownBtnRef}
        id="combo1"
        role="combobox"
        aria-controls="listbox1"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby="combo1-label"
        tabIndex={0}
        onClick={() => toggleDropdown(!isOpen)}
        onKeyDown={handleKeyDown}
        className="input-wrapper flex justify-between items-center px-6 py-3.5 leading-5 cursor-pointer m:py-4.5"
      >
        {selectedRegion}
        <FontAwesomeIcon
          icon={chevronDown}
          className={clsx('transition-all', isOpen ? '-rotate-180' : '')}
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div
          id="listbox1"
          role="listbox"
          aria-labelledby="combo1-label"
          className="input-wrapper absolute flex flex-col items-start gap-2 mt-1 px-6 py-4 z-10"
        >
          {regions.map((region, index) => (
            <div
              key={region}
              role="option"
              aria-selected={selectedRegion === region}
              tabIndex={-1}
              onClick={() => handleSelect(region)}
              className={clsx(
                'border-b border-transparent transition-all cursor-pointer hover:border-b-dark-blue dark:hover:border-b-white',
                highlightedIndex === index &&
                  'border-b-dark-blue dark:border-b-white'
              )}
            >
              {region}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
