import { Disabled, Gender, Role, PrismaClient } from '@prisma/client';
import { UpdateMember, DeleteMember } from './buttons';
import Pagination from '@/app/ui/pagination';

const prisma = new PrismaClient();
// create a members table component to display the members in a table
const MembersTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  let members = [];
  let totalCount = 0;
  const perPage = 10;

  if (query) {
    // get the members based on the search query params
    members = await prisma.members.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { nationalId: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
          { county: { contains: query, mode: 'insensitive' } },
          { constituency: { contains: query, mode: 'insensitive' } },
          { ward: { contains: query, mode: 'insensitive' } },
          { gender: Gender[query as keyof typeof Gender] },
          { role: Role[query as keyof typeof Role] },
          { isDisabled: Disabled[query as keyof typeof Disabled] },
        ],
      },
      skip: (Number(currentPage) - 1) * perPage,
      take: perPage,
    });
    // get the total count of the members based on the search query params
    totalCount = await prisma.members.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { nationalId: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
          { county: { contains: query, mode: 'insensitive' } },
          { constituency: { contains: query, mode: 'insensitive' } },
          { ward: { contains: query, mode: 'insensitive' } },
          { gender: Gender[query as keyof typeof Gender] },
          { role: Role[query as keyof typeof Role] },
          { isDisabled: Disabled[query as keyof typeof Disabled] },
        ],
      },
    });
  } else {
    // get all members if there is no search query params
    members = await prisma.members.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (Number(currentPage) - 1) * perPage,
      take: perPage,
    });
    // get the total count of all the members if there is no search query params
    totalCount = await prisma.members.count();
  }

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalCount / perPage);

  // Calculate starting index for member numbering in the table rows based on the current page
  const startIndex = (Number(currentPage) - 1) * perPage + 1;

  // display the members in a table
  return (
    <main>
      <h2>{`Total Members: ${totalCount}`}</h2>
      <table className="table table-zebra overflow-x-auto">
        {/* Table headers */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>County</th>
            <th>Constituency</th>
            <th>Ward</th>
            <th>Gender</th>
            <th>Role</th>
            <th className="sr-only">Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through members, create table rows and sort by newly registered first or by descending order */}
          {members
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((member, index) => (
              <tr key={member.id}>
                {/* Row cells */}
                <td>{startIndex + index}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{member.county}</td>
                <td>{member.constituency}</td>
                <td>{member.ward}</td>
                <td>{member.gender}</td>
                <td>{member.role}</td>
                <td className="flex justify-end gap-2">
                  <UpdateMember id={member.id} />
                  <DeleteMember id={member.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default MembersTable;
