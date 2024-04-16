import { PrismaClient } from '@prisma/client';
import { UpdateMember, DeleteMember } from './buttons';
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import clsx from 'clsx';

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
          { email: { contains: query, mode: 'insensitive' } },
          { mobileNumber: { contains: query, mode: 'insensitive' } },
          { county: { contains: query, mode: 'insensitive' } },
          { constituency: { contains: query, mode: 'insensitive' } },
          { ward: { contains: query, mode: 'insensitive' } },
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
          { email: { contains: query, mode: 'insensitive' } },
          { mobileNumber: { contains: query, mode: 'insensitive' } },
          { county: { contains: query, mode: 'insensitive' } },
          { constituency: { contains: query, mode: 'insensitive' } },
          { ward: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  } else {
    // get all members if there is no search query params
    members = await prisma.members.findMany({
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
            <th>Mobile Number</th>
            <th>County</th>
            <th>Constituency</th>
            <th>Ward</th>
            <th>Gender</th>
            <th className="sr-only">Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through members and create table rows */}
          {members.map((member, index) => (
            <tr key={member.id}>
              {/* Row cells */}
              <td>{startIndex + index}</td>
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
      {/* Pagination controls */}
      <div className="pagination join">
        {/* Previous page button */}
        <Link
          href={`./members?query=${query}&page=${currentPage - 1}`}
          className={`btn join-item ${currentPage === 1 ? 'disabled cursor-not-allowed' : ''}`}
        >
          <FaAngleLeft />
        </Link>
        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            href={`./members?query=${query}&page=${i + 1}`}
            className={`btn join-item ${currentPage === i + 1 ? 'btn-active' : ''}`}
          >
            {i + 1}
          </Link>
        ))}
        {/* Next page button */}
        <Link
          href={`./members?query=${query}&page=${currentPage + 1}`}
          className={`btn join-item ${currentPage === totalPages ? 'disabled cursor-not-allowed' : ''}`}
        >
          <FaAngleRight />
        </Link>
      </div>
    </main>
  );
};

export default MembersTable;
