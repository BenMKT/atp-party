// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
import { Gender, Disabled, Role, Contestants, Votes } from '@prisma/client';

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
}

export type TownHallBadgeProps = {
  id: string;
  topic: string;
  startTime: string;
  joinUrl: string;
  duration: number;
  status: string;
}

export type MeetingCardProps = {
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: string;
};
