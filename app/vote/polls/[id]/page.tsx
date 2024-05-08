import NavBar from "@/app/ui/top-navbar";
import PollDetails from "@/app/ui/vote/poll_details";
import Contestants from "@/app/ui/vote/contestants";
import Footer from "@/app/ui/vote/footer";

// display specific poll details
const PollDetailsPage = () => {
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
          <PollDetails />
          <Contestants />
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default PollDetailsPage;
