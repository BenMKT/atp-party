import { PrismaClient } from '@prisma/client';
import EditBillForm from './edit-bill';

const prisma = new PrismaClient();

const UpdateBillPage = async ({ params }: { params: { id: string } }) => {
  // Retrieve the bill id from the page URL or page params
  const id = params.id;
  // Use the bill id to fetch the specific bill details from the database using prisma
  const bill = await prisma.bills.findUnique({
    where: { id: id },
    include: { Member: true }, // Include the member relation
  });

  // If bill is null, return a message or some other component
  if (!bill) {
    return <div>Bill not found</div>;
  }

  return (
    <main className="prose -m-8 flex min-h-screen max-w-none md:-m-12">
      <div className=" hidden bg-[url('/editBillBG.jpg')] bg-cover bg-no-repeat md:block md:w-1/2">
        {' '}
      </div>
      <div className="w-full overflow-hidden bg-sky-50 p-7 md:w-1/2">
        <h2 className="-mt-2 text-center md:mt-48">Update Bill Details</h2>
        {/* Pass the bill object as a prop to prefill the form fields with the specific bill details */}
        <EditBillForm bill={bill} />
      </div>
    </main>
  );
};

export default UpdateBillPage;
