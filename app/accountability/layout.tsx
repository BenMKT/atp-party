import SideNav from '../ui/accountability/side-navbar';

// create a dashboard layout component with a sidebar navigation menu
const AccountabilityLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </main>
  );
};

export default AccountabilityLayout;
