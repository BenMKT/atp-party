'use client';

import { CalendarIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/app/lib/utils';
import { Button } from '@/app/ui/button';
import { TownHallBadgeProps } from '@/app/lib/definitions';

export const TownHallBadge = ({
  topic,
  startTime,
  joinUrl,
  duration,
  status,
}: TownHallBadgeProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <VideoCameraIcon className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium text-gray-900">{topic}</h3>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs ${
          status === 'waiting' ? 'bg-yellow-100 text-yellow-800' : 
          status === 'started' ? 'bg-green-100 text-green-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{formatDate(startTime)}</span>
          <span className="ml-2">({duration} min)</span>
        </div>

        <Button
          onClick={() => window.open(joinUrl, '_blank')}
          className="w-full"
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
}
