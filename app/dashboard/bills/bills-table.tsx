import prisma from '@/prisma/prisma';
import { DeleteBill, UpdateBill } from './buttons';
import Pagination from '@/app/ui/pagination';
import PrintButton from '@/app/ui/print-button';
import clsx from 'clsx';

const BillsTable = async ({
  query,
  currentPage,
  session,
}: {
  query: string;
  currentPage: number;
  session: any;
}) => {
  let bills = [];
  let totalCount = 0;
  const perPage = 10;
  // create a where clause object to filter the bills based on the user role and search query
  let whereClause = {};

  // check if the user is a member and filter the bills by the member's name and search query
  if (session.user.role === 'MEMBER') {
    whereClause = {
      AND: [
        { Member: { name: session.user.name } },
        query
          ? {
              OR: [
                { description: { contains: query, mode: 'insensitive' } },
                { status: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };
  } else if (query) {
    // filter the bills by the search query if the user is an admin or staff
    whereClause = {
      OR: [
        { Member: { name: { contains: query, mode: 'insensitive' } } },
        { description: { contains: query, mode: 'insensitive' } },
        { status: { contains: query, mode: 'insensitive' } },
      ],
    };
  }

  // get the bills based on the search query params or user role
  bills = await prisma.bills.findMany({
    where: whereClause,
    include: { Member: true },
    orderBy: { createdAt: 'desc' },
    skip: (Number(currentPage) - 1) * perPage,
    take: perPage,
  });

  // get the total count of the bills based on the search query params or user role
  totalCount = await prisma.bills.count({
    where: whereClause,
  });

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalCount / perPage);
  // Calculate starting index for bill numbering in the table rows based on the current page
  const startIndex = (Number(currentPage) - 1) * perPage + 1;

  // display all the bills in a table from the database
  return (
    <main>
      <div className="-mb-8 mt-9">
        <PrintButton />
      </div>
      {/* Display the total count of bills */}
      <h2>{`Total Bills: ${totalCount}`}</h2>
      <div className="-mt-8 mb-2 overflow-x-auto">
        <table className="table table-sm rounded-lg bg-sky-100">
          {/* Table headers */}
          <thead>
            <tr className="text-base">
              <th></th>
              <th className="w-1/4">Name</th> {/* Adjusted width */}
              <th>Amount (KSHS)</th>
              <th className="w-1/3">Description</th> {/* Adjusted width */}
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
                <tr key={bill.id} className="text-sm hover:bg-sky-200">
                  {/* Row cells */}
                  <td>{startIndex + index}</td>
                  <td>{bill.Member.name}</td>
                  <td className="text-center">
                    {new Intl.NumberFormat().format(bill.amount)}
                  </td>
                  <td>{bill.description}</td>
                  <td className="text-center">
                    <span
                      className={clsx(
                        'inline-flex rounded-full px-2 text-xs font-semibold leading-5 tracking-wider',
                        {
                          'bg-green-500 bg-opacity-50 text-green-700':
                            bill.status === 'Paid',
                          'bg-yellow-500 bg-opacity-50 text-yellow-700':
                            bill.status === 'Pending',
                          'bg-red-500 bg-opacity-50 text-red-700':
                            bill.status === 'Overdue',
                        },
                      )}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="text-nowrap">
                    {bill.dueDate.toISOString().split('T')[0]}
                  </td>
                  <td className="flex justify-end gap-2">
                    {/* Conditionally display the edit and delete buttons based on logged-in user role */}
                    {session.user.role !== 'MEMBER' && (
                      <>
                        <UpdateBill id={bill.id} />
                        <DeleteBill id={bill.id} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default BillsTable;
