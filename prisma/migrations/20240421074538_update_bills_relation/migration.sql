/*
  Warnings:

  - You are about to drop the column `member_id` on the `Bills` table. All the data in the column will be lost.
  - You are about to drop the column `membersId` on the `Bills` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `Bills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_membersId_fkey";

-- AlterTable
ALTER TABLE "Bills" DROP COLUMN "member_id",
DROP COLUMN "membersId",
ADD COLUMN     "memberId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
