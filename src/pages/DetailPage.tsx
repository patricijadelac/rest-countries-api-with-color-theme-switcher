import { faArrowLeft as arrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCountryByName } from '../api/countriesApi';
import { CountryProps } from '../types';
import { formatNumber } from '../utils/format';

export default function DetailPage() {
  const { countryName } = useParams();
  const [country, setCountry] = useState<CountryProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countryName) {
      setError('Invalid country name.');
      setLoading(false);
      return;
    }

    fetchCountryByName(countryName?.replace('-', ' ')!)
      .then((data) => {
        if (data.length) {
          setCountry(data[0]);
          setError(null);
        } else {
          setError('Country not found.');
        }
      })
      .catch(() => setError('Error fetching data.'))
      .finally(() => setLoading(false));
  }, [countryName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!country) return <p>No country found.</p>;

  const {
    name,
    flags,
    population,
    region,
    subregion = 'N/A',
    capital = [],
    tld = [],
    currencies = {},
    languages = {},
    borders = [],
  } = country;

  return (
    <div className="px-3 py-4">
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
          src={flags.svg}
          alt={flags.alt}
          width={560}
          height={401}
          className="rounded-[6px] shadow-custom m:rounded-[10px]"
        />
        <div>
          <h1 className="mb-4 text-[22px]">{name.common}</h1>
          <div className="flex flex-col gap-[33px] text-sm leading-8 font-light">
            <div>
              <Detail
                label="Native Name"
                value={Object.values(name.nativeName || {})[0]?.common}
              />
              <Detail label="Population" value={formatNumber(population)} />
              <Detail label="Region" value={region} />
              <Detail label="Sub Region" value={subregion} />
              <Detail label="Capital" value={capital.join(', ') || 'N/A'} />
            </div>
            <div>
              <Detail
                label="Top Level Domain"
                value={tld.join(', ') || 'N/A'}
              />
              <Detail
                label="Currencies"
                value={
                  Object.values(currencies)
                    .map((c) => c.name)
                    .join(', ') || 'N/A'
                }
              />
              <Detail
                label="Languages"
                value={Object.values(languages).join(', ') || 'N/A'}
              />
            </div>
            <div>
              <p className="mb-4 text-base font-semibold">Border Countries:</p>
              {borders.length ? (
                <ul className="flex flex-wrap gap-[10px]">
                  {borders.map((border) => (
                    <li
                      className="px-3 py-[6px] leading-normal rounded-xs shadow-custom-dark"
                      key={border}
                    >
                      {border}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
