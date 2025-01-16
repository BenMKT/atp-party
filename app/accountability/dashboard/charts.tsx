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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { fetchMembers } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { YearFilter } from './year-filter';

// Custom tooltip for the stacked bars
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-2 shadow-sm">
        <p className="font-medium">{payload[0].payload.county}</p>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex justify-between gap-2">
            <span className="text-sm">{entry.name}:</span>
            <span className="text-sm font-medium">{entry.value}</span>
          </div>
        ))}
        <div className="mt-1 text-sm font-medium">
          Total:{' '}
          {payload.reduce((sum: number, entry: any) => sum + entry.value, 0)}
        </div>
      </div>
    );
  }
  return null;
};

export const AdminCharts = ({
  meetings = [],
  isLoading,
}: {
  meetings: TownHallMeeting[];
  isLoading: boolean;
}) => {
  const meetingsArray = Array.isArray(meetings) ? meetings : [];

  const years = Array.from(
    new Set(
      meetingsArray.map((m) => new Date(m.start_time).getFullYear().toString()),
    ),
  ).sort((a, b) => b.localeCompare(a));

  const [selectedYear, setSelectedYear] = useState('all');

  // Filter meetings by year
  const filteredMeetings =
    selectedYear === 'all'
      ? meetingsArray
      : meetingsArray.filter(
          (m) =>
            new Date(m.start_time).getFullYear().toString() === selectedYear,
        );

  const [members, setMembers] = useState<any[]>([]);

  // Fetch members data when component mounts
  useEffect(() => {
    const getMembers = async () => {
      try {
        const membersData = await fetchMembers();
        setMembers(Array.isArray(membersData) ? membersData : []);
      } catch (error) {
        console.error('Error fetching members:', error);
        setMembers([]);
      }
    };
    getMembers();
  }, []);

  // Filter ended meetings for all charts except meetings table
  const endedMeetings = filteredMeetings.filter((m) => m.status === 'ended');

  // Process data for monthly trend chart - using only ended meetings
  const monthlyData = endedMeetings
    .reduce((acc: any[], meeting) => {
      const date = new Date(meeting.start_time);
      const monthYear = date.toLocaleString('en-US', {
        month: 'short',
        year: '2-digit',
      });

      const existingMonth = acc.find((item) => item.name === monthYear);
      if (existingMonth) {
        existingMonth.total += 1;
        if (meeting.status === 'ended') existingMonth.completed += 1;
      } else {
        acc.push({
          name: monthYear,
          total: 1,
          completed: meeting.status === 'ended' ? 1 : 0,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      // Sort by date to ensure chronological order
      const [aMonth, aYear] = a.name.split(' ');
      const [bMonth, bYear] = b.name.split(' ');
      const dateA = new Date(
        2000 + parseInt(aYear),
        new Date(Date.parse(`${aMonth} 1, 2000`)).getMonth(),
      );
      const dateB = new Date(
        2000 + parseInt(bYear),
        new Date(Date.parse(`${bMonth} 1, 2000`)).getMonth(),
      );
      return dateA.getTime() - dateB.getTime();
    });

  // Pie chart data - using only ended meetings vs all meetings
  const pieData = [
    {
      name: 'Completed',
      value: endedMeetings.length,
    },
    {
      name: 'Pending',
      value: filteredMeetings.length - endedMeetings.length,
    },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  // Process county-wise meeting data with participant information
  //   const countyMeetingStats = endedMeetings.reduce((acc: any, endedMeeting) => {
  //     // Get all unique counties from meeting participants
  //     const meetingParticipants = endedMeeting.participants || [];
  //     const participantCounties = meetingParticipants.map((participant) =>
  //       getParticipantCounty(participant.name),
  //     );

  //     // Determine meeting type
  //     const meetingType = endedMeeting.topic.toLowerCase().includes('hall')
  //       ? 'hall'
  //       : endedMeeting.topic.toLowerCase().includes('project')
  //         ? 'project'
  //         : 'staff';

  //     // Count meetings for each county
  //     participantCounties.forEach((county) => {
  //       if (!acc[county]) {
  //         acc[county] = { county, hall: 0, project: 0, staff: 0 };
  //       }
  //       acc[county][meetingType]++;
  //     });

  //     return acc;
  //   }, {});

  //   // Convert to array and sort by total meetings
  //   const countyData = Object.values(countyMeetingStats)
  //     .map((data: any) => ({
  //       ...data,
  //       total: data.hall + data.project + data.staff,
  //     }))
  //     .sort((a: any, b: any) => b.total - a.total);

  // Hardcoded county data for demonstration
  const countyData = [
    {
      county: 'Nairobi',
      hall: 15,
      project: 8,
      staff: 12,
      total: 35,
    },
    {
      county: 'Mombasa',
      hall: 10,
      project: 6,
      staff: 8,
      total: 24,
    },
    {
      county: 'Kisumu',
      hall: 8,
      project: 5,
      staff: 7,
      total: 20,
    },
  ].sort((a, b) => b.total - a.total);

  const CATEGORY_COLORS = {
    hall: '#4f46e5', // Indigo
    staff: '#0891b2', // Cyan
    project: '#059669', // Emerald
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

      <div className="grid gap-4 md:grid-cols-2">
        {/* Completed Meetings Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Meetings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] animate-pulse bg-gray-200" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#0088FE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card>
          <CardHeader>
            <CardTitle>Meeting Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] animate-pulse bg-gray-200" />
            ) : (
              <>
                <div className="mb-2 text-center">
                  <span className="text-sm text-gray-500">
                    Total Meetings:{' '}
                  </span>
                  <span className="font-medium">{filteredMeetings.length}</span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </>
            )}
          </CardContent>
        </Card>

        {/* County-wise Meeting Distribution Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>County-wise Meeting Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[400px] animate-pulse bg-gray-200" />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={countyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="county" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="hall"
                    stackId="meetings"
                    fill={CATEGORY_COLORS.hall}
                    name="Hall Meetings"
                  >
                    {countyData.map((entry, index) => (
                      <Cell key={`cell-${index}`}>
                        {entry.hall > 0 && (
                          <text
                            x={0}
                            y={0}
                            dy={15}
                            textAnchor="middle"
                            fill="#fff"
                          >
                            {entry.hall}
                          </text>
                        )}
                      </Cell>
                    ))}
                  </Bar>
                  <Bar
                    dataKey="project"
                    stackId="meetings"
                    fill={CATEGORY_COLORS.project}
                    name="Project Meetings"
                  >
                    {countyData.map((entry, index) => (
                      <Cell key={`cell-${index}`}>
                        {entry.project > 0 && (
                          <text
                            x={0}
                            y={0}
                            dy={15}
                            textAnchor="middle"
                            fill="#fff"
                          >
                            {entry.project}
                          </text>
                        )}
                      </Cell>
                    ))}
                  </Bar>
                  <Bar
                    dataKey="staff"
                    stackId="meetings"
                    fill={CATEGORY_COLORS.staff}
                    name="Staff Meetings"
                  >
                    {countyData.map((entry, index) => (
                      <Cell key={`cell-${index}`}>
                        {entry.staff > 0 && (
                          <text
                            x={0}
                            y={0}
                            dy={15}
                            textAnchor="middle"
                            fill="#fff"
                          >
                            {entry.staff}
                          </text>
                        )}
                      </Cell>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
