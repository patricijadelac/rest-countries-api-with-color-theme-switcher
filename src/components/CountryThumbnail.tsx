import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CountryProps } from '../types';
import { formatNumber } from '../utils/format';

interface CountryThumbnailProps {
  country: CountryProps;
}

export default function CountryThumbnail({ country }: CountryThumbnailProps) {
  const { name, flags, population, region, capital } = country;
  const linkRef = useRef<HTMLAnchorElement>(null);

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
      className="bg-white rounded-[5px] overflow-hidden cursor-pointer dark:bg-dark-blue"
    >
      <img
        src={flags.svg}
        alt={flags.alt || `Flag of ${name.common}`}
        className="w-full h-[160px] object-cover"
      />
      <div className="flex flex-col gap-2 p-6 text-sm leading-4 font-light">
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
        <dl className="flex flex-col gap-2">
          <DescriptionItem
            label="Population"
            value={formatNumber(population)}
          />
          <DescriptionItem label="Region" value={region} />
          <DescriptionItem label="Capital" value={capital?.join(', ')} />
        </dl>
      </div>
    </div>
  );
}

interface DetailProps {
  label: string;
  value: string | number | null;
}

function DescriptionItem({ label, value }: DetailProps) {
  return (
    <div className="flex">
      <dt className="font-semibold">{label}:&nbsp;</dt>
      <dd>{value ?? 'N/A'}</dd>
    </div>
  );
}
