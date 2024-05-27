'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdModeEdit } from 'react-icons/md';
import ContestantModal from './create_contestant';
import { fetchPollById, totalPollVotes } from '@/app/lib/data';
import UpdatePollModal from './update_poll';
import { subscribeToPollVotes } from '@/app/lib/realtime';

// create a component to display specific poll details using id
const PollDetails = ({ id }: { id: string }) => {
  // add state variable to store the poll details
  const [pollData, setPollData] = useState<any>({});
  // add state variable to store the total number of poll votes
  const [pollVotes, setPollVotes] = useState(0);
  // add state variables to track whether the modals should be shown
  const [showContestantModal, setShowContestantModal] = useState(false);
  const [showUpdatepollModal, setShowUpdatePollModal] = useState(false);
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
    // Subscribe to real-time updates for poll votes
    const handleNewVote = () => {
      setPollVotes((prevVotes) => prevVotes + 1);
    };

    const subscription = subscribeToPollVotes(id, handleNewVote);

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

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
    <main>
      {/* poll banner image */}
      <div
        className="flex h-[240px] w-full
            items-center justify-center overflow-hidden rounded-[24px]"
      >
        <Image
          className="h-full w-full object-cover"
          src={pollData?.banner || '/flagke.jpg'}
          alt={`${pollData?.title} poll banner`}
          width={100}
          height={100}
        />
      </div>
      {/* poll details */}
      <div
        className="mx-auto mt-5 flex w-full flex-col
            items-center justify-center space-y-6 md:max-w-[736px]"
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
          <div
            className="h-[36px] gap-[4px] rounded-full border border-gray-400 bg-white 
                bg-opacity-20 px-[12px] py-[6px]"
          >
            <p className="text-center text-[14px] font-[500px] md:text-[16px]">
              Voting Day: {new Date(pollData?.startDate).toLocaleString()}
            </p>
          </div>
          {/* user name */}
          <div
            className="flex h-[32px] w-[133px] items-center justify-center
                 gap-[12px] rounded-[10px] py-[20px]"
          >
            <div className="h-[32px] w-[32px] rounded-full bg-[#1B5CFE]" />
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
            className="h-[45px] w-[148px] rounded-full border border-gray-400 bg-[#1B5CFE] py-2
            text-white transition-all duration-300 hover:bg-blue-500"
          >
            Contest
          </button>
        </section>
      </div>
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
