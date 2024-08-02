import { fetchPolls } from '@/app/lib/data';
import type { Poll } from '@/app/lib/definitions';
import PollCard from './poll_card';

// create a component to display a list of polls using the PollCard component
const DisplayPolls = async () => {
  // get all polls from the database
  const polls = await fetchPolls();

  return (
    <main>
      <h1 className="mb-5 text-center text-[34px] font-[550px]">
        Start Voting
      </h1>
      {/* map through polls table to display all polls */}
      <div className="mx-auto grid grid-cols-1 gap-16 pb-7 sm:w-2/3 md:grid-cols-2">
        {polls.map((poll: Poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </main>
  );
};

export default DisplayPolls;
