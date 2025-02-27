import { UseQueryOptions } from '@tanstack/react-query';
import { fetchAllCountries } from '../api/countriesApi';
import { CountryProps } from '../types';

export default function allCountriesQuery(): UseQueryOptions<CountryProps[]> {
  return {
    queryKey: ['countries'],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 10,
  };
}
