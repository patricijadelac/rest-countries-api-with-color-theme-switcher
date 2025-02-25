import sherlock from '../assets/images/sherlock-holmes.png';
import BackLink from '../components/BackLink';

export default function NotFoundPage() {
  return (
    <div className="grid place-items-center gap-10 mx-auto py-10 max-w-[80%] m:grid-cols-2 m:gap-18 m:mx-none">
      <img
        src={sherlock}
        alt="Detective Holmes examining the mystery of the missing page"
        className="rounded-full border-2 border-dark-blue shadow-custom"
      />

      <div className="flex flex-col items-center justify-center gap-4 text-center m:gap-10">
        <h1 role="alert">Oops! Page Not Found.</h1>

        <p>
          The page you're looking for must've gone undercover. Sherlock Holmes
          is probably hot on its trail, but it keeps slipping away!
        </p>

        <BackLink />
      </div>
    </div>
  );
}
