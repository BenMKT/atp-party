// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

import { Member } from "@/app/dashboard/members/[id]/edit/definitions";

export type Bill = {
  id: string;
  amount: number;
  description: string;
  status: string;
  dueDate: Date;
  Member: Member;
};
