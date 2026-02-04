// app/error.tsx

"use client";

import React, { useEffect } from "react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-sm shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Oj då! Något gick fel.</h1>
        <p className="text-gray-600 mb-6">
          Det verkar som om något gick snett när vi försökte ladda sidan.
        </p>
        <p className="text-gray-600 mb-6">
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
          onClick={reset} // Attempt to reload the page when the button is clicked
          className="px-4 py-2 bg-brand-primary text-white rounded-sm hover:bg-brand-primary/70"
        >
          Ladda om sidan
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
