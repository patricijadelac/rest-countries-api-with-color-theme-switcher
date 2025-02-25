import { CountryProps } from '../types';

interface BorderCountries {
  countries: CountryProps[];
}

export default function BorderCountries({ countries }: BorderCountries) {
  return (
    <div className="l:col-span-full l:flex l:flex-wrap l:gap-4 l:items-center">
      <p className="mb-4 text-base font-semibold l:mb-0">Border Countries:</p>

      {countries?.length > 0 ? (
        <ul className="flex flex-wrap gap-2.5">
          {countries.map((borderingCountry: CountryProps) => (
            <li
              className="flex items-center justify-center px-3 py-1.5 min-w-24 text-xs text-center bg-white rounded-xs shadow-custom-dark m:text-sm dark:bg-[#2b3844]"
              key={borderingCountry.name.common}
            >
              {borderingCountry.name.common}
            </li>
          ))}
        </ul>
      ) : (
        <p>None.</p>
      )}
    </div>
  );
}
