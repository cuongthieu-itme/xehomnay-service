"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-red-600 mb-4 animate-bounce">
            Error
          </h2>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Oops! Something went wrong
          </p>
          <p className="text-gray-600 mb-8">
            We&apos;re sorry, but it seems there was an error. Don&apos;t worry,
            we&apos;re on it!
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={reset}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
