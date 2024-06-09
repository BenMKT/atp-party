/*
  Warnings:

  - A unique constraint covering the columns `[pollId]` on the table `Contestants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pollId]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contestantId]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contestants_pollId_key" ON "public"."Contestants"("pollId");

-- CreateIndex
CREATE UNIQUE INDEX "Votes_pollId_key" ON "public"."Votes"("pollId");

-- CreateIndex
CREATE UNIQUE INDEX "Votes_contestantId_key" ON "public"."Votes"("contestantId");

-- CreateIndex
CREATE UNIQUE INDEX "Votes_userId_key" ON "public"."Votes"("userId");
