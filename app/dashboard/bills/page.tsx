import { PrismaClient } from '@prisma/client';
import BillsTable from './bills-table';
import { CreateBill } from './buttons';

const prisma = new PrismaClient();

const BillsPage = async () => {
  return (
    <main className="mx-auto flex max-w-5xl flex-col">
      <div className="text-end">
        <CreateBill />
      </div>
      <BillsTable />
    </main>
  );
};

export default BillsPage;
