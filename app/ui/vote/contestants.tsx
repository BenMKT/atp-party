'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BiUpvote } from 'react-icons/bi';
import { MdModeEdit } from 'react-icons/md';
import { TfiAnnouncement } from 'react-icons/tfi';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { fetchContestants, totalContestantVotes } from '@/app/lib/data';
import { PollContestant } from '@/app/lib/definitions';
import { useParams } from 'next/navigation';
import { createVote, deleteContestant } from '@/app/lib/actions';
import { toast } from 'react-toastify';
import UpdateContestantModal from './update_contestant';
import {
  subscribeToPollContestants,
  subscribeToVotes,
} from '@/app/lib/realtime';

// display a list of contestants
const Contestants = () => {
  // get the id from the URL params
  const pageParams = useParams();
  // get the id from the URL params as a string
  const id = pageParams.id as string;
  // add state variable to store the list of contestants
  const [contestants, setContestants] = useState<PollContestant[]>([]);
  // add state variable to store the number of contestants
  const [contestantCount, setContestantCount] = useState(0);

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

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [id, contestantCount]);

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
      <div className="space-y-2">
        <h1 className="text-center text-[48px] font-[600px]">
          Contestants: {contestantCount}
        </h1>
        {/* map through the list of contestants and display each contestant */}
        <div className="mx-auto grid grid-cols-1 items-center justify-between gap-10 py-2.5 pb-10 xl:flex">
          {contestants.map((contestant: PollContestant, i) => (
            <Contestant
              key={i}
              contestant={contestant} // pass the contestant object
              onDelete={() => handleDeleteContestant(contestant.id)} // pass a function that calls handleDeleteContestant with the correct id
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
}: {
  contestant: PollContestant;
  onDelete: () => void;
}) => {
  // add state variable to store the total number of contestant votes
  const [contestantVotes, setContestantVotes] = useState(0);
  // add state variable to track whether the modal should be shown
  const [showUpdateContestantModal, setShowUpdateContestantModal] =
    useState(false);
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
  }, [contestantid]);

  // call the createVote action to create a vote for the contestant when vote button is clicked
  const handleVote = (contestantid: string, id: string) => {
    const vote = {
      contestantId: contestantid,
      pollId: id,
      userId: 'cff96f8a-da40-47b7-a8f3-9446376376c9',
    };

    createVote(vote)
      .then(() => {
        toast.success('Vote submitted successfully!!');
      })
      .catch((error: Error) => {
        toast.error('Error submitting vote!');
        console.error(error);
      });
  };

  // when button is clicked, this state variable should be set to true and when the modal is closed, it should be set back to false
  const openUpdateContestantModal = () => {
    setShowUpdateContestantModal(true);
  };

  const closeUpdateContestantModal = () => {
    setShowUpdateContestantModal(false);
  };

  return (
    <main>
      <div className="mt-5 flex items-center justify-start space-x-2 md:mx-auto md:space-x-8">
        {/* contestant image */}
        <div className="h-[229px] w-[187px] overflow-hidden rounded-[24px] sm:h-[180px] sm:w-[324px]">
          <Image
            className="h-full w-full object-cover"
            src={contestant?.avatar || '/question.jpeg'}
            alt="contestant image"
            width="100"
            height="100"
          />
        </div>
        {/* contestant details */}
        <div
          className="flex h-[229px] w-[186px] flex-col justify-center
        space-y-2 rounded-[24px] bg-[#151515] px-3 pb-2 pt-2 sm:h-fit sm:w-[253px]"
        >
          {/* contestant name */}
          <div className="flex justify-between p-2">
            <h1 className="mx-auto text-[16px] font-[600px] sm:text-[20px]">
              {contestant?.name}
            </h1>
            <div className="flex gap-[2px]">
              {/* edit button */}
              <button onClick={openUpdateContestantModal}>
                <MdModeEdit
                  size={20}
                  className="text-[#1B5CFE] transition-all duration-300 hover:scale-150 hover:text-indigo-400"
                />
              </button>
              {/* delete button */}
              <button onClick={onDelete}>
                <BsFillTrash3Fill
                  size={20}
                  className="text-[#1B5CFE] transition-all duration-300 hover:scale-150 hover:text-indigo-400"
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
            onClick={() => handleVote(contestantid, id)}
            className="mx-auto h-12 w-40 rounded-[30.5px] bg-[#1B5CFE] sm:w-52"
          >
            Vote
          </button>
          {/* vote count */}
          <div className="mx-auto flex h-[32px] items-center gap-2">
            <div className="h-[32px] w-[32px] rounded-[9px] bg-[#0E1933] px-[9px] py-[8px]">
              <BiUpvote size={20} className="text-[#1B5CFE]" />
            </div>
            <p className="text-[14px] font-[600px]">{contestantVotes} Votes</p>
          </div>
        </div>
      </div>
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
