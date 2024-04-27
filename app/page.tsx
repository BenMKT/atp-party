import { lusitana } from '@/app/ui/fonts';
import NavBar from './ui/top-navbar';

// create a home page component to display the home page content
const HomePage = () => {
  return (
    <main>
      <NavBar />
      <div className="mt-12 p-5">
        <h1 className={`${lusitana.className} text-6xl font-bold`}>
          Welcome to ATP app!
        </h1>
      </div>
    </main>
  );
};

export default HomePage;
