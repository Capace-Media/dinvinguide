// app/error.tsx

"use client";

import type React from "react";
import { useEffect } from "react";

// Define the types for the error and reset props
interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to the console for developers
    console.error("<Error> page: ", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-sm bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold">Oj då! Något gick fel.</h1>
        <p className="mb-6 text-gray-600">
          Det verkar som om något gick snett när vi försökte ladda sidan.
        </p>
        <p className="mb-6 text-gray-600">
          Vänligen försök att ladda om sidan, eller om problemet kvarstår, hör
          av dig till oss på{" "}
          <a
            href="mailto:info@dinvinguide.se"
            className="text-blue-500 underline"
          >
            info@dinvinguide.se
          </a>
          . Beskriv gärna vad du försökte göra så att vi kan åtgärda problemet
          så snabbt som möjligt.
        </p>
        <button
          type="button"
          onClick={reset} // Attempt to reload the page when the button is clicked
          className="rounded-sm bg-brand-primary px-4 py-2 text-white hover:bg-brand-primary/70"
        >
          Ladda om sidan
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
