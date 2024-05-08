import Image from 'next/image';
import { BiUpvote } from 'react-icons/bi';
import { TfiAnnouncement } from 'react-icons/tfi';

// display a list of contestants
const Contestants = () => {
  return (
    <main>
      <div className="space-y-2">
        <h1 className="text-center text-[48px] font-[600px]">Contestants</h1>
        {/* map through the list of contestants and display each contestant */}
        <div className="mx-auto grid grid-cols-1 items-center justify-between gap-10 py-2.5 pb-10 xl:flex">
          <Contestant />
          <Contestant />
        </div>
      </div>
    </main>
  );
};

// create contestant cards
const Contestant = () => {
  return (
    <main>
      <div className="mt-5 flex items-center justify-start space-x-2 md:mx-auto md:space-x-8">
        {/* contestant image */}
        <div className="h-[229px] w-[187px] overflow-hidden rounded-[24px] sm:h-[180px] sm:w-[324px]">
          <Image
            className="h-full w-full object-cover"
            src="/pigbin.jpg"
            alt="contestant image"
            width="100"
            height="100"
          />
        </div>
        {/* contestant details */}
        <div
          className="flex h-[229px] w-[186px] flex-col items-center justify-center
        space-y-2 rounded-[24px] bg-[#151515] px-3 pb-2 pt-2 sm:h-fit sm:w-[253px]"
        >
          {/* contestant name */}
          <h1 className="text-[16px] font-[600px] sm:text-[20px]">
            Pigbin Odimwengu
          </h1>
          {/* contestant slogan */}
          <div
            className="flex w-full items-center justify-center
          space-x-2 rounded-[10px]"
          >
            <TfiAnnouncement className="size-6" />
            <p className="text-[14px] font-[500px]">slogan</p>
          </div>
          {/* vote button */}
          <button className="h-[48px] w-[158px] rounded-[30.5px] bg-[#1B5CFE] sm:w-[213px]">
            Vote
          </button>
          {/* vote count */}
          <div className="flex h-[32px] w-[86px] items-center justify-center gap-3">
            <div className="h-[32px] w-[32px] rounded-[9px] bg-[#0E1933] px-[9px] py-[8px]">
              <BiUpvote size={20} className="text-[#1B5CFE]" />
            </div>
            <p className="text-[14px] font-[600px]">1 vote</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contestants;
