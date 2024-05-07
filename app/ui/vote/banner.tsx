'use client';

import { useState } from 'react';
import CreatePollModal from './create_poll';

// create a banner component to display the page title, a brief description and a button to create a poll

const Banner = () => {
  // add a state variable to track whether the modal should be shown
  const [showModal, setShowModal] = useState(false);

  // when button is clicked, this state variable should be set to true and when the modal is closed, it should be set back to false

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    // use conditional rendering and add prop to be passed to modal component
    <>
      {showModal && <CreatePollModal onClose={closeModal} />}
      <main className="mx-auto space-y-8 text-center">
        <h1 className="text-center text-[45px] font-[600px] leading-none">
          Vote Without Rigging
        </h1>
        <p className="text-center text-[16px] font-[500px]">
          A beauty pageantry is a competition that has traditionally focused on
          judging and ranking the physical...
        </p>

        <button
          onClick={openModal}
          className="h-[45px] w-[148px] rounded-full border border-gray-400 bg-[#1B5CFE]
            text-white transition-all duration-300 hover:bg-blue-500"
        >
          Create poll
        </button>
      </main>
    </>
  );
};

export default Banner;
