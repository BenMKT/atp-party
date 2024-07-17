import { PrismaClient } from '@prisma/client';
import EditMemberForm from './edit-form';

const prisma = new PrismaClient();

const UpdateMemberPage = async ({ params }: { params: { id: string } }) => {
  // Retrieve the member id from the page URL or page params
  const id = params.id;
  // Use the member id to fetch the specific member details from the database using prisma
  const member = await prisma.members.findUnique({
    where: {
      id: id,
    },
  });

  // If member is null, return a message or some other component
  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <main className="relative -m-6 flex min-h-screen items-center justify-center bg-[url('/register.jpeg')] bg-cover bg-center bg-no-repeat p-8 md:-m-12">
      {/* Overlay to ensure content is visible on top of the video */}
      <div className="absolute z-10 min-h-full w-full bg-black bg-opacity-50" />
      {/* Pass the member object as a prop to prefill the form fields with the specific member details */}
      <EditMemberForm member={member} />
    </main>
  );
};

export default UpdateMemberPage;
