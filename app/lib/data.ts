'use server';

import prisma from '@/prisma/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import { Role, Position, RecallStatus } from '@prisma/client';
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

export async function fetchRecallStats() {
  noStore();
  try {
    const stats = await prisma.$transaction([
      prisma.recalls.count({ where: { status: 'PENDING' } }),
      prisma.recalls.count({ where: { status: 'APPROVED' } }),
      prisma.recalls.count({ where: { status: 'REJECTED' } }),
      prisma.recalls.count({ where: { status: 'COMPLETED' } }),
      prisma.members.count({ where: { role: 'RECALLED' } }),
    ]);

    return {
      pendingRecalls: stats[0],
      approvedRecalls: stats[1],
      rejectedRecalls: stats[2],
      completedRecalls: stats[3],
      recalledLeaders: stats[4],
    };
  } catch (error) {
    console.error('Error fetching recall stats:', error);
    throw new Error('Failed to fetch recall statistics.');
  }
}

export async function fetchRecallsByCounty() {
  noStore();
  try {
    const recalls = await prisma.recalls.findMany({
      include: {
        member: true,
      },
    });

    const countsByCounty = recalls.reduce(
      (acc: { [key: string]: number }, recall) => {
        const county = recall.member.county;
        acc[county] = (acc[county] || 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(countsByCounty).map(([county, count]) => ({
      county,
      count,
    }));
  } catch (error) {
    console.error('Error fetching recalls by county:', error);
    throw new Error('Failed to fetch recall county data.');
  }
}

export async function fetchRecallsByPosition() {
  noStore();
  try {
    const recalls = await prisma.recalls.findMany({
      include: {
        member: {
          select: {
            position: true,
          },
        },
      },
    });

    const countsByPosition = recalls.reduce(
      (acc: { [key: string]: number }, recall) => {
        const position = recall.member.position || 'UNKNOWN';
        acc[position] = (acc[position] || 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(countsByPosition).map(([position, count]) => ({
      position,
      count,
    }));
  } catch (error) {
    console.error('Error fetching recalls by position:', error);
    throw new Error('Failed to fetch recall position data.');
  }
}

export async function fetchRecallTrends() {
  noStore();
  try {
    const recalls = await prisma.recalls.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const monthlyTrends = recalls.reduce(
      (acc: { [key: string]: number }, recall) => {
        const month = recall.createdAt.toISOString().slice(0, 7); // YYYY-MM format
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(monthlyTrends).map(([month, count]) => ({
      month,
      count,
    }));
  } catch (error) {
    console.error('Error fetching recall trends:', error);
    throw new Error('Failed to fetch recall trends.');
  }
}

export async function fetchRecallsWithDetails(
  page: number = 1,
  limit: number = 10,
  search: string = '',
  statusFilter: string = 'all',
) {
  noStore();
  try {
    let memberIds: string[] = [];

    if (search) {
      const matchingMembers = await prisma.members.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
        select: { id: true },
      });
      memberIds = matchingMembers.map((m) => m.id);
    }

    const where = {
      ...(search
        ? {
            OR: [
              { memberId: { in: memberIds } },
              { subject: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(statusFilter !== 'all'
        ? { status: statusFilter as RecallStatus }
        : {}),
    };

    const [recalls, total] = await prisma.$transaction([
      prisma.recalls.findMany({
        where,
        include: {
          member: {
            select: {
              name: true,
              position: true,
              county: true,
              email: true,
              phone: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.recalls.count({ where }),
    ]);

    return {
      recalls,
      total,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching recalls:', error);
    throw new Error('Failed to fetch recalls.');
  }
}

export async function fetchDashboardStats() {
  noStore();
  try {
    const [stats, recalls] = await Promise.all([
      prisma.$transaction([
        prisma.recalls.count({ where: { status: 'PENDING' } }),
        prisma.recalls.count({ where: { status: 'APPROVED' } }),
        prisma.recalls.count({ where: { status: 'REJECTED' } }),
        prisma.recalls.count({ where: { status: 'COMPLETED' } }),
        prisma.members.count({ where: { role: 'RECALLED' } }),
      ]),
      prisma.recalls.findMany({
        include: {
          member: {
            select: {
              county: true,
              position: true,
            },
          },
        },
      }),
    ]);

    // Process county data with subject breakdown
    const countsByCounty = recalls.reduce(
      (acc: Record<string, Record<string, number>>, recall) => {
        const county = recall.member.county;
        const subject = recall.subject;

        if (!acc[county]) {
          acc[county] = {};
        }
        acc[county][subject] = (acc[county][subject] || 0) + 1;
        return acc;
      },
      {},
    );

    // Get unique subjects
    const subjects = [...new Set(recalls.map((r) => r.subject))];

    // Format county data for stacked bar chart
    const countyData = Object.entries(countsByCounty).map(
      ([county, subjectCounts]) => ({
        county,
        ...subjects.reduce(
          (acc, subject) => ({
            ...acc,
            [subject]: subjectCounts[subject] || 0,
          }),
          {},
        ),
      }),
    );

    // Process position data
    const countsByPosition = recalls.reduce(
      (acc: Record<string, number>, recall) => {
        const position = recall.member.position || 'UNKNOWN';
        acc[position] = (acc[position] || 0) + 1;
        return acc;
      },
      {},
    );

    // Process subject data
    const countsBySubject = recalls.reduce(
      (acc: Record<string, number>, recall) => {
        acc[recall.subject] = (acc[recall.subject] || 0) + 1;
        return acc;
      },
      {},
    );

    // Process trends data
    const monthlyTrends = recalls.reduce(
      (acc: Record<string, number>, recall) => {
        const month = recall.createdAt.toISOString().slice(0, 7);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      },
      {},
    );

    return {
      stats: {
        pendingRecalls: stats[0],
        approvedRecalls: stats[1],
        rejectedRecalls: stats[2],
        completedRecalls: stats[3],
        recalledLeaders: stats[4],
      },
      countyData,
      subjects,
      positionData: Object.entries(countsByPosition).map(
        ([position, count]) => ({
          position,
          count,
        }),
      ),
      subjectData: Object.entries(countsBySubject).map(([subject, count]) => ({
        subject,
        count,
      })),
      trendsData: Object.entries(monthlyTrends)
        .sort()
        .map(([month, count]) => ({
          month,
          count,
        })),
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('Failed to fetch dashboard statistics.');
  }
}
