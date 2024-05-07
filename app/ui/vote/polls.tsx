import React from 'react';
import Image from 'next/image';

// create a component to display a list of polls 
const DisplayPolls = () => {
  return (
    <div>
      <h1 className="mb-5 text-center text-[34px] font-[550px]">
        Start Voting
      </h1>

      <div className="mx-auto grid grid-cols-1 gap-[62px] pb-7 sm:w-2/3 xl:grid-cols-2">
        <Poll />
        <Poll />
        <Poll />
        <Poll />
      </div>
    </div>
  );
};
const Poll = () => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 md:grid-cols-2">
      <div
        className="grid h-[392px] w-full grid-cols-1
            justify-start gap-[10px] md:flex md:h-[280px] md:w-[580px]"
      >
        <div className="flex w-full justify-between space-y-0 sm:flex-col sm:space-y-2 md:w-[217px]">
          <Image
            src="/question.jpeg"
            alt=""
            width={160}
            height={165}
            className="rounded-[20px] object-cover md:w-full"
          />
          <Image
            src="/question.jpeg"
            alt=""
            width={160}
            height={165}
            className="rounded-[20px] object-cover md:w-full"
          />
        </div>

        <div
          className="h-[257px] w-full gap-[14px] space-y-5 rounded-[24px]
                bg-[#151515] px-[15px] py-[18px] text-white md:h-[280px] md:w-[352px] md:px-[22px]"
        >
          <h1 className="text-[18px] font-[600px]">Beauty Pagentry</h1>
          <p className="text-[14px] font-[400px]">
            A beauty pageantry is a competition that has traditionally focused
            on judging and ranking the physical...
          </p>

          <div className="flex items-center justify-between gap-[8px]">
            <div
              className="h-[26px] rounded-full bg-[#2c2c2c] px-[12px] py-[4px]
                text-[12px] font-[400px]"
            >
              Wed, Nov 23, 2023
            </div>

            <div className="flex h-[32px] w-[119px] items-center gap-[5px]">
              <div className="h-[32px] w-[32px] rounded-full bg-[#2c2c2c]"></div>
              <p className="text-[12px] font-[400px]">user.name</p>
            </div>
          </div>

          <button
            className="h-[44px] w-full rounded-full bg-[#1B5CFE] transition-all duration-300 hover:bg-blue-500"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayPolls;