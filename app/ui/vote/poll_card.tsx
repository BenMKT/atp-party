'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { deletePoll } from '@/app/lib/actions';
import { toast } from 'react-toastify';
import { Poll } from '@/app/lib/definitions';

// create poll cards to display poll details in each card component
const PollCard = ({ poll }: { poll: Poll }) => {
  const poll_id = poll.id;
  // call the deletePoll function when the delete button is clicked
  const handleDeletePoll = (poll_id: string) => {
    deletePoll(poll_id)
      .then(() => {
        toast.success('Poll deleted successfully!');
      })
      .catch((error: Error) => {
        toast.error('Error deleting Poll!');
        console.error(error);
      });
  };

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
            width={180}
            height={267}
            priority
            className="flex-1 rounded-[20px] object-cover"
            quality={100}
          />
        </div>
        {/* poll details card */}
        <div
          className="h-fit w-full gap-[14px] space-y-5 rounded-[24px]
                bg-[#151515] px-[15px] py-[18px] text-white md:h-[280px] md:w-[352px] md:px-[22px]"
        >
          <div className="flex justify-between">
            {/* poll title */}
            <h1 className="text-[18px] font-[600px]">{poll.title}</h1>

            {/* delete button */}
            <button onClick={() => handleDeletePoll(poll_id)}>
              <BsFillTrash3Fill
                size={15}
                className="text-end text-[#1B5CFE] transition-all duration-300 hover:scale-150 hover:text-indigo-400"
              />
            </button>
          </div>
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

export default PollCard;
