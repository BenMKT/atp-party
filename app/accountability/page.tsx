import { getZoomMeetings } from '@/app/lib/zoom-api';
import { TownHallBadge } from '@/app/ui/accountability/town-hall-badge';
import { lusitana } from '@/app/ui/fonts';
import { TownHallMeeting } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Ajibika',
  description: 'Virtual county hall meetings for leaders accountability',
};

// Accountability Page
const Accountability = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
    sort?: string;
    startDate?: string;
    endDate?: string;
  };
}) => {
  const session = await auth();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 12; // Number of meetings per page
  const sortOrder = searchParams?.sort === 'asc' ? 'asc' : 'desc';
  const startDate = searchParams?.startDate;
  const endDate = searchParams?.endDate;

  // Fetch paginated meetings from Zoom API with search and filters
  const { meetings, totalMeetings } = await getZoomMeetings(
    currentPage,
    pageSize,
    query,
    sortOrder,
    startDate,
    endDate,
  );
  const totalPages = Math.ceil(totalMeetings / pageSize);

  // Helper function to generate URL with current params
  const getUrlWithParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (sortOrder) params.set('sort', sortOrder);
    // Override with new params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    return `?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-sky-50 p-6 md:p-12">
      <div className="mb-8">
        <h1
          className={`${lusitana.className} text-center text-4xl font-bold text-blue-600`}
        >
          ATP Virtual County Hall Meetings
        </h1>
        <p className="mt-2 animate-pulse text-center text-xl font-medium text-gray-500">
          💚 Join our virtual county town hall meetings to engage with party
          leaders in their various jurisdictions to enhance leadership
          accessibility and promote accountability
        </p>

        {/* Search and Filter Controls */}
        <div className="mt-6 flex flex-col gap-4">
          {/* Search Form */}
          <form className="flex justify-center">
            <div className="relative flex w-full max-w-lg items-center">
              <label htmlFor="search" className="sr-only">
                Search meetings
              </label>
              <input
                type="text"
                id="search"
                name="query"
                defaultValue={query}
                placeholder="Search meetings..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-500" />
            </div>
            <Button type="submit" className="ml-4">
              Search
            </Button>
          </form>

          {/* Date Range and Sort Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <form className="flex items-center gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="mr-2 text-sm font-medium text-gray-700"
                >
                  From:
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  defaultValue={startDate}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="mr-2 text-sm font-medium text-gray-700"
                >
                  To:
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  defaultValue={endDate}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
              <Button type="submit">Apply Dates</Button>
            </form>

            <Link
              href={getUrlWithParams({
                sort: sortOrder === 'asc' ? 'desc' : 'asc',
              })}
              className="flex items-center gap-2 rounded-md border border-gray-200 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:scale-105"
            >
              Sort by Date
              {sortOrder === 'asc' ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Display county hall meetings */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {meetings.length > 0 ? (
          meetings.map((meeting: TownHallMeeting) => (
            <TownHallBadge
              key={meeting.id}
              id={meeting.id}
              topic={meeting.topic}
              startTime={meeting.start_time}
              joinUrl={meeting.join_url}
              duration={meeting.duration}
              status={meeting.status}
              session={session}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 animate-bounce">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="animate-fade-in text-xl font-medium text-red-500">
              No meetings found
              <span className="text-red-500">
                {query ? ` matching "${query}"` : ''}
              </span>
              <span className="text-red-500">
                {(startDate || endDate) && ' in the selected date range'}
              </span>
            </p>
            <p className="animate-fade-in mt-2 text-red-400">
              Try adjusting your search criteria or date range
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {meetings.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Link
            href={getUrlWithParams({ page: String(currentPage - 1) })}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          >
            <Button disabled={currentPage <= 1}>Previous</Button>
          </Link>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={getUrlWithParams({ page: String(currentPage + 1) })}
            className={
              currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
            }
          >
            <Button disabled={currentPage >= totalPages}>Next</Button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Accountability;
