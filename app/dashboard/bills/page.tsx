import { PrismaClient } from '@prisma/client';
import BillsTable from './bills-table';
import { CreateBill } from './buttons';
import Search from '@/app/ui/search';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

// create a bills home page component to display the bills in a table
const BillsPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  // authenticate the user before rendering the protected bills page
  const session = await auth();
  if (!session?.user) redirect('/login');
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
      <p className="text-md -mb-8 text-red-500">
        N/B: This bills/invoices result list is based on the search criteria
        input above, otherwise, it will display all invoices/bills in the party
        database:
      </p>
      <BillsTable query={query} currentPage={currentPage} />
    </main>
  );
};

export default BillsPage;
