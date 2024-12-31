'use client';

import { TownHallMeeting } from '@/app/lib/definitions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/ui/accountability/attendance-ui/card';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/app/ui/accountability/dashboard-ui/avatar';
import { Badge } from '@/app/ui/accountability/attendance-ui/badge';
import { Input } from '@/app/ui/accountability/dashboard-ui/input';
import { Button } from '@/app/ui/accountability/attendance-ui/button';
import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 7;

// helper function for badge coloring
const getAttendanceColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-green-500 hover:bg-green-600';
  if (percentage >= 50) return 'bg-yellow-500 hover:bg-yellow-600';
  return 'bg-red-500 hover:bg-red-600';
};

export const AdminParticipantsPanel = ({
  meetings,
  isLoading,
}: {
  meetings: TownHallMeeting[];
  isLoading: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modified participant data without join/leave times
  const participants = meetings.map((meeting) => ({
    id: meeting.id,
    name: 'Participant Name',
    email: 'participant@example.com',
    avatar: '/avatar-placeholder.png',
    totalDuration: meetings
      .filter((m) => m.status === 'ended')
      .reduce((total, m) => total + m.duration, 0),
    attendancePercentage: Math.floor(Math.random() * 40 + 60), // replace with calculated  actual attendance percentage
  }));

  // Filter participants based on search term
  const filteredParticipants = participants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedParticipants = filteredParticipants.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Participant Details</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 rounded-lg border p-4"
                >
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))
            : paginatedParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex flex-col space-y-3 rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={participant.avatar}
                        alt={participant.name}
                      />
                      <AvatarFallback>
                        {participant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{participant.name}</p>
                      <p className="text-xs text-gray-500">
                        {participant.email}
                      </p>
                    </div>
                    <Badge
                      className={getAttendanceColor(
                        participant.attendancePercentage,
                      )}
                    >
                      {participant.attendancePercentage}%
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <p>Total Time: {participant.totalDuration} minutes</p>
                    <p>Total Meetings: {meetings.length}</p>
                  </div>
                </div>
              ))}

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
        </div>
      </CardContent>
    </Card>
  );
};
