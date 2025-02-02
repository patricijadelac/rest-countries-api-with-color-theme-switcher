import { formatNumber } from '../utils/format';

interface CountryThumbnailProps {
  imgSrc: string;
  country: string;
  population: number;
  region: string;
  capital: string;
}

export default function CountryThumbnail({
  imgSrc,
  country,
  population,
  region,
  capital,
}: CountryThumbnailProps) {
  return (
    <div className="bg-white rounded-[5px] overflow-hidden dark:bg-dark-blue">
      <img
        src={imgSrc}
        alt={`${country} flag`}
        className="w-full h-[160px] object-cover"
      />
      <div className="flex flex-col gap-2 p-6 text-sm leading-4 font-light">
        <p className="text-lg leading-[26px] font-extrabold">{country}</p>
        <Detail label="Population" value={formatNumber(population)} />
        <Detail label="Region" value={region} />
        <Detail label="Capital" value={capital} />
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
