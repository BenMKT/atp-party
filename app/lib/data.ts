'use server';

import prisma from '@/prisma/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import { Role, Position } from '@prisma/client';
import { Leader } from './definitions';

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

// fetch all contestants from the database
export const fetchAllContestants = async () => {
  noStore();
  try {
    const contestants = await prisma.contestants.findMany({
      include: {
        poll: true,
        votes: true,
      },
    });
    return contestants;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all contestants.');
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
        votes: true,
      },
    });
    return contestants;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch poll contestants.');
  }
};

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

// get all votes by contestant id from the database
export const contestantsVotes = async (contestantid: string) => {
  noStore();
  try {
    const votes = await prisma.votes.findMany({
      where: { contestantId: contestantid },
    });
    return votes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch contestant votes.');
  }
};

// fetch all news from the database
export const fetchNews = async () => {
  noStore();
  try {
    const news = await prisma.news.findMany();
    return news;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch news data.');
  }
};

// fetch all members from the database
export const fetchMembers = async () => {
  noStore();
  const members = await prisma.members.findMany();
  return members;
};

// fetch all leaders from the database
export const fetchLeaders = async () => {
  try {
    noStore();
    const leaders = await prisma.members.findMany({
      where: {
        role: {
          in: [Role.ELECTED, Role.NOMINATED, Role.RECALLED, Role.IMPEACHED],
        },
        position: {
          not: null,
        },
      },
      select: {
        id: true,
        name: true,
        position: true,
        role: true,
        email: true,
        phone: true,
        county: true,
        constituency: true,
        ward: true,
        recalls: {
          select: {
            id: true,
            subject: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!leaders || leaders.length === 0) {
      return [];
    }

    return leaders.map((leader) => {
      // Group recalls by subject and count them
      const subjectCounts = leader.recalls.reduce(
        (acc, recall) => {
          acc[recall.subject] = (acc[recall.subject] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Convert to array format for recallBreakdown
      const recallBreakdown = Object.entries(subjectCounts).map(
        ([subject, count]) => ({
          category: subject,
          count,
        }),
      );

      return {
        id: leader.id,
        name: leader.name,
        position: leader.position!,
        role: leader.role,
        email: leader.email,
        phone: leader.phone,
        county: leader.county,
        constituency: leader.constituency,
        ward: leader.ward,
        totalRecalls: leader.recalls.length,
        lastRecallDate:
          leader.recalls.length > 0
            ? leader.recalls.reduce(
                (latest, recall) =>
                  recall.createdAt > latest ? recall.createdAt : latest,
                leader.recalls[0].createdAt,
              )
            : null,
        recallBreakdown,
      };
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch leader data.');
  }
};
