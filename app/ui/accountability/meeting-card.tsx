import { Card, CardContent } from '@/app/ui/accountability/attendance-ui/card';
import { Badge } from '@/app/ui/accountability/attendance-ui/badge';
import { CalendarIcon, ClockIcon } from 'lucide-react';

interface MeetingCardProps {
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: 'Present' | 'Absent';
}

export function MeetingCard({
  topic,
  date,
  time,
  duration,
  status,
}: MeetingCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <h3 className="mb-2 font-semibold">{topic}</h3>
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <ClockIcon className="mr-2 h-4 w-4" />
          <span>
            {time} ({duration})
          </span>
        </div>
        <Badge
          variant={status === 'Present' ? 'default' : 'destructive'}
          className={
            status === 'Present' ? 'bg-green-500 hover:bg-green-600' : ''
          }
        >
          {status}
        </Badge>
      </CardContent>
    </Card>
  );
}
