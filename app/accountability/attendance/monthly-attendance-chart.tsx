'use client';

import { TownHallMeeting } from '@/app/lib/definitions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/ui/accountability/attendance-ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useState, useEffect } from 'react';

export const MonthlyAttendanceChart = ({
  meetings,
}: {
  meetings: TownHallMeeting[];
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      // Process meetings into monthly attendance data
      const monthlyData = meetings.reduce((acc: any[], meeting) => {
        const date = new Date(meeting.start_time);
        const monthYear = date.toLocaleString('en-US', {
          month: 'short',
          year: '2-digit',
        });

        const existingMonth = acc.find((item) => item.name === monthYear);
        if (existingMonth) {
          existingMonth.total += 1;
          if (meeting.status === 'ended') {
            existingMonth.present += 1;
          }
        } else {
          acc.push({
            name: monthYear,
            total: 1,
            present: meeting.status === 'ended' ? 1 : 0,
          });
        }
        return acc;
      }, []);

      // Calculate attendance percentage for each month
      const data = monthlyData.map((month) => ({
        name: month.name,
        attendance: Math.round((month.present / month.total) * 100),
      }));

      setChartData(data);
    } catch (error) {
      console.error('Error processing chart data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [meetings]);
  
  // loading ui with animation
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center">
          <div className="animate-pulse text-gray-500">
            Loading chart data...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
