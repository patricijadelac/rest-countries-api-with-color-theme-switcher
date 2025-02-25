import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  fetchByListOfCodes,
  fetchCountryByFullName,
} from '../api/countriesApi';
import BackLink from '../components/BackLink';
import BorderCountries from '../components/BorderCountries';
import DetailList from '../components/DetailList';
import ErrorMessage from '../components/ErrorMessage';
import { CountryProps } from '../types';
import { formatNumber } from '../utils/format';

export default function DetailPage() {
  const { countryName } = useParams<{ countryName: string }>();

  const {
    data: countries,
    status: countriesStatus,
    error: countriesError,
  } = useQuery<CountryProps[]>({
    queryKey: ['countries', countryName],
    queryFn: () => fetchCountryByFullName(countryName?.replaceAll('-', ' ')!),
    enabled: !!countryName,
    staleTime: 1000 * 60 * 5,
  });

  const country = countries?.[0];

  const { data: borders, isLoading: bordersLoading } = useQuery({
    queryKey: ['borders', countryName],
    queryFn: () => fetchByListOfCodes(country?.borders ?? []),
    enabled: !!country?.borders?.length,
    staleTime: 1000 * 60 * 5,
  });

  if (countriesStatus === 'pending') {
    return <p>Loading, please wait...</p>;
  }

  if (countriesStatus === 'error') {
    return (
      <>
        <h1 className="mb-4 m:mb-8">Country details</h1>
        <ErrorMessage
          title="Whoops! Looks like the data went on a coffee break and forgot to come back."
          error={countriesError}
        />
      </>
    );
  }

  if (!country) {
    return null;
  }

  const leftSideDetails = [
    {
      label: 'Native Name',
      value: Object.values(country.name.nativeName ?? {})[0]?.common,
    },
    {
      label: 'Population',
      value: formatNumber(country.population),
    },
    {
      label: 'Region',
      value: country.region,
    },
    {
      label: 'Sub Region',
      value: country.subregion,
    },
    {
      label: 'Capital',
      value: country.capital?.join(', '),
    },
  ];

  const rightSideDetails = [
    {
      label: 'Top Level Domain',
      value: country.tld?.join(', '),
    },
    {
      label: 'Currencies',
      value: country.currencies
        ? Object.values(country.currencies)
            .map((currency) => currency.name)
            .join(', ')
        : null,
    },
    { label: 'Languages', value: Object.values(country.languages).join(', ') },
  ];

  return (
    <div className="px-3 py-4 m:px-0 m:py-8" key={country.name.common}>
      <BackLink classes="mb-16 m:mb-20" />

      <div className="grid gap-11 l:items-center l:grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] l:gap-36">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of the  ${country.name.common}`}
          width={560}
          height={401}
          className="rounded-md shadow-custom m:rounded-[0.625rem]"
        />

        <div>
          <h1 className="mb-4 font-extrabold m:text-[2rem] m:mb-[1.438rem]">
            {country.name.common}
          </h1>

          <div className="grid gap-[2.063rem] text-sm leading-8 font-light m:text-base l:grid-cols-2 l:gap-[4.375rem]">
            <DetailList
              label="Basic information about the country"
              details={leftSideDetails}
            />

            <DetailList
              label="Additional country information"
              details={rightSideDetails}
            />

            {bordersLoading ? (
              <p>Loading...</p>
            ) : (
              <BorderCountries countries={borders} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
