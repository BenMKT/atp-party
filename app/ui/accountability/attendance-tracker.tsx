'use client'

import { useState } from 'react'
import { AttendanceScore } from './attendance-score'
import { MeetingCard } from './meeting-card'
import { MonthlyAttendanceChart } from './monthly-attendance-chart'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/accountability/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/ui/accountability/ui/select"
import { DatePickerWithRange } from "@/app/ui/accountability/date-picker-with-range"
import { DateRange } from "react-day-picker";

const meetingsData = [
  { id: 1, topic: 'Mombasa County Town Hall meeting', date: '2023-06-01', time: '10:00 AM', duration: '1h', status: 'Present' },
  { id: 2, topic: 'Mombasa County Town Hall meeting', date: '2023-06-08', time: '09:30 AM', duration: '30m', status: 'Present' },
  { id: 3, topic: 'Mombasa County Town Hall meeting', date: '2023-06-15', time: '02:00 PM', duration: '1h 30m', status: 'Absent' },
  { id: 4, topic: 'Mombasa County Projects meetings', date: '2023-06-22', time: '11:00 AM', duration: '2h', status: 'Present' },
  { id: 5, topic: 'Mombasa County Staff meetings', date: '2023-06-29', time: '03:00 PM', duration: '1h', status: 'Present' },
] as const

export function AttendanceTracker() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ 
    from: new Date(2023, 5, 1), 
    to: new Date(2023, 6, 31) 
  });
  const [meetingType, setMeetingType] = useState('all')

  const attendanceScore = 85 // This would be calculated based on actual data

  return (
    <div className="w-full p-4 space-y-8 bg-sky-50 min-h-screen">
      <Card className="bg-sky-200">
        <CardHeader>
          <CardTitle className='text-4xl font-bold'>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <AttendanceScore score={attendanceScore} />
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-auto">
          <DatePickerWithRange 
            date={dateRange} 
            setDate={(date) => setDateRange(date || { from: new Date(), to: new Date() })} 
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select value={meetingType} onValueChange={setMeetingType}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Meeting Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Meetings</SelectItem>
              <SelectItem value="project">Projects Meetings</SelectItem>
              <SelectItem value="client">County Hall Meetings</SelectItem>
              <SelectItem value="team">Staff Meetings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meetingsData.map((meeting) => (
          <MeetingCard key={meeting.id} {...meeting} />
        ))}
      </div>

      <MonthlyAttendanceChart />
    </div>
  )
}
