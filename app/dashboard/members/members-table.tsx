import { PrismaClient } from '@prisma/client';
import { UpdateMember, DeleteMember } from './buttons';

const prisma = new PrismaClient();

const MembersTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  // fetch all members from the database using prisma query builder and filter based on the search query params if any exists in the URL
  let members = [];
  if (query) {
    members = await prisma.members.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { mobileNumber: { contains: query, mode: 'insensitive' } },
          { county: { contains: query, mode: 'insensitive' } },
          { constituency: { contains: query, mode: 'insensitive' } },
          { ward: { contains: query, mode: 'insensitive' } },
        ],
      },
      skip: (Number(currentPage) - 1) * 10,
      take: 10,
    });
  } else {
    members = await prisma.members.findMany();
  }

  // display the members in a table
  return (
    <main>
      <h2>{`Total Members: ${members.length}`}</h2>
      <table className="table table-zebra overflow-x-auto">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>County</th>
            <th>Constituency</th>
            <th>Ward</th>
            <th>Gender</th>
            <th className="sr-only">Edit</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.mobileNumber}</td>
              <td>{member.county}</td>
              <td>{member.constituency}</td>
              <td>{member.ward}</td>
              <td>{member.gender}</td>
              <td className="flex justify-end gap-2">
                <UpdateMember id={member.id} />
                <DeleteMember id={member.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default MembersTable;
