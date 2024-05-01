'use client';

import { useEffect } from 'react';
import { GiHazardSign } from 'react-icons/gi';

const ContactPageError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  // display the error messages to the user if something goes wrong
  return (
    <main className="prose sm:mx-auto sm:max-w-4xl">
      <h2 className="flex space-x-3">
        <span>Something went wrong</span>
        <GiHazardSign className="size-auto" />
      </h2>
      <pre>{error.message}</pre>
      <button
        className="mt-4 rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-400"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
};

export default ContactPageError;
