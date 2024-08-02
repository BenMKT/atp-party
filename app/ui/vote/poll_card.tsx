'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { deletePoll } from '@/app/lib/actions';
import { toast } from 'react-toastify';
import { Poll } from '@/app/lib/definitions';
import ShimmerButton from '../magicui/shimmer-button';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

// create poll cards to display poll details in each card component
const PollCard = ({ poll }: { poll: Poll }) => {
  // get the session data from the useSession hook
  const session = useSession().data;

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
    <main className="mx-auto grid grid-cols-1 md:grid-cols-2">
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
          className="h-fit max-w-80 gap-[14px] space-y-5 rounded-[24px]
                bg-[#151515] px-[15px] py-[18px] text-white md:h-[280px] md:w-[352px] md:px-[22px]"
        >
          <div className="flex justify-between">
            {/* poll title */}
            <h1 className="text-[18px] font-[600px]">{poll.title}</h1>

            {/* delete button */}
            <button
              disabled={session?.user?.role === 'MEMBER'} // Disable button based on user role
              className={clsx('transition-all duration-300', {
                'text-end text-[#1B5CFE] hover:scale-150 hover:text-indigo-400':
                  session?.user?.role !== 'MEMBER', // Active styles
                'cursor-not-allowed text-red-500':
                  session?.user?.role === 'MEMBER', // Disabled styles
              })}
              onClick={() => handleDeletePoll(poll_id)}
            >
              <BsFillTrash3Fill size={18} />
            </button>
          </div>
          {/* poll description */}
          <p className="text-[14px] font-[400px]">{poll.description}</p>

          <div className="flex items-center justify-between gap-[8px]">
            {/* poll start date */}
            <div
              className="rounded-full bg-[#2c2c2c] px-[12px] py-[4px]
                text-[12px] font-[400px]"
            >
              {new Date(poll.startDate).toLocaleString()}
            </div>
            {/* user name */}
            <div className="flex h-[32px] w-[119px] items-center gap-[5px]">
              {/* TODO - replace with authenticated logged-in user name */}
              <div
                className={clsx('h-[32px] w-[32px] rounded-full', {
                  'bg-yellow-500': new Date() < new Date(poll.startDate),
                  'bg-green-500':
                    new Date() >= new Date(poll.startDate) &&
                    new Date() <= new Date(poll.endDate),
                  'bg-red-500': new Date() > new Date(poll.endDate),
                })}
              />
              <p className="text-[12px] font-[400px]">{session?.user?.name}</p>
            </div>
          </div>

          {/* redirect button */}
          <Link href={`/vote/polls/${poll.id}`}>
            <ShimmerButton className="mt-5 h-[44px] w-full rounded-full hover:scale-110 active:scale-90">
              <span className=" text-center text-white">Enter</span>
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PollCard;
