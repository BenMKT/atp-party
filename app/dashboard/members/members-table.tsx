import { Disabled, Gender, Role, Position } from '@prisma/client';
import { UpdateMember, DeleteMember } from './buttons';
import Pagination from '@/app/ui/pagination';
import { auth } from '@/auth';
import PrintButton from '@/app/ui/print-button';
import Image from 'next/image';
import prisma from '@/prisma/prisma';
// create a members table component to display the members in a table
const MembersTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  // get the session data from the auth function
  const session = await auth();
  // create an empty array to store the members and a variable to store the total count
  let members = [];
  let totalCount = 0;
  // set the number of members to display per page
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
          { position: Position[query as keyof typeof Position] },
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
          { position: Position[query as keyof typeof Position] },
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
    <main className="-mt-8">
      {/* Conditionally render Print Button unless session.user.role is MEMBER */}
      {session?.user?.role !== 'MEMBER' && (
        <div className="-mb-8 mt-11">
          <PrintButton />
        </div>
      )}
      {/* Total members count */}
      <h2>{`Total Members: ${totalCount}`}</h2>
      {/* Table to display members */}
      <div className="mb-2 overflow-x-auto">
        <table className="table rounded-lg bg-sky-100 bg-opacity-60">
          {/* Table headers */}
          <thead>
            <tr className="text-base">
              <th></th>
              <th>Name</th>
              <th>County</th>
              <th>Constituency</th>
              <th>Ward</th>
              <th>Position</th>
              <th>ID</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Email</th>
              <th>Signature</th>
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
                <tr key={member.id} className="hover:bg-sky-200">
                  {/* Row cells */}
                  <td>{startIndex + index}</td>
                  <td>{member.name}</td>
                  <td>{member.county}</td>
                  <td>{member.constituency}</td>
                  <td>{member.ward}</td>
                  <td>{member.position}</td>
                  {/* conditionally render the 'email', 'phone', 'gender', and 'role' columns if the session user is the member themselves, a staff member, or an admin. */}
                  {(session?.user?.id === member.id ||
                    session?.user?.role === 'STAFF' ||
                    session?.user?.role === 'ADMIN') && (
                    <>
                      <td>{member.nationalId}</td>
                      <td>{member.phone}</td>
                      <td>{member.gender}</td>
                      <td>{member.role}</td>
                      <td>{member.email}</td>
                      <td>
                        <Image
                          src={member.signature}
                          alt="Signature"
                          width={80}
                          height={40}
                          className="w-15 h-10"
                        />
                      </td>
                    </>
                  )}
                  <td className="flex justify-end gap-2">
                    {/* conditionally render the 'edit' and 'delete' buttons if the session user is the member themselves, a staff member, or an admin. */}
                    {(session?.user?.id === member.id ||
                      session?.user?.role === 'STAFF' ||
                      session?.user?.role === 'ADMIN') && (
                      <>
                        <UpdateMember id={member.id} />
                        <DeleteMember id={member.id} />
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

export default MembersTable;
