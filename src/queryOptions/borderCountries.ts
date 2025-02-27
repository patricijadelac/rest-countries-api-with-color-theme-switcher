import { UseQueryOptions } from '@tanstack/react-query';
import { fetchByListOfCodes } from '../api/countriesApi';
import { CountryProps } from '../types';

export default function borderCountriesQuery(
  countryName: string,
  borders: string[] = []
): UseQueryOptions<CountryProps[]> {
  return {
    queryKey: ['borders', countryName],
    queryFn: () => fetchByListOfCodes(borders),
    enabled: !!borders.length,
    staleTime: 1000 * 60 * 10,
  };
}
