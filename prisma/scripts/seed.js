const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const {
  users,
  revenue,
  members,
  bills,
} = require('./seedData.js');

const prisma = new PrismaClient();

// logic to seed data into database

async function seedUsers() {
  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      }),
    );

    const insertedUsers = await prisma.users.createMany({
      data: hashedUsers,
      skipDuplicates: true,
    });

    console.log(`Seeded ${insertedUsers.count} users`);

    return insertedUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedBills() {
  try {
    const insertedBills = await prisma.bills.createMany({
      data: bills,
      skipDuplicates: true,
    });

    console.log(`Seeded ${insertedBills.count} bills`);

    return insertedBills;
  } catch (error) {
    console.error('Error seeding bills:', error);
    throw error;
  }
}

async function seedMembers() {
  try {
    const insertedMembers = await prisma.members.createMany({
      data: members,
      skipDuplicates: true,
    });

    console.log(`Seeded ${insertedMembers.count} members`);

    return insertedMembers;
  } catch (error) {
    console.error('Error seeding members:', error);
    throw error;
  }
}

async function main() {
  try {
    await prisma.$connect();

    await seedUsers();
    await seedMembers();
    await seedBills();

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error(
      'An error occurred while attempting to seed the database:',
      error,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main();
