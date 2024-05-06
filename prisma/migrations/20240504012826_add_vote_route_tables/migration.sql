/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Bills` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Members` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[password]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'STAFF', 'MEMBER');

-- AlterTable
ALTER TABLE "public"."Bills" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "public"."Members" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "public"."Role" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "public"."Polls" (
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
CREATE TABLE "public"."Votes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pollId" UUID NOT NULL,
    "contestantId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("pollId","contestantId")
);

-- CreateTable
CREATE TABLE "public"."Contestants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slogan" VARCHAR(255),
    "avatar" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "contestantsId" UUID NOT NULL,
    "pollsId" UUID NOT NULL,

    CONSTRAINT "Contestants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Votes_id_key" ON "public"."Votes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contestants_contestantsId_key" ON "public"."Contestants"("contestantsId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "public"."Users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "public"."Users"("userId");

-- AddForeignKey
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Votes" ADD CONSTRAINT "Votes_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "public"."Polls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Votes" ADD CONSTRAINT "Votes_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "public"."Contestants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contestants" ADD CONSTRAINT "Contestants_contestantsId_fkey" FOREIGN KEY ("contestantsId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contestants" ADD CONSTRAINT "Contestants_pollsId_fkey" FOREIGN KEY ("pollsId") REFERENCES "public"."Polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
