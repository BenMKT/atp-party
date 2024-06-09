'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdModeEdit } from 'react-icons/md';
import ContestantModal from './create_contestant';
import { fetchPollById, totalPollVotes } from '@/app/lib/data';
import UpdatePollModal from './update_poll';
import { subscribeToPolls, subscribeToPollVotes } from '@/app/lib/realtime';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// create a component to display specific poll details using id
const PollDetails = ({ id }: { id: string }) => {
  // add state variable to store the poll details
  const [pollData, setPollData] = useState<any>({});
  // add state variable to store the total number of poll votes
  const [pollVotes, setPollVotes] = useState(0);
  // add state variables to track whether the modals should be shown
  const [showContestantModal, setShowContestantModal] = useState(false);
  const [showUpdatepollModal, setShowUpdatePollModal] = useState(false);
  // Calculate the difference in days between now and the poll's start date
  const daysToStartDate = Math.ceil(
    (new Date(pollData?.startDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  // Determine when the contest button should be disabled based on the days to the poll's start date
  const isDisabled = daysToStartDate <= 3;

  // fetch the poll details using the id passed to the component and set the poll state variable with the fetched data
  useEffect(() => {
    const fetchPoll = async () => {
      const selectedPoll = await fetchPollById(id);
      setPollData(selectedPoll);
    };
    fetchPoll();

    // fetch the total number of votes using poll id and set total votes state variable with the fetched data
    const fetchTotalVotes = async () => {
      const fetchedVotes = await totalPollVotes(id);
      setPollVotes(fetchedVotes);
    };
    fetchTotalVotes();
    // handle real-time updates for poll votes
    const handleNewVote = async () => {
      fetchTotalVotes();
    };
    // handle real-time updates for poll data
    const handleNewPoll = async () => {
      fetchPoll();
    };
    // Subscribe to real-time updates for poll votes
    const subscription = subscribeToPollVotes(id, handleNewVote);
    // Subscribe to updates in the polls data
    const pollsSubscription = subscribeToPolls(handleNewPoll);

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
      pollsSubscription.unsubscribe();
    };
  }, [id, pollVotes]);

  // when respective buttons are clicked, these state variables should be set to true and when the modals are closed, it should be set back to false

  const openContestantModal = () => {
    setShowContestantModal(true);
  };

  const closeContestantModal = () => {
    setShowContestantModal(false);
  };
  const openUpdatePollModal = () => {
    setShowUpdatePollModal(true);
  };

  const closeUpdatePollModal = () => {
    setShowUpdatePollModal(false);
  };

  // use conditional rendering and add prop to be passed to modal component
  return (
    <main className="mb-5">
      {/* poll banner image */}
      <div
        className="flex h-[240px] w-full
            items-center justify-center overflow-hidden rounded-[24px]"
      >
        <Image
          className="h-full w-full object-cover"
          src={pollData?.banner || '/flagke.jpg'}
          alt={`${pollData?.title} poll banner`}
          width={1950}
          height={838}
          priority
          layout="responsive"
          quality={100}
        />
      </div>
      {/* poll details */}
      <motion.div
        className="mx-auto mt-5 flex w-full flex-col
            items-center justify-center space-y-6 md:max-w-[736px]"
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', duration: 8, stiffness: 220 }}
      >
        {/* poll title */}
        <h1 className="text-center text-[47px] font-[600px] leading-none">
          {pollData?.title}
        </h1>
        {/* poll description */}
        <p className="text-center text-[16px] font-[500px]">
          {pollData?.description}
        </p>

        <section className=" mt-4 flex h-[136px] flex-col items-center gap-[16px]">
          {/* poll dates */}
          <div className=" flex flex-col gap-4">
            <p
              className="h-[36px] gap-[4px] rounded-full border border-gray-400 bg-lime-400 bg-opacity-20 px-[12px] py-[6px] text-center 
                text-[14px] font-[500px] md:text-[16px]"
            >
              Voting Starts: {new Date(pollData?.startDate).toLocaleString()}
            </p>
            <p
              className="h-[36px] gap-[4px] rounded-full border border-gray-400 bg-red-400 bg-opacity-20 px-[12px] py-[6px] text-center 
                text-[14px] font-[500px] md:text-[16px]"
            >
              Voting Ends: {new Date(pollData?.endDate).toLocaleString()}
            </p>
          </div>
          {/* user name */}
          <div
            className="flex h-[32px] w-[133px] items-center justify-center
                 gap-[12px] rounded-[10px] py-[20px]"
          >
            <div
              className={clsx('h-[32px] w-[32px] rounded-full', {
                'bg-yellow-500': new Date() < new Date(pollData?.startDate),
                'bg-green-500':
                  new Date() >= new Date(pollData?.startDate) &&
                  new Date() <= new Date(pollData?.endDate),
                'bg-red-500': new Date() > new Date(pollData?.endDate),
              })}
            />
            <p className="text-[14px] font-[500px]">user.name</p>
          </div>
          {/* poll contestant votes info */}
          <div className="flex h-[36px] items-center justify-center gap-[4px]">
            <button
              className="rounded-full border border-gray-400 bg-white bg-opacity-20 px-[12px]
              py-[6px] text-[12px] md:text-[16px]"
            >
              {pollVotes} Total Poll Votes
            </button>
            <button
              onClick={openUpdatePollModal}
              className="flex items-center 
                    justify-center gap-[8px] rounded-full border border-gray-400 
                    bg-white bg-opacity-20 px-[12px] py-[6px] text-[12px] transition-all duration-300 hover:bg-white hover:bg-opacity-50 hover:text-[#1B5CFE] md:text-[16px]"
            >
              <MdModeEdit size={20} className="text-[#1B5CFE]" />
              Edit poll
            </button>
          </div>
          {/* create contestant button */}
          <button
            onClick={openContestantModal}
            disabled={isDisabled}
            className={clsx(
              'min-h-11 w-[148px] rounded-full border border-gray-400 bg-green-500 py-2 text-white transition-all duration-300 hover:text-xl',
              { 'cursor-not-allowed bg-red-500': isDisabled },
            )}
          >
            <span className=" text-center text-white">Contest</span>
          </button>
        </section>
      </motion.div>
      {/* contestant modal */}
      {showContestantModal && (
        <ContestantModal onClose={closeContestantModal} />
      )}
      {/* update poll modal */}
      {showUpdatepollModal && (
        <UpdatePollModal poll_data={pollData} onClose={closeUpdatePollModal} />
      )}
    </main>
  );
};

export default PollDetails;
