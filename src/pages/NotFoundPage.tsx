import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    // TODO: Style with a more polished design.
    <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
      <h1>404 Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Home
      </Link>
    </div>
  );
}
