import NavBar from './ui/top-navbar';
import HomePage from './ui/homepage';

// display the landing/home page
const AppHomePage = () => {
  return (
    <main className="flex h-screen flex-col">
      <NavBar />
      <HomePage />
    </main>
  );
};

export default AppHomePage;
