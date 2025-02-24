import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CountryProps } from '../types';
import { formatNumber } from '../utils/format';
import DetailList from './DetailList';

interface CountryThumbnailProps {
  country: CountryProps;
}

export default function CountryThumbnail({ country }: CountryThumbnailProps) {
  const { name, flags, population, region, capital } = country;
  const linkRef = useRef<HTMLAnchorElement>(null);

  const countryDetails = [
    {
      label: 'Population',
      value: formatNumber(population),
    },
    { label: 'Region', value: region },
    {
      label: 'Capital',
      value: capital?.join(', '),
    },
  ];

  const handleClick = () => {
    linkRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (['Enter', ' '].includes(event.key)) {
      handleClick();
    }
  };

  const preventClickPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      tabIndex={0}
      role="link"
      onClick={handleClick}
      onKeyDown={(event) => handleKeyDown(event)}
      aria-label={`Go to details of ${name.common}`}
      className="bg-white rounded-[5px] overflow-hidden shadow-custom cursor-pointer dark:bg-dark-blue"
    >
      <img
        src={flags.svg}
        alt={flags.alt || `Flag of ${name.common}`}
        className="w-full h-[160px] object-cover"
      />

      <div className="flex flex-col gap-2 p-6 pb-[46px] text-sm leading-6 font-light">
        <h2 className="text-lg leading-[26px] font-extrabold">
          <Link
            to={`/country/${name.common.toLowerCase().replaceAll(' ', '-')}`}
            onClick={preventClickPropagation}
            ref={linkRef}
            tabIndex={-1}
          >
            {name.common}
          </Link>
        </h2>

        <DetailList label="Country details" details={countryDetails} />
      </div>
    </div>
  );
}
