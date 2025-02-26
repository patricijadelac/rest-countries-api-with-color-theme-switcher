interface ErrorMessageProps {
  title: string;
  error?: Error;
}

export default function ErrorMessage({ title, error }: ErrorMessageProps) {
  const message = error ? error.message : 'An unexpected error occurred.';

  return (
    <>
      <h2>{title || 'Error'}</h2>
      <p className="mt-4 m:mt-8">
        <strong>Error Details:</strong> {message}
      </p>
    </>
  );
}
