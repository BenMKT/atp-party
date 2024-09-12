'use server';

import prisma from '@/prisma/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  Data,
  EditPoll,
  PollContestant,
  UpdateContestant,
  Vote,
} from './definitions';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

// create a member schema that matches database schema to validate the user input data
const MemberFormSchema = z.object({
  id: z.string(),
  nationalId: z.string(),
  name: z.string(),
  dateOfBirth: z.coerce.date().max(new Date('2008-01-01')),
  phone: z.string().min(12),
  password: z.string().min(4),
  email: z.string().email(),
  gender: z.enum(['MALE', 'FEMALE']),
  isDisabled: z.enum(['TRUE', 'FALSE']),
  role: z.enum(['ADMIN', 'STAFF', 'MEMBER']),
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
  name: true,
  email: true,
  phone: true,
  password: true,
  role: true,
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

// create a polls schema that matches database schema to validate the user input data
const PollFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  banner: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

// Derive a Create and update Poll schema from the PollFormSchema
const CreatePollSchema = PollFormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// create a contestants schema that matches database schema to validate the user input data
const ContestantFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  slogan: z.string().optional(),
  userId: z.string(),
  avatar: z.string(),
  pollId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

// Derive a Create and update Contestant schema from the ContestantFormSchema
const CreateContestantSchema = ContestantFormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// create a news schema that matches database schema to validate the user input data
const NewsFormSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  feed: z.string(),
  createdAt: z.coerce.date(),
});

// derive a CreateNews schema from the NewsFormSchema
const CreateNewsSchema = NewsFormSchema.omit({
  id: true,
  createdAt: true,
});

// define a function/Action to create a member record in the database
export const registerMember = async (formData: FormData) => {
  // extract the user input data from the form using the formData object and convert it to a plain object
  const rawFormData = Object.fromEntries(formData.entries());
  // validate the user input data using the schema
  const validatedFields = RegisterMember.safeParse(rawFormData);

  if (!validatedFields.success) {
    return validatedFields.error.flatten().fieldErrors;
  }
  // Hash the password
  const hashedPassword = bcrypt.hashSync(validatedFields.data.password, 10);
  // if the validation is successful, proceed to insert the data to the database with hashed password
  const validatedData = { ...validatedFields.data, password: hashedPassword };
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
  if (!validatedFields.success) {
    return validatedFields.error.flatten().fieldErrors;
  }
  // Hash the password
  const hashedPassword = bcrypt.hashSync(validatedFields.data.password, 10);
  // if the validation is successful, proceed to insert the data to the database with hashed password
  const validatedData = { ...validatedFields.data, password: hashedPassword };
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

// define a function/Action to create a poll record in the database

export const createPoll = async (data: Data, formData: FormData) => {
  // extract user input data using destucturing from the form and validate it
  const { title, description, startDate, endDate } = CreatePollSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
  });
  // get the imageURL from supabase storage bucket
  const bannerURL = `https://hgtovaupiuxajqlkjdfg.supabase.co/storage/v1/object/public/images/${data.path}`;
  // insert the data to the database
  await prisma.polls.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      banner: bannerURL,
    },
  });
  console.log('Poll created successfully');
  // revalidate the polls page to display the newly added poll
  revalidatePath('/vote');
  // redirect the user to the polls page after successful registration
  // redirect('/vote');
};

// define a function/Action to create a contestant record in the database
export const createContestant = async (contestant: PollContestant) => {
  // insert the data to the database
  await prisma.contestants.create({
    data: contestant,
  });
  console.log('Contestant created successfully');
};

// define a function/Action to delete a contestant record from the database
export const deleteContestant = async (contestantid: string) => {
  await prisma.contestants.delete({
    where: { id: contestantid },
  });
  console.log('Contestant deleted successfully');
};

// define a function/Action to update/edit a poll record in the database
export const updatePoll = async (poll_id: string, editPoll: EditPoll) => {
  // update poll records in the database using prisma 'update'
  await prisma.polls
    .update({
      where: { id: poll_id },
      data: editPoll,
    })
    .then(() => {
      console.log('Poll updated successfully');
    });
};

// define a function/action to delete a poll record from the database
export const deletePoll = async (poll_id: string) => {
  await prisma.polls.delete({
    where: { id: poll_id },
  });
  console.log('Poll deleted successfully');
  // revalidate the polls page to reflect changes
  revalidatePath('/vote');
};

// define a function/Action to update a contestant record from the database
export const updateContestant = async (
  contestant_id: string,
  contestant: UpdateContestant,
) => {
  // update contestant records in the database using prisma 'update'
  await prisma.contestants
    .update({
      where: { id: contestant_id },
      data: contestant,
    })
    .then(() => {
      console.log('Contestant updated successfully');
    });
};

// define a function to create a vote record in the database
export const createVote = async (vote: Vote) => {
  // insert the data to the database
  await prisma.votes.create({
    data: vote,
  });
};

// define a function to authenticate a user using the credentials provider
export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    // sign in the user using the credentials provider
    await signIn('credentials', formData, { callbackUrl: '/' });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Invalid password or credentials. Try again!';
      }
    }
    throw error;
  }
};

// define a function to sign out a user
export const logOut = async () => {
  await signOut({ redirectTo: '/' });
};

// define a function to create news feed
export const createNews = async (fileUrl: string, formData: FormData) => {
  // extract the user input data from the form and convert it to an object
  const { description, feed } = CreateNewsSchema.parse({
    description: formData.get('description'),
    feed: fileUrl,
  });
  // insert the data to the database
  await prisma.news
    .create({
      data: {
        description,
        feed,
      },
    })
    .then(() => {
      console.log('Feed successfully created!');
    });
};

// define a function to delete a news feed from the database
export const deleteNews = async (id: string) => {
  try {
    await prisma.news.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting news feed from the database', error);
    throw new Error('Error deleting news feed from the database');
  }
};
