import { faArrowLeft as arrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { fetchCountryByFullName } from '../api/countriesApi';
import ErrorMessage from '../components/ErrorMessage';
import { CountryProps } from '../types';
import { formatNumber } from '../utils/format';

export default function DetailPage() {
  const { countryName } = useParams();

  const {
    data: countries,
    status,
    error,
    isLoading,
  } = useQuery<CountryProps[]>({
    queryKey: ['countries', countryName],
    queryFn: () => fetchCountryByFullName(countryName?.replace('-', ' ')!),
    enabled: Boolean(countryName),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return (
      <ErrorMessage
        title="Whoops! Looks like the data went on a coffee break and forgot to come back."
        error={error}
      />
    );
  }

  return (
    <>
      {countries ? (
        countries.map((country) => {
          return (
            <div className="px-3 py-4" key={country.name.common}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 mb-16 px-6 py-[6px] rounded-xs shadow-custom-dark"
              >
                <FontAwesomeIcon
                  icon={arrowLeft}
                  className="text-sm"
                  aria-hidden="true"
                />
                <span className="text-sm font-light">Back</span>
              </Link>

              <div className="flex flex-col gap-11">
                <img
                  src={country.flags.svg}
                  alt={country.flags.alt}
                  width={560}
                  height={401}
                  className="rounded-[6px] shadow-custom m:rounded-[10px]"
                />
                <div>
                  <h1 className="mb-4 text-[22px]">{country.name.common}</h1>
                  <div className="flex flex-col gap-[33px] text-sm leading-8 font-light">
                    <div>
                      <Detail
                        label="Native Name"
                        value={
                          Object.values(country.name.nativeName || {})[0]
                            ?.common
                        }
                      />
                      <Detail
                        label="Population"
                        value={formatNumber(country.population)}
                      />
                      <Detail label="Region" value={country.region} />
                      <Detail label="Sub Region" value={country.subregion} />
                      <Detail
                        label="Capital"
                        value={country.capital.join(', ') || 'N/A'}
                      />
                    </div>
                    <div>
                      <Detail
                        label="Top Level Domain"
                        value={country.tld.join(', ') || 'N/A'}
                      />
                      <Detail
                        label="Currencies"
                        value={
                          Object.values(country.currencies)
                            .map((c) => c.name)
                            .join(', ') || 'N/A'
                        }
                      />
                      <Detail
                        label="Languages"
                        value={
                          Object.values(country.languages).join(', ') || 'N/A'
                        }
                      />
                    </div>
                    <div>
                      <p className="mb-4 text-base font-semibold">
                        Border Countries:
                      </p>

                      {country.borders && country.borders.length ? (
                        <ul className="flex flex-wrap gap-[10px]">
                          {country.borders.map((border) => (
                            <li
                              className="px-3 py-[6px] leading-normal rounded-xs shadow-custom-dark"
                              key={border}
                            >
                              {border}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>None.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No country found.</p>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
