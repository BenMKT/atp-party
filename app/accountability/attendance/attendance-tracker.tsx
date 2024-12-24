'use client';

import { AttendanceScore } from './attendance-score';
import { MeetingCard } from './meeting-card';
import { MonthlyAttendanceChart } from './monthly-attendance-chart';
import { DateRange } from 'react-day-picker';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/ui/accountability/attendance-ui/card';
import { DatePickerWithRange } from './date-picker-with-range';
import { MeetingTypeSelect } from './meeting-type-select';
import { TownHallMeeting } from '@/app/lib/definitions';

export const AttendanceTracker = () => {
  const [meetings, setMeetings] = useState<TownHallMeeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<TownHallMeeting[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Fetch meetings
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/zoom/meetings');
        if (!response.ok) {
          throw new Error('Failed to fetch meetings');
        }
        const data = await response.json();
        setMeetings(data);
        setFilteredMeetings(data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  // Combined filter function for both date and type
  const filterMeetings = (
    meetings: TownHallMeeting[],
    type: string,
    range: DateRange | undefined,
  ) => {
    let filtered = [...meetings];

    // Apply date range filter
    if (range?.from && range?.to) {
      const endDate = new Date(range.to);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((meeting) => {
        const meetingDate = new Date(meeting.start_time);
        return meetingDate >= range.from! && meetingDate <= endDate;
      });
    }

    // Apply type filter
    if (type !== 'all') {
      filtered = filtered.filter((meeting) => {
        const topic = meeting.topic.toLowerCase();
        switch (type) {
          case 'project':
            return topic.includes('project');
          case 'hall':
            return topic.includes('hall');
          case 'staff':
            return topic.includes('staff');
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    setFilteredMeetings(filterMeetings(meetings, selectedType, newDateRange));
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setFilteredMeetings(filterMeetings(meetings, type, dateRange));
  };

  // Calculate attendance score based on filtered meetings
  const attendanceScore =
    filteredMeetings.length > 0
      ? Math.round(
          (filteredMeetings.filter((m) => m.status === 'ended').length /
            filteredMeetings.length) *
            100,
        )
      : 0;

  return (
    <div className="min-h-screen w-full space-y-8 bg-sky-50 p-4">
      <Card className="bg-sky-200">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">
            Attendance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          {isLoading ? (
            <div className="flex h-48 w-48 animate-pulse items-center justify-center rounded-full bg-gray-200 text-gray-500">
              Loading...
            </div>
          ) : (
            <AttendanceScore score={attendanceScore} />
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="w-full sm:w-auto">
          <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
        </div>
        <div className="w-full sm:w-auto">
          <MeetingTypeSelect onTypeChange={handleTypeChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? // Loading skeleton cards
            [...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                    </div>
                    <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            ))
          : filteredMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                topic={meeting.topic}
                date={new Date(meeting.start_time).toLocaleDateString()}
                time={new Date(meeting.start_time).toLocaleTimeString()}
                duration={`${meeting.duration}m`}
                status={meeting.status === 'ended' ? 'Present' : 'Absent'}
              />
            ))}
      </div>

      <MonthlyAttendanceChart
        meetings={filteredMeetings}
        isLoading={isLoading}
      />
    </div>
  );
};
