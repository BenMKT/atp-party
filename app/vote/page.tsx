import { auth } from '@/auth';
import NavBar from '../ui/top-navbar';
import Banner from '../ui/vote/banner';
import DisplayPolls from '../ui/vote/polls';
import Footer from '@/app/ui/vote/footer';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

// add metadata title for the vote page
export const metadata: Metadata = {
  title: 'Vote',
};

// create a voting page component to display the voting page
const VotingPage = async () => {
  // get the session data from the auth function
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <main className="bg-[url('/register.jpeg')]">
      <div className="relative min-h-screen backdrop-blur">
        {/* Overlay to ensure content is visible on top of the background */}
        <div className="absolute z-10 min-h-full w-full bg-black bg-opacity-50" />
        <section className="relative z-20 space-y-16 px-5 py-10 text-white sm:p-10">
          <NavBar />
          <Banner />
          <DisplayPolls />
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default VotingPage;
