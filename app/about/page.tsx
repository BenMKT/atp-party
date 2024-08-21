import AboutPageWidget from '../ui/about/aboutPage';
import type { Metadata } from 'next';

// add metadata title for the about page
export const metadata: Metadata = {
  title: 'About',
};

// create a component for the about page
const AboutPage = () => {
  return (
    <main>
      <div className="min-h-screen overflow-hidden bg-[url('/AboutPage1.jpeg')] bg-cover bg-center">
        <AboutPageWidget />
      </div>
    </main>
  );
};

export default AboutPage;
