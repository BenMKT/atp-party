'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// create a schema to validate the user input data
const UpdateFormSchema = z.object({
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

const UpdateMember = UpdateFormSchema.pick({
  email: true,
  mobileNumber: true,
  county: true,
  constituency: true,
  ward: true,
});

const prisma = new PrismaClient();

// create an updateMember Server function/Action that accepts 'id' and 'formData'as arguments and updates database when called

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
  await prisma.members.update({
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
}

// create a deleteMember Server function/Action that accepts 'id' prop and deletes a specific member from database when called using prisma 'delete
export const deleteMember = async (id: string) => {
  await prisma.members.delete({
    where: {id: id},
  });
  console.log('Member deleted successfully');
  // revalidate the members page to reflect changes
  revalidatePath('/dashboard/members');
};
