'use server';

import prisma from '@/prisma/prisma';
import { unstable_noStore as noStore } from 'next/cache';

// fetch card data from the database
export const fetchCardData = async () => {
  // Prevent the response from being cached for real-time data updates
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Apply parallel data fetching with Promise.all() to initialize all data requests at once avoiding unintentional sequential requests (Waterfall effect) improving performance
    const [
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
      totalOverdueInvoices,
      totalMale,
      totalFemale,
    ] = await Promise.all([
      prisma.bills.count(),
      prisma.members.count(),
      prisma.bills.aggregate({
        _sum: { amount: true },
        where: { status: 'Paid' },
      }),
      prisma.bills.aggregate({
        _sum: { amount: true },
        where: { status: 'Pending' },
      }),
      prisma.bills.aggregate({
        _sum: { amount: true },
        where: { status: 'Overdue' },
      }),
      prisma.members.count({ where: { gender: 'MALE' } }),
      prisma.members.count({ where: { gender: 'FEMALE' } }),
    ]);

    return {
      numberOfBills: numberOfInvoices ?? 0,
      numberOfMembers: numberOfCustomers ?? 0,
      totalPaidBills: totalPaidInvoices._sum.amount ?? 0,
      totalPendingBills: totalPendingInvoices._sum.amount ?? 0,
      totalOverdueBills: totalOverdueInvoices._sum.amount ?? 0,
      totalMale: totalMale ?? 0,
      totalFemale: totalFemale ?? 0,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
};

// fetch all overdue bills from the database
export const fetchOverdueBills = async () => {
  noStore();
  try {
    // Manually delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching overdue bills data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const overdueBills = await prisma.bills.findMany({
      where: {
        status: 'Overdue',
      },
      include: {
        Member: true,
      },
      orderBy: {
        dueDate: 'asc',
      },
      take: 5,
    });

    // console.log('Data fetch completed after 3 seconds.');

    return overdueBills;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch overdue bills data.');
  }
};

// fetch pending bills from the database
export const fetchPendingBills = async () => {
  noStore();
  try {
    // Manually delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching pending bills data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const pendingBills = await prisma.bills.findMany({
      include: {
        Member: true,
      },
      where: { status: 'Pending' },
      orderBy: { dueDate: 'asc' },
      take: 5,
    });
    // console.log('Data fetch completed after 3 seconds.');

    return pendingBills;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pending bills data.');
  }
};

// fetch all polls from the database
export const fetchPolls = async () => {
  noStore();
  try {
    const polls = await prisma.polls.findMany({
      include: {
        contestant: true,
        vote: true,
      },
    });

    return polls;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch polls data.');
  }
};

// fetch poll by id from the database
export const fetchPollById = async (id: string) => {
  noStore();
  try {
    const poll = await prisma.polls.findUnique({
      where: { id: id },
      include: {
        contestant: true,
        vote: true,
      },
    });
    return poll;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch poll data by id.');
  }
};

// count all contestants from the database by poll id
export const totalPollContestants = async (id: string) => {
  noStore();
  try {
    const contestants = await prisma.contestants.count({
      where: { pollId: id },
    });
    return contestants;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to count poll contestants.');
  }
};

// TODO: Refactor below function to subscribe and handle real-time updates of poll votes either with prisma pulse or supabase real-time subscriptions
// count all votes from the database by poll id
export const totalPollVotes = async (id: string) => {
  noStore();
  try {
    const votes = await prisma.votes.count({
      where: { pollId: id },
    });
    return votes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to count poll votes in real-time!!');
  }
};

// fetch all contestants by poll id from the database
export const fetchContestants = async (id: string) => {
  noStore();
  try {
    const contestants = await prisma.contestants.findMany({
      where: { pollId: id },
      include: {
        poll: true,
        vote: true,
      },
    });
    return contestants;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch poll contestants.');
  }
};

// TODO: Refactor to incorporate real time updates of contestant votes
// count all votes by contestant id from the database
export const totalContestantVotes = async (contestantid: string) => {
  noStore();
  try {
    const votes = await prisma.votes.count({
      where: { contestantId: contestantid },
    });
    return votes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to count contestant votes.');
  }
};
