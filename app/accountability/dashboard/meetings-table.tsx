'use client';

import { TownHallMeeting } from '@/app/lib/definitions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/accountability/dashboard-ui/table';
import { Badge } from '@/app/ui/accountability/attendance-ui/badge';
import { Input } from '@/app/ui/accountability/dashboard-ui/input';
import { Button } from '@/app/ui/accountability/attendance-ui/button';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'started':
      return 'bg-green-500 hover:bg-green-600';
    case 'waiting':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'ended':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export const AdminMeetingsTable = ({
  meetings = [],
  isLoading,
}: {
  meetings: TownHallMeeting[];
  isLoading: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Ensure meetings is an array
  const meetingsArray = Array.isArray(meetings) ? meetings : [];

  // Sort meetings by status and date
  const sortedMeetings = [...meetingsArray].sort((a, b) => {
    // First, sort by status priority (ended -> started -> waiting)
    const statusPriority = { ended: 1, started: 2, waiting: 3 };
    const statusDiff =
      (statusPriority[a.status as keyof typeof statusPriority] || 4) -
      (statusPriority[b.status as keyof typeof statusPriority] || 4);

    if (statusDiff !== 0) return statusDiff;

    // For same status, sort by date (most recent first)
    return new Date(b.start_time).getTime() - new Date(a.start_time).getTime();
  });

  const filteredMeetings = sortedMeetings.filter((meeting) =>
    meeting.topic.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredMeetings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Meeting Details</h2>
        <Input
          placeholder="Search meetings..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-64"
        />
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meeting Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Participants</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(5)].map((_, j) => (
                      <TableCell key={j}>
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : paginatedMeetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell className="font-medium">
                      {meeting.topic}
                    </TableCell>
                    <TableCell>
                      {new Date(meeting.start_time).toLocaleString()}
                    </TableCell>
                    <TableCell>{meeting.duration}m</TableCell>
                    <TableCell>
                      <Badge className={getStatusVariant(meeting.status)}>
                        {meeting.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {/* Simulated participant count - update your Zoom API integration to fetch participant counts for each meeting if you want to show actual numbers. */}
                      {Math.floor(Math.random() * 20 + 5)}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </main>
  );
};
