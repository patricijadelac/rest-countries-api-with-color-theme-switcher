import { faArrowLeft as arrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function BackLink() {
  return (
    <Link
      to="/"
      aria-label="Go back to the homepage"
      className="inline-flex items-center gap-2 mb-16 px-6 py-1.5 rounded-xs shadow-custom-dark m:gap-2.5 m:mb-20 m:px-8 m:py-2.5 m:rounded-md dark:bg-[#2b3844]"
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
