'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// instantiate PrismaClient
const prisma = new PrismaClient();

// create a member schema that matches database schema to validate the user input data
const MemberFormSchema = z.object({
  id: z.string(),
  nationalId: z.string(),
  name: z.string(),
  dateOfBirth: z.coerce.date().max(new Date('2008-01-01')),
  mobileNumber: z.string().min(13),
  email: z.string().email(),
  gender: z.enum(['MALE', 'FEMALE']),
  isDisabled: z.enum(['TRUE', 'FALSE']),
  religion: z.string().optional(),
  county: z.string(),
  constituency: z.string(),
  ward: z.string(),
  signature: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional(),
});

// Derive a RegisterMember schema from the MemberFormSchema
const RegisterMember = MemberFormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

// Derive an UpdateMember schema from the MemberFormSchema
const UpdateMember = MemberFormSchema.pick({
  email: true,
  mobileNumber: true,
  county: true,
  constituency: true,
  ward: true,
});

// create a Bills schema that matches database schema to validate the user input data
const BillFormSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  amount: z.coerce.number(),
  description: z.string(),
  status: z.enum(['Paid', 'Pending', 'Overdue']),
  dueDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional(),
});

// Derive a CreateBill schema from the BillFormSchema
const CreateBillSchema = BillFormSchema.pick({
  memberId: true,
  amount: true,
  description: true,
  status: true,
  dueDate: true,
});

// Derive an UpdateBill schema from the BillFormSchema
const UpdateBillSchema = BillFormSchema.pick({
  amount: true,
  description: true,
  status: true,
  dueDate: true,
});

// define a function/Action to create a member record in the database
export const registerMember = async (formData: FormData) => {
  // extract the user input data from the form using the formData object and convert it to a plain object
  const rawFormData = Object.fromEntries(formData.entries());
  // validate the user input data using the schema
  const validatedFields = RegisterMember.safeParse(rawFormData);
  // if the validation is successful, proceed to insert the data to the database or else display the error messages
  const validatedData = validatedFields.success
    ? validatedFields.data
    : validatedFields.error.flatten().fieldErrors;
  // insert the validated data to the database using prisma
  await prisma.members
    .create({
      // @ts-ignore
      data: validatedData,
    })
    .then(() => {
      console.log('Member registered successfully');
      // revalidate the members page to display the newly added member
      revalidatePath('/dashboard/members');
      // redirect the user to the members page after successful registration
      redirect('/dashboard/members');
    });
};

// Similarly like above, define a function/Action to update/edit a member record in the database

export const updateMember = async (id: string, formData: FormData) => {
  // extract user input from form
  const rawFormData = Object.fromEntries(formData.entries());
  // validate the data using Zod
  const validatedFields = UpdateMember.safeParse(rawFormData);
  // if validation successful, proceed to update database or display error
  const validatedData = validatedFields.success
    ? validatedFields.data
    : validatedFields.error.flatten().fieldErrors;
  // update member records in the database using prisma 'update'
  await prisma.members
    .update({
      where: { id: id },
      // @ts-ignore
      data: validatedData,
    })
    .then(() => {
      console.log('Member updated successfully');
      // revalidate the members page to display the newly added member
      revalidatePath('/dashboard/members');
      // redirect the user to the members page after successful registration
      redirect('/dashboard/members');
    });
};
// define a function/action to delete a member record from the database

export const deleteMember = async (id: string) => {
  await prisma.members.delete({
    where: { id: id },
  });
  console.log('Member deleted successfully');
  // revalidate the members page to reflect changes
  revalidatePath('/dashboard/members');
};



// define a function/Action to create a bill record in the database

export const createBill = async (formData: FormData) => {
  // extract the user input data from the form and convert it to an object
  const rawFormData = Object.fromEntries(formData.entries());
  // validate the user input data
  const validatedFields = CreateBillSchema.safeParse(rawFormData);
  // if validation is successful, proceed to insert the data to the database or else display the error messages
  const validatedData = validatedFields.success
    ? validatedFields.data
    : validatedFields.error.flatten().fieldErrors;
  // insert the data to the database
  await prisma.bills
    .create({
      // @ts-ignore
      data: validatedData,
    })
    .then(() => {
      console.log('Bill successfully created!');
    });
  // revalidate the bills page to display the newly added bill
  revalidatePath('/dashboard/bills');
  // redirect the user to the bills page after successful registration
  redirect('/dashboard/bills');
};

// define a function/Action to update/edit a bill record in the database

export const updateBill = async (id: string, formData: FormData) => {
  // extract user input from form
  const rawFormData = Object.fromEntries(formData.entries());
  // validate the data using Zod
  const validatedFields = UpdateBillSchema.safeParse(rawFormData);
  // if validation successful, proceed to update database or display error
  const validatedData = validatedFields.success
    ? validatedFields.data
    : validatedFields.error.flatten().fieldErrors;
  // update bill records in the database using prisma 'update'
  await prisma.bills
    .update({
      where: { id: id },
      // @ts-ignore
      data: validatedData,
    })
    .then(() => {
      console.log('Bill updated successfully');
      // revalidate the bills page to display the newly updated bill
      revalidatePath('/dashboard/bills');
      // redirect the user to the bills page after successful update
      redirect('/dashboard/bills');
    });
};

// define a function/action to delete a bill record from the database

export const deleteBill = async (id: string) => {
  await prisma.bills.delete({
    where: { id: id },
  });
  console.log('Bill deleted successfully');
  // revalidate the bills page to reflect changes
  revalidatePath('/dashboard/bills');
};
