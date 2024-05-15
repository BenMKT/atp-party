import Image from 'next/image';
import Link from 'next/link';
import { fetchPolls } from '@/app/lib/data';
import type { Poll } from '@/app/lib/definitions';

// create a component to display a list of polls
const DisplayPolls = async () => {
  // get all polls from the database
  const polls = await fetchPolls();

  return (
    <div>
      <h1 className="mb-5 text-center text-[34px] font-[550px]">
        Start Voting
      </h1>
      {/* map through polls table to display all polls */}
      <div className="mx-auto grid grid-cols-1 gap-16 pb-7 sm:w-2/3 xl:grid-cols-2">
        {polls.map((poll: Poll) => (
          <Poll key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
};

// create poll cards
const Poll = ({ poll }: { poll: Poll }) => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 md:grid-cols-2">
      <div
        className="grid h-[392px] w-full grid-cols-1
            justify-start gap-[10px] md:flex md:h-[280px] md:w-[580px]"
      >
        {/* poll images card */}
        <div className="aspect-h-0 aspect-w-1 flex w-full overflow-hidden md:aspect-h-1 md:aspect-w-16 md:w-56">
          <Image
            src={poll.banner || '/flagke.jpg'}
            alt="poll banner"
            width={160}
            height={165}
            className="flex-1 rounded-[20px] object-cover"
          />
        </div>
        {/* poll details card */}
        <div
          className="h-fit w-full gap-[14px] space-y-5 rounded-[24px]
                bg-[#151515] px-[15px] py-[18px] text-white md:h-[280px] md:w-[352px] md:px-[22px]"
        >
          {/* poll title */}
          <h1 className="text-[18px] font-[600px]">{poll.title}</h1>
          {/* poll description */}
          <p className="text-[14px] font-[400px]">{poll.description}</p>

          <div className="flex items-center justify-between gap-[8px]">
            {/* poll start date */}
            <div
              className="h-[26px] rounded-full bg-[#2c2c2c] px-[12px] py-[4px]
                text-[12px] font-[400px]"
            >
              {new Date(poll.startDate).toLocaleString()}
            </div>
            {/* user name */}
            <div className="flex h-[32px] w-[119px] items-center gap-[5px]">
              <div className="h-[32px] w-[32px] rounded-full bg-[#2c2c2c]"></div>
              <p className="text-[12px] font-[400px]">user.name</p>
            </div>
          </div>

          {/* redirect button */}
          <Link href={`/vote/polls/${poll.id}`}>
            <button className="mt-5 h-[44px] w-full rounded-full bg-[#1B5CFE] transition-all duration-300 hover:bg-blue-500">
              Enter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayPolls;
