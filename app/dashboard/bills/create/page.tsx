import { PrismaClient } from '@prisma/client';
import BillsForm from '../bills-form';

const prisma = new PrismaClient();

const BillsPage = async () => {
  const members = await prisma.members.findMany();

  return (
    <main>
      <BillsForm members={members} />
    </main>
  );
};

export default BillsPage;
