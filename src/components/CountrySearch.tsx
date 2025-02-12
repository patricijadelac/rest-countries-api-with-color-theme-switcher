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
    <div className="input-wrapper flex items-center gap-7 px-8 py-[14px] max-w-[480px] text-xs leading-5 m:gap-6 m:py-[18px] m:text-sm">
      <FontAwesomeIcon
        icon={search}
        className="text-base text-[#b2b2b2] dark:text-white"
        aria-hidden="true"
      />
      <label htmlFor="country-search" className="sr-only">
        Enter the name of the country you're looking for
      </label>
      <input
        type="text"
        id="country-search"
        name="country-search"
        value={value}
        onChange={handleOnChange}
        placeholder="Search for a country…"
        className="w-full placeholder:text-[#c4c4c4] dark:placeholder:text-white"
      />
    </div>
  );
}
