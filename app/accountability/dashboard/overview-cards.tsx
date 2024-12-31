'use client';

import { useState } from 'react';
import { TownHallMeeting } from '@/app/lib/definitions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/ui/accountability/attendance-ui/card';
import { VideoIcon, TrendingUpIcon } from 'lucide-react';
import { YearFilter } from './year-filter';

export const AdminOverviewCards = ({
  meetings,
  isLoading,
}: {
  meetings: TownHallMeeting[];
  isLoading: boolean;
}) => {
  // Get unique years from meetings
  const years = Array.from(
    new Set(
      meetings.map((m) => new Date(m.start_time).getFullYear().toString()),
    ),
  ).sort((a, b) => b.localeCompare(a)); // Sort descending

  const [selectedYear, setSelectedYear] = useState('all');

  // Filter meetings by year if a specific year is selected
  const filteredMeetings =
    selectedYear === 'all'
      ? meetings
      : meetings.filter(
          (m) =>
            new Date(m.start_time).getFullYear().toString() === selectedYear,
        );

  // Filter ended and remaining meetings
  const endedMeetings = filteredMeetings.filter((m) => m.status === 'ended');
  const remainingMeetings = filteredMeetings.filter(
    (m) => m.status !== 'ended',
  );

  const stats = {
    completedMeetings: {
      total: endedMeetings.length,
      types: {
        hall: endedMeetings.filter((m) =>
          m.topic.toLowerCase().includes('hall'),
        ).length,
        project: endedMeetings.filter((m) =>
          m.topic.toLowerCase().includes('project'),
        ).length,
        staff: endedMeetings.filter((m) =>
          m.topic.toLowerCase().includes('staff'),
        ).length,
      },
    },
    remainingMeetings: {
      total: remainingMeetings.length,
      types: {
        hall: remainingMeetings.filter((m) =>
          m.topic.toLowerCase().includes('hall'),
        ).length,
        project: remainingMeetings.filter((m) =>
          m.topic.toLowerCase().includes('project'),
        ).length,
        staff: remainingMeetings.filter((m) =>
          m.topic.toLowerCase().includes('staff'),
        ).length,
      },
    },
    completionRate: endedMeetings.length
      ? Math.round((endedMeetings.length / meetings.length) * 100)
      : 0,
    totalDuration: endedMeetings.reduce(
      (acc, meeting) => acc + (meeting.duration || 0),
      0,
    ),
  };

  return (
    <main className="space-y-4">
      <div className="flex justify-end">
        <YearFilter
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          years={years}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Loading...
                </CardTitle>
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Completed Meetings
                </CardTitle>
                <VideoIcon className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.completedMeetings.total}
                </div>
                <div className="mt-2 space-y-1 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Hall Meetings:</span>
                    <span>{stats.completedMeetings.types.hall}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project Meetings:</span>
                    <span>{stats.completedMeetings.types.project}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Staff Meetings:</span>
                    <span>{stats.completedMeetings.types.staff}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Remaining Meetings
                </CardTitle>
                <VideoIcon className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.remainingMeetings.total}
                </div>
                <div className="mt-2 space-y-1 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Hall Meetings:</span>
                    <span>{stats.remainingMeetings.types.hall}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project Meetings:</span>
                    <span>{stats.remainingMeetings.types.project}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Staff Meetings:</span>
                    <span>{stats.remainingMeetings.types.staff}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <StatsCard
              title="Total Completed Meetings Duration"
              value={`${stats.totalDuration}m`}
              icon={<TrendingUpIcon className="h-4 w-4 text-purple-600" />}
            />
          </>
        )}
      </div>
    </main>
  );
};

const StatsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};
