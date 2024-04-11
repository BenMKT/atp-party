import Prisma from '@prisma/client';
import Link from 'next/link';
import UpdateMember from './buttons';

const prisma = new Prisma.PrismaClient();

const MembersPage = async () => {
  // fetch all members from the database using prisma
  const members = await prisma.members.findMany();

  // display all the members in a table
  return (
    <main className="prose flex flex-col sm:mx-auto sm:max-w-6xl">
      <h2>{`ATP Total Members: ${members.length}`}</h2>
      <p className="text-center text-2xl text-violet-600 underline">
        ATP Membership List:
      </p>
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
            <th className='sr-only'>Edit</th>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button>
          <Link
            href="./members/register"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white no-underline transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Register New Member
          </Link>
        </button>
      </div>
    </main>
  );
};

export default MembersPage;
