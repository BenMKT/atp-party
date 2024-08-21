import NavBar from '@/app/ui/top-navbar';
import PollDetails from '@/app/ui/vote/poll_details';
import Contestants from '@/app/ui/vote/contestants';
import Footer from '@/app/ui/vote/footer';
import type { Metadata } from 'next';

// add metadata title for the poll details page 
export const metadata: Metadata = {
  title: 'Poll Details',
}

// display specific poll details by pollId using page params
const PollDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <main>
      <div className="relative min-h-screen backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
          before:z-[-1] before:h-full before:w-full
          before:bg-[url('/votebg.jpeg')] before:bg-cover before:bg-no-repeat before:blur-sm"
        ></div>

        <section className="relative space-y-16 px-5 py-10 text-white sm:p-10">
          <NavBar />
          <PollDetails id={id} />
          <Contestants />
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default PollDetailsPage;
