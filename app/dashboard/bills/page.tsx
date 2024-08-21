import prisma from '@/prisma/prisma';
import BillsTable from './bills-table';
import Search from '@/app/ui/search';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import BillsForm from './bills-form';
import type { Metadata } from 'next';

// add metadata title for the bills page 
export const metadata: Metadata = {
  title: 'Bills',
}

// create a bills home page component to display the bills in a table
const BillsPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const members = await prisma.members.findMany();
  // authenticate the user before rendering the protected bills page
  const session = await auth();
  if (!session?.user) redirect('/login');
  // update the table component to reflect the search query
  const query = searchParams?.query || '';
  // get the current page number from the search query params
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="prose -m-8 flex min-h-screen max-w-none md:-m-12">
      <div className="-my-9 hidden bg-[url('/billsPageBG.jpg')] bg-cover bg-no-repeat md:block md:w-1/2">
        {' '}
      </div>
      <div className="overflow-x-auto bg-sky-50 p-6 md:-mb-6 md:w-1/2">
        <h1 className="text-center">ATP Invoices List</h1>
        <div className="flex gap-2">
          {/* create a search input field to filter the bills */}
          <div className="w-5/6">
            <Search placeholder="Filter Bills" />
          </div>
          {/* create a button to create a new bill conditionally rendering it based on the users role */}
          {session?.user?.role !== 'MEMBER' && (
            <div className="w-1/6">
              <BillsForm members={members} />
            </div>
          )}
        </div>
        <p className="text-md -mb-8 font-semibold text-red-500">
          N/B: This bills/invoices list is based on the search query above,
          otherwise, it will always display all invoices/bills in the party
          database belonging to the logged-in user unless the user is an admin
          or staff.
        </p>
        {/* display the bills in a table */}
        <BillsTable query={query} session={session} currentPage={currentPage} />
      </div>
    </main>
  );
};

export default BillsPage;
