import { faArrowLeft as arrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function BackLink() {
  return (
    <Link
      to="/"
      aria-label="Go back to home page"
      className="inline-flex items-center gap-2 mb-16 px-6 py-[6px] rounded-xs shadow-custom-dark m:gap-[10px] m:mb-20 m:px-8 m:py-[10px] m:rounded-md"
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

export default BackLink;
