'use client';

import { CalendarIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/app/lib/utils';
import { Button } from '@/app/ui/accountability/attendance-ui/button';
import { TownHallBadgeProps } from '@/app/lib/definitions';
import { Badge } from '@/app/ui/accountability/attendance-ui/badge';
import { Session } from 'next-auth';
import Link from 'next/link';

export const TownHallBadge = ({
  topic,
  startTime,
  joinUrl,
  duration,
  status,
  session,
}: TownHallBadgeProps & { session: Session | null }) => {
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

  // Check if meeting is more than 10 minutes away
  const isMoreThan10MinutesAway = () => {
    const meetingStartTime = new Date(startTime);
    const currentTime = new Date();
    const timeDifference = meetingStartTime.getTime() - currentTime.getTime();
    const minutesDifference = timeDifference / (1000 * 60); // Convert to minutes
    return minutesDifference > 10;
  };

  // Check if this is a staff meeting
  const isStaffMeeting = topic.toLowerCase().includes('staff');

  // Check if this is an admin meeting
  const isAdminMeeting = topic.toLowerCase().includes('admin');

  // Check if this is an aspirant meeting
  const isAspirantMeeting = topic.toLowerCase().includes('aspirant');

  // Check if this is a member meeting
  const isMemberMeeting = topic.toLowerCase().includes('member');

  // Check if this is a leader meeting
  const isLeaderMeeting = topic.toLowerCase().includes('leader');

  // Check if user has staff access
  const hasStaffAccess =
    session?.user?.role === 'ADMIN' || session?.user?.role === 'STAFF';

  // Check if user has admin access
  const hasAdminAccess = session?.user?.role === 'ADMIN';

  // Check if user has aspirant access
  const hasAspirantAccess =
    session?.user?.role === 'ADMIN' ||
    session?.user?.role === 'STAFF' ||
    session?.user?.role === 'ASPIRANT';

  // Check if user has member access
  const hasMemberAccess =
    session?.user?.role === 'ADMIN' ||
    session?.user?.role === 'STAFF' ||
    session?.user?.role === 'MEMBER' ||
    session?.user?.role === 'ELECTED' ||
    session?.user?.role === 'NOMINATED' ||
    session?.user?.role === 'ASPIRANT' ||
    session?.user?.role === 'RECALLED' ||
    session?.user?.role === 'IMPEACHED' ||
    session?.user?.role === 'INTERNSHIP' ||
    session?.user?.role === 'ATP_STUDENT';

  // Check if user has leader access
  const hasLeaderAccess =
    session?.user?.role === 'ADMIN' ||
    session?.user?.role === 'STAFF' ||
    session?.user?.role === 'ELECTED' ||
    session?.user?.role === 'NOMINATED';

  // Determine if join button should be disabled
  const isJoinDisabled =
    status === 'ended' ||
    isMoreThan10MinutesAway() ||
    (isStaffMeeting && (!session || !hasStaffAccess)) ||
    (isAdminMeeting && (!session || !hasAdminAccess)) ||
    (isAspirantMeeting && (!session || !hasAspirantAccess)) ||
    (isMemberMeeting && (!session || !hasMemberAccess)) ||
    (isLeaderMeeting && (!session || !hasLeaderAccess));

  // Get join button text based on status and access
  const getJoinButtonText = () => {
    if (status === 'ended') return 'Meeting Ended';
    if (isMoreThan10MinutesAway()) return '⌛ Waiting...';
    if (isStaffMeeting && !session) return (
      <Link
        href="/login"
        className="pointer-events-auto cursor-pointer opacity-100"
      >
        Login Required
        </Link>
      );
    if (isStaffMeeting && !hasStaffAccess) return 'Staff Only';
    if (isAdminMeeting && !session)
      return (
        <Link
          href="/login"
          className="pointer-events-auto cursor-pointer opacity-100"
        >
          Login Required
        </Link>
      );
    if (isAdminMeeting && !hasAdminAccess) return 'Admin Only';
    if (isAspirantMeeting && !session) return (<Link href="/login" className="pointer-events-auto cursor-pointer opacity-100">Login Required</Link>);
    if (isAspirantMeeting && !hasAspirantAccess) return 'Aspirants Only';
    if (isMemberMeeting && !session) return (<Link href="/login" className="pointer-events-auto cursor-pointer opacity-100">Login Required</Link>);
    if (isMemberMeeting && !hasMemberAccess) return 'Members Only';
    if (isLeaderMeeting && !session) return (<Link href="/login" className="pointer-events-auto cursor-pointer opacity-100">Login Required</Link>);
    if (isLeaderMeeting && !hasLeaderAccess) return 'Leaders Only';
    return 'Join Meeting';
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
          disabled={isJoinDisabled}
          className={`size-fit bg-green-500 text-white hover:scale-105 hover:bg-green-600 ${
            isJoinDisabled ? 'cursor-not-allowed bg-gray-400 text-gray-950' : ''
          }`}
        >
          {getJoinButtonText()}
        </Button>
      </div>
    </main>
  );
};
