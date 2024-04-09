/*
  Warnings:

  - Changed the type of `isDisabled` on the `Members` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Disabled" AS ENUM ('TRUE', 'FALSE');

-- AlterTable
ALTER TABLE "Members" DROP COLUMN "isDisabled",
ADD COLUMN     "isDisabled" "Disabled" NOT NULL;
