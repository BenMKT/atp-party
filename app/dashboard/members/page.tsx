import Link from 'next/link';
import Search from '@/app/ui/search';
import MembersTable from './members-table';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/app/ui/button';

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
    <main className="prose relative -m-8 flex min-h-screen max-w-none bg-[url('/membersPageBG.jpeg')] bg-cover bg-center bg-no-repeat p-6 sm:-m-12 md:p-12 ">
      {/* Overlay to ensure content is visible on top of the video */}
      <div className="absolute inset-0 z-10 overflow-hidden bg-black bg-opacity-50" />
      {/* Content */}
      <div className="z-30 mx-auto overflow-hidden rounded-lg bg-sky-50 bg-opacity-50 p-6">
        <h1 className="text-center">ATP Membership List</h1>
        <Search placeholder="Search Members..." />
        <p className="text-md text-wrap rounded-xl bg-sky-50 bg-opacity-40 p-2 text-center font-semibold text-red-600">
          N/B: Below membership list is based on the search query specified
          above, otherwise, all members in the party database will be displayed
        </p>
        <MembersTable query={query} currentPage={currentPage} />
        <div className="not-prose flex justify-end">
          <Link href="./members/register">
            <Button>Register New Member</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MembersPage;
