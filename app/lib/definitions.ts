// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
import {
  Gender,
  Disabled,
  Role,
  Contestants,
  Votes,
  Position,
} from '@prisma/client';

export type Member = {
  id: string;
  nationalId: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  email: string;
  password: string;
  gender: Gender;
  isDisabled: Disabled;
  role: Role;
  religion: string | null;
  position: Position | null;
  county: string;
  constituency: string;
  ward: string;
  signature: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type Bill = {
  id: string;
  amount: number;
  description: string;
  status: string;
  dueDate: Date;
  Member: Member;
};

export type Poll = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  banner: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  contestant: Contestants[];
  vote: Votes[];
};

export type Data = {
  path: string;
};

export type PollContestant = {
  id: string;
  name: string;
  slogan: string | null;
  avatar: string;
  pollId: string;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  vote?: Votes[];
};

export type EditPoll = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  banner: string | null;
};

export type UpdateContestant = {
  name: string;
  slogan: string;
  avatar: string;
};

export type Vote = {
  pollId: string;
  contestantId: string;
  userId: string;
};

export type News = {
  id: string;
  description: string | null;
  feed: string;
  createdAt: string;
};

export type TownHallMeeting = {
  id: string;
  topic: string;
  start_time: string;
  join_url: string;
  duration: number;
  status: string;
};

export type TownHallBadgeProps = {
  id: string;
  topic: string;
  startTime: string;
  joinUrl: string;
  duration: number;
  status: string;
};

export type MeetingCardProps = {
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: string;
};

export type RecallSubmission = {
  memberId: string;
  subject: string;
  details: string;
};

export type RecallCount = {
  subject: string;
  count: number;
};

export type RecallStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export type RecallDetails = {
  id: string;
  subject: string;
  details: string;
  createdAt: Date;
  status: RecallStatus;
  member: {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string | null;
    county: string;
  };
};

export type Leader = {
  id: string;
  name: string;
  phone: string;
  email: string;
  county: string;
  constituency: string;
  ward: string;
  position: Position | null;
  role: Role;
};

export type RegistrationResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export type Leaders = {
  id: string;
  name: string;
  position: Position;
  role: Role;
  email: string;
  phone: string;
  county: string;
  constituency: string;
  ward: string;
  totalRecalls: number;
  lastRecallDate: Date;
  recallBreakdown: {
    category: string;
    count: number;
  }[];
};

export type SortField = 'name' | 'position' | 'totalRecalls' | 'lastRecallDate';
export type SortOrder = 'asc' | 'desc';

export type FilterOptions = {
  county: string;
  position: string;
};

export type RecallData = {
  id: string;
  subject: string;
  details: string;
  status: RecallStatus;
  createdAt: Date;
  member: {
    name: string;
    position: string | null;
    county: string;
    email: string;
    phone: string;
  };
};

export type RecallResponse = {
  recalls: RecallData[];
  total: number;
  pages: number;
};
