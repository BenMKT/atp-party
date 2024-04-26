import { CardWrapper } from '../ui/dashboard/cards';
import OverdueBills from '../ui/dashboard/overdue-bills';
import PendingBills from '../ui/dashboard/pending-bills';
import { lusitana } from '../ui/fonts';

// create a dashboard page component to display the dashboard content
const DashboardPage = () => {
  return (
    <main>
      <h1
        className={`${lusitana.className} mb-4 text-xl font-bold md:text-4xl`}>
        Dashboard
      </h1>
      <div>
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OverdueBills />
        <PendingBills />
      </div>
    </main>
  );
};

export default DashboardPage;
