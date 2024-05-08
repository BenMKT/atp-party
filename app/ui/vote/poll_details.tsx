'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MdModeEdit } from 'react-icons/md';
import ContestantModal from './create_contestant';
import CreatePollModal from './create_poll';

// create a component to display specific poll details
const PollDetails = () => {
  // add state variables to track whether the modals should be shown
   const [showCreatePollModal, setShowCreatePollModal] = useState(false);
   const [showContestantModal, setShowContestantModal] = useState(false);

  // when respective buttons are clicked, these state variables should be set to true and when the modals are closed, it should be set back to false

  const openCreatePollModal = () => {
    setShowCreatePollModal(true);
  };

  const closeCreatePollModal = () => {
    setShowCreatePollModal(false);
  };

  const openContestantModal = () => {
    setShowContestantModal(true);
  };

  const closeContestantModal = () => {
    setShowContestantModal(false);
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
          src="/kenyaflagbanner.png"
          alt=""
          width="100"
          height="100"
        />
      </div>
      {/* poll details */}
      <div
        className="mx-auto mt-5 flex w-full flex-col
            items-center justify-center space-y-6 md:max-w-[736px]"
      >
        {/* poll title */}
        <h1 className="text-center text-[47px] font-[600px] leading-none">
          Presidential Nominations
        </h1>
        {/* poll description */}
        <p className="text-center text-[16px] font-[500px]">
          A beauty pageantry is a competition that has traditionally focused on
          judging and ranking the physical...
        </p>

        <section className=" mt-4 flex h-[136px] flex-col items-center gap-[16px]">
          {/* poll dates */}
          <div
            className="h-[36px] gap-[4px] rounded-full border border-gray-400 bg-white 
                bg-opacity-20 px-[12px] py-[6px]"
          >
            <p className="text-center text-[14px] font-[500px] md:text-[16px]">
              Wed, Nov 23, 2026 - Fri, Dec 23, 2026
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
              1 Vote
            </button>
            <button
              className="rounded-full border 
                    border-gray-400 bg-white bg-opacity-20 px-[12px] py-[6px] text-[12px] md:text-[16px]"
            >
              2 contestants
            </button>
            <button
              onClick={openCreatePollModal}
              className="flex items-center 
                    justify-center gap-[8px] rounded-full border border-gray-400 
                    bg-white bg-opacity-20 px-[12px] py-[6px] text-[12px] transition-all duration-300 hover:bg-white hover:text-[#1B5CFE] md:text-[16px] hover:bg-opacity-50"
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
      {showCreatePollModal && (
        <CreatePollModal onClose={closeCreatePollModal} />
      )}
    </main>
  );
};

export default PollDetails;
