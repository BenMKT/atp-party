import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

const prisma = new PrismaClient();

// fetch data by querying the database using Prisma

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
