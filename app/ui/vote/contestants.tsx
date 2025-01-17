'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BiUpvote } from 'react-icons/bi';
import { MdModeEdit } from 'react-icons/md';
import { TfiAnnouncement } from 'react-icons/tfi';
import { BsFillTrash3Fill } from 'react-icons/bs';
import {
  contestantsVotes,
  fetchContestants,
  fetchPollById,
  totalContestantVotes,
} from '@/app/lib/data';
import { Poll, PollContestant } from '@/app/lib/definitions';
import { useParams } from 'next/navigation';
import { createVote, deleteContestant } from '@/app/lib/actions';
import { toast } from 'react-toastify';
import UpdateContestantModal from './update_contestant';
import {
  subscribeToPollContestants,
  subscribeToVotes,
} from '@/app/lib/realtime';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

// display a list of contestants
const Contestants = () => {
  // get the session object from the useSession hook
  const session = useSession().data;
  // get the id from the URL params
  const pageParams = useParams();
  // get the id from the URL params as a string
  const id = pageParams.id as string;
  // add state variable to store the list of contestants
  const [contestants, setContestants] = useState<PollContestant[]>([]);
  // add state variable to store the number of contestants
  const [contestantCount, setContestantCount] = useState(0);
  // add state variable to track whether the user has voted
  const [hasVoted, setHasVoted] = useState(false);

  // fetch the list of contestants using the poll id passed to the component
  useEffect(() => {
    const fetchPollContestants = async () => {
      const pollcontestants = await fetchContestants(id);
      setContestants(pollcontestants);
      // set the contestantCount state to the length of the contestants array
      setContestantCount(pollcontestants.length);
    };
    // get initial list of contestants on page load
    fetchPollContestants();

    // on new contestant, update/revalidate the list of contestants
    const handleNewContestant = () => {
      fetchPollContestants();
    };
    // call subscribeToPollContestants function to subscribe to Contestants table
    const subscription = subscribeToPollContestants(id, handleNewContestant);

    // Retrieve vote state from localStorage
    const voteState = localStorage.getItem(
      `hasVoted_${session?.user?.id}-${id}`,
    );
    if (voteState === 'true') {
      setHasVoted(true);
    }

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [id, contestantCount, session?.user?.id]);

  // call the deleteContestant action to delete contestant when delete button is clicked
  const handleDeleteContestant = (contestantId: string) => {
    deleteContestant(contestantId)
      .then(() => {
        if (contestants) {
          // filter out the deleted contestant from the list of contestants
          const updatedContestants = contestants.filter(
            (contestant) => contestant.id !== contestantId,
          );
          // update the list of contestants and the contestant count states
          setContestants(updatedContestants);
          setContestantCount(updatedContestants.length);
        }
        toast.success('Contestant deleted successfully!');
      })
      .catch((error: Error) => {
        toast.error('Error deleting Contestant!');
        console.error(error);
      });
  };

  // use conditional rendering and add prop to be passed to modal component
  return (
    <main>
      <div className="mt-36 space-y-2">
        <motion.h1
          className="text-center text-[48px] font-[600px]"
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            delay: 5,
            duration: 10,
            stiffness: 220,
          }}
        >
          Contestants: {contestantCount}
        </motion.h1>
        {/* map through the list of contestants and display each contestant */}
        <div className="container mx-auto grid grid-cols-1 gap-10 pb-10 md:grid-cols-2">
          {contestants.map((contestant: PollContestant, i) => (
            <Contestant
              key={i}
              contestant={contestant} // pass the contestant object
              onDelete={() => handleDeleteContestant(contestant.id)} // pass a function that calls handleDeleteContestant with the correct id
              hasVoted={hasVoted}
              setHasVoted={setHasVoted}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

// create contestant cards
const Contestant = ({
  contestant,
  onDelete,
  hasVoted,
  setHasVoted,
}: {
  contestant: PollContestant;
  onDelete: () => void;
  hasVoted: boolean;
  setHasVoted: (value: boolean) => void;
}) => {
  // get the session object from the useSession hook
  const session = useSession().data;
  // add state variable to store the total number of contestant votes
  const [contestantVotes, setContestantVotes] = useState(0);
  // add state variable to track whether the modal should be shown
  const [showUpdateContestantModal, setShowUpdateContestantModal] =
    useState(false);
  // add state variable to store the poll object
  const [poll, setPoll] = useState<Poll | undefined | null>(undefined);
  // get the contestant id from the contestant object
  const contestantid = contestant.id;
  // get the id from the URL params
  const pageParams = useParams();
  // get the id from the URL params as a string
  const id = pageParams.id as string;
  // fetch the total number of votes for the contestant using the contestant id

  useEffect(() => {
    const fetchTotalContestantVotes = async () => {
      const fetchedVotes = await totalContestantVotes(contestantid);
      setContestantVotes(fetchedVotes);
    };
    // get initial votes count on page load
    fetchTotalContestantVotes();

    // fetch the list of votes for the contestant using the contestant id
    const fetchContestantVotes = async () => {
      const fetchedVotes = await contestantsVotes(contestantid);
      // Check if the current session user has already voted for this contestant
      const hasCurrentUserVoted = fetchedVotes.some(
        (vote) => vote.userId === session?.user?.id,
      );

      if (hasCurrentUserVoted) {
        setHasVoted(true); // Disable the vote button since the user has already voted
      }
    };
    // get initial votes list on page load
    fetchContestantVotes();

    const fetchPoll = async () => {
      const fetchedPoll = await fetchPollById(id);
      setPoll(fetchedPoll);
    };
    // get initial poll on page load
    fetchPoll();

    // on new vote, update/revalidate the initial votes count
    const handleNewVote = () => {
      fetchTotalContestantVotes();
    };
    // call the subscribeToVotes function to subscribe to votes
    const subscription = subscribeToVotes(contestantid, handleNewVote);

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [id, contestantid, session?.user?.id, setHasVoted]);

  // create a vote object
  const vote = {
    contestantId: contestantid,
    pollId: id,
    userId: session?.user?.id as string,
  };

  // call the createVote action to create a vote for the contestant when vote button is clicked
  const handleVote = () => {
    createVote(vote)
      .then(() => {
        toast.success('Vote submitted successfully!!');
        setHasVoted(true);
        localStorage.setItem(`hasVoted_${session?.user?.id}-${id}`, 'true'); // store vote state in localStorage
      })
      .catch((error: Error) => {
        toast.error('Error submitting vote!');
        console.error(error);
      });
  };

  // variable to track whether the vote button should be disabled
  const isDisabled: boolean = !!(
    hasVoted ||
    (poll && new Date() < new Date(poll.startDate)) ||
    (poll && new Date() > new Date(poll.endDate))
  );

  // when button is clicked, this state variable should be set to true and when the modal is closed, it should be set back to false
  const openUpdateContestantModal = () => {
    setShowUpdateContestantModal(true);
  };

  const closeUpdateContestantModal = () => {
    setShowUpdateContestantModal(false);
  };

  return (
    <main>
      <motion.div
        className="mt-5 flex grow items-center space-x-2 md:mx-auto md:space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 5,
          duration: 10,
        }}
      >
        {/* contestant image */}
        <div className="min-h-[229px] w-[187px] overflow-hidden rounded-[24px] sm:h-[190px] sm:w-[234px]">
          <Image
            className="min-h-[229px] min-w-[187px] object-cover "
            src={contestant?.avatar || '/question.jpeg'}
            alt="contestant image"
            width={234}
            height={229}
            priority
            sizes="(max-width: 640px) 187px, 234px"
          />
        </div>
        {/* contestant details */}
        <div
          className="flex min-h-[229px] w-[300px] flex-col justify-center
        space-y-2 rounded-[24px] bg-[#151515] px-3 pb-2 pt-2 sm:h-fit"
        >
          {/* contestant name */}
          <div className="flex justify-between p-2">
            <h1 className="text-[16px] font-[600px] sm:text-[20px]">
              {contestant?.name}
            </h1>
            <div className="flex gap-[2px]">
              {/* edit button */}
              <button
                disabled={session?.user?.id !== contestant.userId}
                onClick={openUpdateContestantModal}
                aria-label="Edit contestant"
              >
                <MdModeEdit
                  size={20}
                  className={clsx('transition-all duration-300', {
                    'text-[#1B5CFE] hover:scale-150 hover:text-indigo-400':
                      session?.user?.id === contestant.userId, // Active styles
                    'cursor-not-allowed text-red-500':
                      session?.user?.id !== contestant.userId, // Disabled styles
                  })}
                />
              </button>
              {/* delete button */}
              <button
                onClick={onDelete}
                disabled={session?.user?.role === 'MEMBER'} // Disable button based on user role
                aria-label="Delete contestant"
                className={clsx('transition-all duration-300', {
                  'text-[#1B5CFE] hover:scale-150 hover:text-indigo-400':
                    session?.user?.role !== 'MEMBER', // Active styles
                  'cursor-not-allowed text-red-500':
                    session?.user?.role === 'MEMBER', // Disabled styles
                })}
              >
                <BsFillTrash3Fill
                  size={20}
                  className="transition-all duration-300"
                />
              </button>
            </div>
          </div>
          {/* contestant slogan */}
          <div
            className="flex w-full items-center justify-center
          space-x-2 rounded-[10px]"
          >
            <TfiAnnouncement className="size-6" />
            <p className="text-[14px] font-[500px]">{contestant?.slogan}</p>
          </div>
          {/* vote button */}
          <button
            disabled={isDisabled}
            onClick={() => handleVote()}
            className={clsx(
              'z-10 flex h-10 w-[95%] items-center justify-center rounded-full bg-green-500 hover:scale-105 active:scale-95 origin-left',
              {
                'cursor-not-allowed bg-red-500 ': isDisabled,
              },
            )}
          >
            <span className=" text-center text-white">Vote</span>
          </button>
          {/* vote count */}
          <div className="mx-auto flex h-[32px] items-center gap-2 align-middle">
            <div className="h-[32px] w-[32px] rounded-[9px] bg-[#0E1933] px-[9px] py-[8px]">
              <BiUpvote size={20} className="text-[#1B5CFE]" />
            </div>
            <p className="text-[14px] font-[600px]">{contestantVotes} Votes</p>
          </div>
        </div>
      </motion.div>
      {/* update contestant modal */}
      {showUpdateContestantModal && (
        <UpdateContestantModal
          contestant={contestant}
          onClose={closeUpdateContestantModal}
        />
      )}
    </main>
  );
};

export default Contestants;
