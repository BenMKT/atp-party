import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/ui/accountability/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', attendance: 80 },
  { name: 'Feb', attendance: 85 },
  { name: 'Mar', attendance: 90 },
  { name: 'Apr', attendance: 95 },
  { name: 'May', attendance: 88 },
  { name: 'Jun', attendance: 92 },
];

export function MonthlyAttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
