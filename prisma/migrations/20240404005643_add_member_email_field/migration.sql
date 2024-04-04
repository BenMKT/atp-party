/*
  Warnings:

  - Added the required column `email` to the `Members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Members" ADD COLUMN     "email" VARCHAR(255) NOT NULL;
