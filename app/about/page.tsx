import AboutPageWidget from '../ui/about/aboutPage';

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
