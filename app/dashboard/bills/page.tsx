import { PrismaClient } from '@prisma/client';
import BillsTable from './bills-table';
import { CreateBill } from './buttons';
import Search from '@/app/ui/search';

const prisma = new PrismaClient();

// create a bills home page component to display the bills in a table
const BillsPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  // update the table component to reflect the search query
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="prose mx-auto flex w-fit max-w-5xl flex-col pr-5">
      <h1>ATP Invoices List</h1>
      <div className="flex gap-2">
        <Search placeholder="Filter Bills" />
        <CreateBill />
      </div>
      <p className="text-md text-red-500 -mb-8">
        N/B: This bills/invoices result list is based on the search criteria
        input above, otherwise, it will display all invoices/bills in the party database:
      </p>
      <BillsTable query={query} currentPage={currentPage} />
    </main>
  );
};

export default BillsPage;
