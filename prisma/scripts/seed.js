const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const { members, bills, polls, contestants, votes } = require('./seedData.js');

const prisma = new PrismaClient();

// logic to seed data into database
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
    const hashedMembers = await Promise.all(
      members.map(async (member) => {
        const hashedPassword = bcrypt.hashSync(member.password, 10);
        return {
          ...member,
          password: hashedPassword,
        };
      }),
    );

    const insertedMembers = await prisma.members.createMany({
      data: hashedMembers,
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
