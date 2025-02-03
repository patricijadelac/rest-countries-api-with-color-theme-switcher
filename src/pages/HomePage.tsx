import { useEffect, useState } from 'react';
import {
  fetchAllCountries,
  fetchCountriesByRegion,
  fetchCountryByName,
} from '../api/countriesApi';
import CountrySearch from '../components/CountrySearch';
import CountryThumbnail from '../components/CountryThumbnail';
import RegionSelect from '../components/RegionSelect';
import { CountryProps } from '../types';

const DEFAULT_REGION = 'Filter by Region';

export default function HomePage() {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(DEFAULT_REGION);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setSelectedRegion(DEFAULT_REGION);

    fetchCountryByName(searchQuery)
      .then((data) => {
        if (data.length) {
          setCountries(data);
          setError(null);
        }
      })
      .catch(() => {
        setCountries([]);
        setError('No countries found matching your query.');
      });
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery('');

    const fetchCountries =
      selectedRegion === DEFAULT_REGION
        ? fetchAllCountries
        : fetchCountriesByRegion;

    fetchCountries(selectedRegion)
      .then((data) => {
        if (data.length) {
          setCountries(data);
          setError(null);
        }
      })
      .catch((err) => {
        setCountries([]);
        setError(err.message);
      });
  }, [selectedRegion]);

  return (
    <>
      <div className="flex justify-between flex-wrap gap-10 mb-8 l:mb-12">
        <CountrySearch
          value={searchQuery}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />

        <RegionSelect
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
      </div>

      {error ? (
        <p className="px-10 m:px-0">{error}</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 px-10 m:px-0 m:gap-[75px]">
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
        </div>
      )}
    </>
  );
}
