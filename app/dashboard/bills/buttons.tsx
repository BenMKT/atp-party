import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteBill } from './actions';

// create a button component that will render a link to the create page
export const CreateBill = () => {
  return (
    <button>
      <Link
        href="/dashboard/bills/create"
        className="end flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:max-w-28">
        <span className="hidden md:inline ">Create Bill</span>{' '}
        <PlusIcon className="h-5 md:ml-4 md:hidden" />
      </Link>
    </button>
  );
};

// create a button component that will render a link to the edit page
export const UpdateBill = ({ id }: { id: string }) => {
  return (
      <Link
        href={`/dashboard/bills/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100">
        <PencilIcon className="w-5" />
      </Link>
  );
};

// create a delete button component that will call the deleteMember action deleting a specific member from the DB based on `member id`

export const DeleteBill = ({ id }: { id: string }) => {
  // pass `id` to the Server Action using JS bind ensuring any values passed to the Server Action are encoded
  const deleteMemberWithId = deleteBill.bind(null, id);

  return (
    <form action={deleteMemberWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
};
