-- AlterTable
ALTER TABLE "Bills" ADD COLUMN     "membersId" UUID;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
