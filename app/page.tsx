import { lusitana } from '@/app/ui/fonts';
import NavBar from './ui/top-navbar';
import { auth } from '@/auth';

// create a home page component to display the home page content
const HomePage = async () => {
  const session = await auth();
  return (
    <main>
      <NavBar />
      <div className="mt-12 p-5">
        {/* check if the user is logged in and display a welcome message */}
        {session && (
          <div
            className={`${lusitana.className} mb-3 flex items-center gap-1 font-semibold`}>
            <div className="h-[32px] w-[32px] rounded-full bg-green-400" />
            Welcome, Ambassador {session?.user?.name}, to the future!
          </div>
        )}

        <h1 className={`${lusitana.className} text-6xl font-bold`}>
          Welcome to ATP app!
        </h1>
      </div>
    </main>
  );
};

export default HomePage;
