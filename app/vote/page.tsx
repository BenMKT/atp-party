import NavBar from '../ui/top-navbar';
import Banner from '../ui/vote/banner';
import CreatePollModal from '../ui/vote/create_poll';
import DisplayPolls from '../ui/vote/polls';
import Footer from '@/app/ui/vote/footer';

// create a voting page component to display the voting page 
const VotingPage = () => {
  return (
    <main className="bg-[url('/register.jpeg')]">
      <div className="relative min-h-screen backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
        before:z-[-1] before:h-full before:w-full
        before:bg-[url('/assets/images/bg.jpeg')] before:bg-cover before:bg-no-repeat before:blur-sm"
        />

        <section className="relative space-y-16 px-5 py-10 text-white sm:p-10">
          <NavBar />
          <Banner />
          <DisplayPolls />
          <Footer />
        </section>
        <CreatePollModal />
      </div>
    </main>
  );
};

export default VotingPage;
