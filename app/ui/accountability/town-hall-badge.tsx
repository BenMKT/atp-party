'use client';

import { CalendarIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/app/lib/utils';
import { Button } from '@/app/ui/accountability/attendance-ui/button';
import { TownHallBadgeProps } from '@/app/lib/definitions';
import { Badge } from '@/app/ui/accountability/attendance-ui/badge';

export const TownHallBadge = ({
  topic,
  startTime,
  joinUrl,
  duration,
  status,
}: TownHallBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'started':
        return 'bg-green-500 hover:bg-green-600';
      case 'waiting':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'ended':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <main className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <VideoCameraIcon className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium text-gray-900">{topic}</h3>
        </div>
        <Badge className={getStatusColor(status)}>{status}</Badge>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{formatDate(startTime)}</span>
          <span className="ml-2">({duration} min)</span>
        </div>

        <Button
          onClick={() => window.open(joinUrl, '_blank')}
          disabled={status === 'ended'}
          className="size-sm bg-blue-600 hover:scale-105 text-white hover:bg-blue-700 disabled:bg-gray-300"
        >
          Join Meeting
        </Button>
      </div>
    </main>
  );
};
