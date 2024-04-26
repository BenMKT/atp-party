import { PrismaClient } from '@prisma/client';
import { DeleteBill, UpdateBill } from './buttons';
import Pagination from '@/app/ui/pagination';

const prisma = new PrismaClient();

const BillsTable = async ({ query, currentPage }: { query: string; currentPage: number}) => {
  // fetch all bills and include related Member data
let bills = [];
let totalCount = 0;
const perPage = 10;

if (query) {
  // get the bills based on the search query params
bills = await prisma.bills.findMany({
  where: {
    OR: [
      { Member: { name: { contains: query, mode: 'insensitive' } } },
      { description: { contains: query, mode: 'insensitive' } },
      { status: { contains: query, mode: 'insensitive' } },
    ],
  },
  include: { Member: true },
  skip: (Number(currentPage) - 1) * perPage,
  take: perPage,
});
  // get the total count of the bills based on the search query params
  totalCount = await prisma.bills.count({
    where: {
      OR: [
        { Member: { name: { contains: query, mode: 'insensitive' } } },
        { description: { contains: query, mode: 'insensitive' } },
        { status: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
} else {
  // get all bills if there is no search query params
  bills = await prisma.bills.findMany({
    include: { Member: true },
    orderBy: { createdAt: 'desc' },
    skip: (Number(currentPage) - 1) * perPage,
    take: perPage,
  });
  // get the total count of all the bills if there is no search query params
  totalCount = await prisma.bills.count();
}

// Calculate total pages for pagination
const totalPages = Math.ceil(totalCount / perPage);

// Calculate starting index for bill numbering in the table rows based on the current page
const startIndex = (Number(currentPage) - 1) * perPage + 1;

  // display all the bills in a table from the database
  return (
    <main>
      <h2>{`Total Bills: ${totalCount}`}</h2>
      <table className="table table-zebra overflow-x-auto">
        {/* Table headers */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Amount (KSHS)</th>
            <th>Description</th>
            <th>Bill Status</th>
            <th>Due Date</th>
            <th className="sr-only">Edit</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Map through bills, create table rows and sort by newly createdAt first or by descending order */}
          {bills
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((bill, index) => (
              <tr key={bill.id}>
                {/* Row cells */}
                <td>{startIndex + index}</td>
                <td>{bill.Member.name}</td>
                <td>{bill.amount}</td>
                <td>{bill.description}</td>
                <td>{bill.status}</td>
                <td>{bill.dueDate.toISOString().split('T')[0]}</td>
                <td className="flex justify-end gap-2 text-sm">
                  <UpdateBill id={bill.id} />
                  <DeleteBill id={bill.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <Pagination totalPages={totalPages}/>
    </main>
  );
};

export default BillsTable;
