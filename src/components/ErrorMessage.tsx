interface ErrorMessageProps {
  title: string;
  error: Error;
}

const ErrorMessage = ({ title, error }: ErrorMessageProps) => {
  const message = error ? error.message : 'An unexpected error occurred.';

  return (
    <>
      <h2>{title}</h2>
      <p className="mt-4 m:mt-8">
        <strong>Error Details:</strong> {message}
      </p>
    </>
  );
};

export default ErrorMessage;
