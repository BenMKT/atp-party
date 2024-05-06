const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const {
  users,
  members,
  bills,
  polls,
  contestants,
  votes,
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

async function seedPolls() {
  try {
    const insertedPolls = await prisma.polls.createMany({
      data: polls,
      skipDuplicates: true,
    });

    console.log(`Seeded ${insertedPolls.count} polls`);

    return insertedPolls;
  } catch (error) {
    console.error('Error seeding polls:', error);
    throw error;
  }
}

async function seedContestants() {
  try {
    const insertedContestants = await prisma.contestants.createMany({
      data: contestants,
      skipDuplicates: true,
    });

    console.log(`Seeded ${insertedContestants.count} contestants`);

    return insertedContestants;
  } catch (error) {
    console.error('Error seeding contestants:', error);
    throw error;
  }
}

async function seedVotes() {
  try {
    const insertedVotes = await prisma.votes.createMany({
      data: votes,
      skipDuplicates: true,
    });

    console.log(`Seeded ${insertedVotes.count} votes`);

    return insertedVotes;
  } catch (error) {
    console.error('Error seeding votes:', error);
    throw error;
  }
}

async function main() {
  try {
    await prisma.$connect();

    await seedMembers();
    await seedUsers();
    await seedPolls();
    await seedContestants();
    await seedVotes();
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
