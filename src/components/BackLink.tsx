import { faArrowLeft as arrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface BackLinkProps {
  classes?: string;
}

export default function BackLink({ classes }: BackLinkProps) {
  return (
    <Link
      to="/"
      aria-label="Go back to the homepage"
      className={clsx(
        'inline-flex items-center gap-2 px-6 py-1.5 rounded-xs shadow-custom-dark m:gap-2.5 m:px-8 m:py-2.5 m:rounded-md dark:bg-[#2b3844]',
        classes
      )}
    >
      <FontAwesomeIcon
        icon={arrowLeft}
        aria-hidden="true"
        className="text-sm m:text-base"
      />
      <span className="text-sm font-light m:text-base m:leading-5">Back</span>
    </Link>
  );
}
