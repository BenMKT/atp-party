'use client';

import { useState } from 'react';
import CreatePollModal from './create_poll';
import ShimmerButton from '../magicui/shimmer-button';

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
      <main className="mx-auto space-y-8 text-center">
        <h1 className="text-center text-[45px] font-[600px] leading-none">
          Vote Without Rigging
        </h1>
        <p className="text-center text-[16px] font-semibold">
          <span className="block">
            Vote for Progress. Vote for Innovation. Vote for Your Future
          </span>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Join us, lead the charge, and together, let's build a future that's as
          bold and innovative as the youth driving it. Your ballot is your tool
          to craft the tomorrow you deserve.
        </p>
        {/* create poll button */}
        <ShimmerButton
          onClick={openModal}
          className="mx-auto h-[45px] w-[148px] rounded-full bg-[#1B5CFE]
             transition-all duration-300 hover:text-xl"
        >
          <span className="text-white">Create Poll</span>
        </ShimmerButton>
      </main>
      {showModal && <CreatePollModal onClose={closeModal} />}
    </>
  );
};

export default Banner;
