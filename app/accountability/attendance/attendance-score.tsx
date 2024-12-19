'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/app/ui/accountability/attendance-ui/progress';
import clsx from 'clsx';

interface AttendanceScoreProps {
  score: number;
}

export function AttendanceScore({ score }: AttendanceScoreProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative h-48 w-48">
      <Progress
        value={progress}
        className={clsx(
          'h-48 w-48 rounded-full',
          progress >= 80 ? '[&>div]:bg-green-500' : '[&>div]:bg-red-500',
        )}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl font-bold">
        {score}%
      </div>
    </div>
  );
}
