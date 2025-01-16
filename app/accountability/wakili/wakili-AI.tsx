'use client';

import React, { useState, useEffect } from 'react';
import { FaBalanceScale, FaGavel, FaBook } from 'react-icons/fa';

// Wakili AI legal assistant
const WakiliAI = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-8 px-4 text-center">
          <div className="relative">
            <FaBalanceScale className="animate-bounce text-6xl text-blue-600" />
            <div className="absolute -left-12 top-0">
              <FaGavel className="animate-ping text-4xl text-indigo-500" />
            </div>
            <div className="absolute -right-12 top-0">
              <FaBook className="animate-pulse text-4xl text-indigo-500" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Loading Legal Services
            </h2>
            <p className="text-lg text-gray-600">
              Connecting you to expert legal assistance...
            </p>
          </div>
          <div className="flex w-64 flex-col gap-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="animate-progress h-full rounded-full bg-blue-600" />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Preparing Resources</span>
              <span>Please Wait...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <iframe
        src="https://wakili.org"
        className="h-full w-full border-none"
        title="Wakili AI Website"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default WakiliAI;
