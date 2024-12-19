'use client'

import { useEffect, useState } from 'react'
import { Progress } from "@/app/ui/accountability/ui/progress"
import clsx from 'clsx'

interface AttendanceScoreProps {
  score: number
}

export function AttendanceScore({ score }: AttendanceScoreProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(score), 100)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className="relative w-48 h-48">
      <Progress
        value={progress}
        className={clsx(
          "w-48 h-48 rounded-full",
          progress >= 80 
            ? "[&>div]:bg-green-500" 
            : "[&>div]:bg-red-500"
        )}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
        {score}%
      </div>
    </div>
  )
}
