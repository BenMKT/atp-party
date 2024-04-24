-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_memberId_fkey";

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
