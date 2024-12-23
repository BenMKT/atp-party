'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/accountability/attendance-ui/select';
import { useState } from 'react';

export const MeetingTypeSelect = () => {
  const [meetingType, setMeetingType] = useState('all');

  return (
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
  );
}
