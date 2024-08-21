import { CardWrapper } from '../ui/dashboard/cards';
import OverdueBills from '../ui/dashboard/overdue-bills';
import PendingBills from '../ui/dashboard/pending-bills';
import { lusitana } from '../ui/fonts';
import { auth } from '@/auth';
import type { Metadata } from 'next';

// add metadata title for the dashboard page
export const metadata: Metadata = {
  title: 'Dashboard',
};

// create a dashboard page component to display the dashboard content
const DashboardPage = async () => {
  // get the session data from the auth function
  const session = await auth();
  return (
    <main className="-m-8 min-h-screen bg-sky-50 p-6 sm:-m-12 md:p-12">
      <h1
        className={`${lusitana.className} mb-4 text-xl font-bold md:text-4xl`}
      >
        Dashboard
      </h1>
      <div>
        <CardWrapper />
      </div>
      {/* display the overdue and pending bills if the user is a staff or admin */}
      {session?.user?.role !== 'MEMBER' && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <OverdueBills />
          <PendingBills />
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
