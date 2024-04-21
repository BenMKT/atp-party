import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BillsTable = async () => {
  // fetch all bills and include related Member data
  const bills = await prisma.bills.findMany({
    include: {
      Member: true, // includes related Member data
    },
  });

  // display all the bills in a table from the database
  return (
    <main>
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
                <td>{index + 1}</td>
                <td>{bill.Member.name}</td>
                <td>{bill.amount}</td>
                <td>{bill.description}</td>
                <td>{bill.status}</td>
                <td>{bill.dueDate.toISOString().split('T')[0]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
};

export default BillsTable;
