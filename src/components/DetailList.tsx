import { Fragment } from 'react';

interface DetailItemProps {
  label: string;
  value: string | number | null;
}

interface DetailListProps {
  label: string;
  details: DetailItemProps[];
  classes?: string;
}

export default function DetailList({
  label,
  details,
  classes,
}: DetailListProps) {
  return (
    <dl aria-label={label} className={classes}>
      {details.map((detail) => (
        <Fragment key={detail.label}>
          <dt className="block float-left mr-1 font-semibold">{`${detail.label}:`}</dt>
          <dd>{detail.value ?? 'N/A'}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
