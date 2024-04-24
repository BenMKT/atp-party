'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// create a schema to validate the user input data
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

const CreateBillSchema = BillFormSchema.pick({
  memberId: true,
  amount: true,
  description: true,
  status: true,
  dueDate: true,
});

const UpdateBillSchema = BillFormSchema.pick({
  amount: true,
  description: true,
  status: true,
  dueDate: true,
});

const prisma = new PrismaClient();

// create a createBill Server Action that is going to be called when the form is submitted

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
  await prisma.bills.create({
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

// create an updateBill Server function/Action that accepts 'id' and 'formData'as arguments and updates database when called using prisma 'update'

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
  await prisma.bills.update({
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

// create a deleteBill Server function/Action that accepts 'id' prop and deletes a specific bill from database when called using prisma 'delete

export const deleteBill = async (id: string) => {
  await prisma.bills.delete({
    where: { id: id },
  });
  console.log('Bill deleted successfully');
  // revalidate the bills page to reflect changes
  revalidatePath('/dashboard/bills');
};
