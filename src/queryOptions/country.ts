import { UseQueryOptions } from '@tanstack/react-query';
import { fetchCountryByFullName } from '../api/countriesApi';
import { CountryProps } from '../types';

export default function countryQuery(
  country: string
): UseQueryOptions<CountryProps> {
  return {
    queryKey: ['countries', country],
    queryFn: () => fetchCountryByFullName(country.replaceAll('-', ' ')),
    enabled: !!country,
    staleTime: 1000 * 60 * 10,
  };
}
