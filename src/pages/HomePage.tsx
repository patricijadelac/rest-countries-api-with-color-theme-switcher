import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  fetchAllCountries,
  fetchCountriesByRegion,
  fetchCountryByName,
} from '../api/countriesApi';
import CountrySearch from '../components/CountrySearch';
import CountryThumbnail from '../components/CountryThumbnail';
import ErrorMessage from '../components/ErrorMessage';
import RegionSelect from '../components/RegionSelect';
import { CountryProps } from '../types';

const DEFAULT_OPTION = 'Filter by Region';
const REGIONS = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
const DEBOUNCE_DELAY = 500;

export default function HomePage() {
  const [countriesList, setCountriesList] = useState<CountryProps[]>([]);
  const [selectedRegion, setSelectedRegion] = useState(DEFAULT_OPTION);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch countries
  const {
    data: countries,
    status: countriesStatus,
    error: countriesError,
  } = useQuery<CountryProps[]>({
    queryKey: ['countries'],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 5,
  });

  // Fetch regions
  const {
    data: regions,
    status: regionsStatus,
    error: regionsError,
  } = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const regionData = await Promise.all(
        REGIONS.map(async (region) => ({
          [region]: await fetchCountriesByRegion(region),
        }))
      );
      return Object.assign({}, ...regionData);
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!searchQuery) {
      setCountriesList(
        selectedRegion === DEFAULT_OPTION
          ? countries || []
          : regions?.[selectedRegion] || []
      );
      return;
    }

    const handler = setTimeout(() => {
      setSelectedRegion(DEFAULT_OPTION);

      fetchCountryByName(searchQuery)
        .then((data) => {
          if (data.length) {
            setCountriesList(data);
          }
        })
        .catch((e: Error) => {
          setCountriesList([]);
          console.log(e.message);
        });
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (selectedRegion === DEFAULT_OPTION) {
      setCountriesList(countries || []);
    } else {
      setSearchQuery('');
      setCountriesList(regions?.[selectedRegion] || []);
    }
  }, [selectedRegion, countries, regions]);

  return (
    <>
      <h1 className="sr-only">Explore the World</h1>

      <div className="flex justify-between flex-wrap gap-10 mb-8 l:mb-12">
        <CountrySearch
          value={searchQuery}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />

        <RegionSelect
          regions={[DEFAULT_OPTION, ...REGIONS]}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
      </div>

      {(countriesStatus === 'pending' || regionsStatus === 'pending') && (
        <p>Loading data, please wait...</p>
      )}

      {countriesStatus === 'error' && (
        <ErrorMessage title="Countries Fetching Error" error={countriesError} />
      )}

      {regionsStatus === 'error' && (
        <ErrorMessage title="Regions Fetching Error" error={regionsError} />
      )}

      {countriesList.length ? (
        <div className="grid grid-cols-1 gap-10 px-10 m:grid-cols-2 m:gap-[4.688rem] m:px-0 l:grid-cols-4">
          {countriesList.map((country) => (
            <CountryThumbnail country={country} key={country.name.common} />
          ))}
        </div>
      ) : null}
    </>
  );
}
