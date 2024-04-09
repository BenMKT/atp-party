'use server';

import { PrismaClient} from '@prisma/client';
import { z } from 'zod';


// create a schema to validate the user input data
const RegisterFormSchema = z.object({
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

const RegisterMember = RegisterFormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

// instantiate PrismaClient
const prisma = new PrismaClient();

// create a Server function/Action that is going to be called when the form is submitted

const registerMember = async (formData: FormData) => {
  // extract the user input data from the form using the formData object and convert it to a plain object
  const rawFormData = Object.fromEntries(formData.entries());
  // validate the user input data using the schema
  const validatedFields = RegisterMember.safeParse(rawFormData);
  // if the validation is successful, proceed to insert the data to the database or else display the error messages
  const validatedData = validatedFields.success
    ? validatedFields.data
    : validatedFields.error.flatten().fieldErrors;
  // insert the validated data to the database using prisma
  await prisma.members.create({
    data: validatedData,
  });
}

export default registerMember;
