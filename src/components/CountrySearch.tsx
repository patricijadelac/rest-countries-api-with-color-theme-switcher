import { faSearch as search } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CountrySearchProps {
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CountrySearch({
  value,
  handleOnChange,
}: CountrySearchProps) {
  return (
    <div className="flex items-center gap-6 px-8 py-[14px] w-full max-w-[480px] text-xs leading-5 text-dark-gray bg-white rounded-[5px] shadow-custom m:py-[18px] m:text-sm dark:bg-dark-blue dark:text-inherit">
      <label htmlFor="country-search" className="hidden">
        Search for a country
      </label>
      <FontAwesomeIcon icon={search} className="text-base" aria-hidden="true" />
      <input
        id="country-search"
        type="text"
        value={value}
        onChange={handleOnChange}
        placeholder="Search for a country…"
      />
    </div>
  );
}
