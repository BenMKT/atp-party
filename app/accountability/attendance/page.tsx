import { AttendanceTracker } from '@/app/accountability/attendance/attendance-tracker';

export const metadata = {
  title: 'Attendance Tracker',
  description: 'Attendance tracker for tracking leaders accountability',
};

// Attendance Tracker Page
const Attendance = async () => {
  return <AttendanceTracker />;
};

export default Attendance;
