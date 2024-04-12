// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
import { Gender, Disabled } from '@prisma/client';

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
