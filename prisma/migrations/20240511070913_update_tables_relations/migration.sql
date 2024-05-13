/*
  Warnings:

  - The values [MEMBER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `contestantsId` on the `Contestants` table. All the data in the column will be lost.
  - You are about to drop the column `pollsId` on the `Contestants` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `Votes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `Contestants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nationalId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pollId` to the `Contestants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Contestants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Polls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationalId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('ADMIN', 'STAFF', 'USER');
ALTER TABLE "public"."Users" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Contestants" DROP CONSTRAINT "Contestants_contestantsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contestants" DROP CONSTRAINT "Contestants_pollsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Users" DROP CONSTRAINT "Users_userId_fkey";

-- DropIndex
DROP INDEX "public"."Contestants_contestantsId_key";

-- DropIndex
DROP INDEX "public"."Users_userId_key";

-- DropIndex
DROP INDEX "public"."Votes_id_key";

-- AlterTable
ALTER TABLE "public"."Bills" ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "public"."Contestants" DROP COLUMN "contestantsId",
DROP COLUMN "pollsId",
ADD COLUMN     "pollId" UUID NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."Members" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."Polls" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "nationalId" VARCHAR(255) NOT NULL,
ADD COLUMN     "username" VARCHAR(255),
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "role" SET DEFAULT 'USER';

-- AlterTable
ALTER TABLE "public"."Votes" DROP CONSTRAINT "Votes_pkey",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Votes_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contestants_userId_key" ON "public"."Contestants"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Members_userId_key" ON "public"."Members"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nationalId_key" ON "public"."Users"("nationalId");

-- AddForeignKey
ALTER TABLE "public"."Bills" ADD CONSTRAINT "Bills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Members" ADD CONSTRAINT "Members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Polls" ADD CONSTRAINT "Polls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Votes" ADD CONSTRAINT "Votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contestants" ADD CONSTRAINT "Contestants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contestants" ADD CONSTRAINT "Contestants_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "public"."Polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
