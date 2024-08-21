import NavBar from './ui/top-navbar';
import HomePage from './ui/homepage';
import type { Metadata } from 'next';

// add metadata title for the home page
export const metadata: Metadata = {
  title: 'Home - Accountability and Transparency Party',
  description:
    'The Accountability and Transparency Party is a Kenyan political party that is dedicated to providing a revolutionary platform where the youth, women and minority groups can always voice their opinions and participate in their nation&apos;s governance.',
  keywords: [
    'youth',
    'minority',
    'governance',
    'politics',
    'Kenya',
    'youth party',
    'pamojaTwaweza',
    'pamoja',
    'twaweza',
    'ATP',
    'accountability',
    'transparency',
    'women',
    'African youth party',
    'Kenyan youth party',
  ],
};

// create a component to display the landing/home page
const AppHomePage = () => {
  return (
    <main className="flex h-screen flex-col">
      <NavBar />
      <HomePage />
    </main>
  );
};

export default AppHomePage;
