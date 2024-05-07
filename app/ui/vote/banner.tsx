import React from 'react';

// create a banner component to display the page title, a brief description and a button to create a poll
const Banner = () => {
  return (
    <main className="mx-auto space-y-8 text-center">
      <h1 className="text-center text-[45px] font-[600px] leading-none">
        Vote Without Rigging
      </h1>
      <p className="text-center text-[16px] font-[500px]">
        A beauty pageantry is a competition that has traditionally focused on
        judging and ranking the physical...
      </p>

      <button
        className="h-[45px] w-[148px] rounded-full border border-gray-400 bg-[#1B5CFE]
            text-white transition-all duration-300 hover:bg-blue-500"
      >
        Create poll
      </button>
    </main>
  );
};

export default Banner;
