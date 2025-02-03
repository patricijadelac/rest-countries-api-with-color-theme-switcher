import { useEffect, useState } from 'react';
import { fetchAllCountries, fetchCountriesByRegion } from '../api/countriesApi';
import CountryThumbnail from '../components/CountryThumbnail';
import RegionSelect from '../components/RegionSelect';
import { CountryProps } from '../types';

export default function HomePage() {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [selectedRegion, setSelectedRegion] =
    useState<string>('Filter by Region');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries =
      selectedRegion === 'Filter by Region'
        ? fetchAllCountries
        : fetchCountriesByRegion;

    fetchCountries(selectedRegion)
      .then((data) => setCountries(data))
      .catch((err) => setError(err.message));
  }, [selectedRegion]);

  return (
    <div>
      <RegionSelect
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 px-10 py-8 m:px-0 m:gap-[75px]">
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
    </div>
  );
}
