/*
  Warnings:

  - You are about to drop the `bills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contestants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `polls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_memberId_fkey";

-- DropForeignKey
ALTER TABLE "contestants" DROP CONSTRAINT "contestants_pollId_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_contestantId_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_pollId_fkey";

-- DropTable
DROP TABLE "bills";

-- DropTable
DROP TABLE "contestants";

-- DropTable
DROP TABLE "members";

-- DropTable
DROP TABLE "polls";

-- DropTable
DROP TABLE "votes";

-- CreateTable
CREATE TABLE "Bills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "dueDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "memberId" UUID NOT NULL,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nationalId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL,
    "isDisabled" "Disabled" NOT NULL,
    "religion" VARCHAR(255),
    "county" VARCHAR(255) NOT NULL,
    "constituency" VARCHAR(255) NOT NULL,
    "ward" VARCHAR(255) NOT NULL,
    "signature" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Polls" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "startDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6) NOT NULL,
    "banner" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Polls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pollId" UUID NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "contestantId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contestants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slogan" VARCHAR(255),
    "avatar" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "pollId" UUID NOT NULL,

    CONSTRAINT "Contestants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_nationalId_key" ON "Members"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_email_key" ON "Members"("email");

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Polls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contestants" ADD CONSTRAINT "Contestants_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Polls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
