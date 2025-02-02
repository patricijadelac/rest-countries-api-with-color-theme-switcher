import { useEffect, useState } from 'react';
import { fetchAllCountries } from '../api/countriesApi';
import CountryThumbnail from '../components/CountryThumbnail';
import { CountryProps } from '../types';

export default function HomePage() {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCountries()
      .then(setCountries)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 p-10 m:px-0 m:gap-[75px]">
      {countries.map((country, index) => (
        <CountryThumbnail
          key={index}
          imgSrc={country.flags?.svg || ''}
          country={country.name.common}
          population={country.population}
          region={country.region}
          capital={country.capital?.[0] || 'N/A'}
        />
      ))}
      {error}
    </div>
  );
}
