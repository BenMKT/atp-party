import AboutSideNav from '../ui/about/aboutSideNavbar';

// create a dashboard layout component with a sidebar navigation menu
const AboutPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <AboutSideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </main>
  );
};

export default AboutPageLayout;
