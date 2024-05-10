// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
import { Gender, Disabled, Contestants, Votes } from '@prisma/client';

export type Member = {
  id: string;
  nationalId: string;
  name: string;
  dateOfBirth: Date;
  mobileNumber: string;
  email: string;
  gender: Gender;
  isDisabled: Disabled;
  religion: string | null;
  county: string;
  constituency: string;
  ward: string;
  signature: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
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
