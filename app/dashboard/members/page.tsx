import Link from 'next/link';
import Search from '@/app/ui/search';
import MembersTable from './members-table';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const MembersPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  // authenticate the user before rendering the protected members page
  const session = await auth();
  if (!session?.user) redirect('/login');
  // display all the members in a table from the database based on the search query params if any exists in the URL
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="prose flex flex-col sm:mx-auto sm:max-w-6xl">
      <h1>ATP Membership List</h1>
      <Search placeholder="Filter Members..." />
      <p className="text-md text-red-500">
        N/B: This membership result list is based on the search criteria input
        above, otherwise, it will display all members in the party database:
      </p>
      <MembersTable query={query} currentPage={currentPage} />
      <div className="flex justify-end">
        <button>
          <Link
            href="./members/register"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white no-underline transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Register New Member
          </Link>
        </button>
      </div>
    </main>
  );
};

export default MembersPage;
