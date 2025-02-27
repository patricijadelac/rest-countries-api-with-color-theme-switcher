import { UseQueryOptions } from '@tanstack/react-query';
import { fetchCountriesByRegion } from '../api/countriesApi';
import { CountryProps } from '../types';

const REGIONS = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

export default function regionsQuery(): UseQueryOptions<
  Record<string, CountryProps[]>
> {
  return {
    queryKey: ['regions'],
    queryFn: async () => {
      const regionData = await Promise.all(
        REGIONS.map(async (region) => ({
          [region]: await fetchCountriesByRegion(region),
        }))
      );
      return Object.assign({}, ...regionData);
    },
    staleTime: 1000 * 60 * 10,
  };
}
