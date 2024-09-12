/*
  Warnings:

  - You are about to drop the column `name` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `News` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `News` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `feed` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "feed" VARCHAR(255) NOT NULL,
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);
