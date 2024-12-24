'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/accountability/attendance-ui/select';

interface MeetingTypeSelectProps {
  onTypeChange: (type: string) => void;
}

export const MeetingTypeSelect = ({ onTypeChange }: MeetingTypeSelectProps) => {
  return (
    <Select defaultValue="all" onValueChange={onTypeChange}>
      <SelectTrigger className="w-[200px] bg-white">
        <SelectValue placeholder="Meeting Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Meetings</SelectItem>
        <SelectItem value="project">Projects Meetings</SelectItem>
        <SelectItem value="hall">County Hall Meetings</SelectItem>
        <SelectItem value="staff">Staff Meetings</SelectItem>
      </SelectContent>
    </Select>
  );
};
