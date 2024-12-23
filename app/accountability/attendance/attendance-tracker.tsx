import { getZoomMeetings } from '@/app/lib/zoom-api';
import { AttendanceScore } from './attendance-score';
import { MeetingCard } from './meeting-card';
import { MonthlyAttendanceChart } from './monthly-attendance-chart';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/ui/accountability/attendance-ui/card';
import { DatePickerWithRange } from '@/app/accountability/attendance/date-picker-with-range';
import { MeetingTypeSelect } from './meeting-type-select';

export const AttendanceTracker = async () => {
  const meetings = await getZoomMeetings();

  // Calculate attendance score based on ended meetings
  const attendanceScore =
    meetings.length > 0
      ? Math.round(
          (meetings.filter((m) => m.status === 'ended').length /
            meetings.length) *
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
          <AttendanceScore score={attendanceScore} />
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="w-full sm:w-auto">
          <DatePickerWithRange />
        </div>
        <div className="w-full sm:w-auto">
          <MeetingTypeSelect />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
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

      <MonthlyAttendanceChart meetings={meetings} />
    </div>
  );
}
