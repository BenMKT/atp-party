'use client';

import { useState } from 'react';
import CreatePollModal from './create_poll';
import ShimmerButton from '../magicui/shimmer-button';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';

// create a banner component to display the page title, a brief description and a button to create a poll
const Banner = () => {
  // add a state variable to track whether the modal should be shown
  const [showModal, setShowModal] = useState(false);
  // get the session object from the useSession hook
  const session = useSession().data;
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
          <span className="mb-3 block">
            Vote for Transparency, Vote for Innovation, Vote for Your Future.
          </span>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Join us, lead the charge, and together, let's build a future that's as
          bold and innovative as the youth driving it.
          <span className="mt-3 block">
            Your ballot is your tool to craft the tomorrow you deserve.
          </span>
        </p>
        {/* create poll button */}
        <ShimmerButton
          onClick={openModal}
          disabled={session?.user?.role === 'MEMBER'} // Disable button based on user role
          className={clsx('mx-auto hover:scale-110 active:scale-90', {
            ' h-[45px] w-[148px] rounded-full':
              session?.user?.role !== 'MEMBER', // Active styles
            hidden: session?.user?.role === 'MEMBER', // Disabled styles
          })}
        >
          <span className="text-white">Create Poll</span>
        </ShimmerButton>
      </main>
      {showModal && <CreatePollModal onClose={closeModal} />}
    </>
  );
};

export default Banner;
