import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteMember } from '@/app/lib/actions';

// create a button component that will render a link to the edit page
export const UpdateMember = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dashboard/members/${id}/edit`} // update the href to accept the id prop by using template literals to link to a dynamic route segment
      className="rounded-md border p-2 hover:bg-gray-100" >
      <PencilIcon className="w-5" />
    </Link>
  );
};

// create a delete button component that will call the deleteMember action deleting a specific member from the DB based on `member id`

export const DeleteMember = ({ id }: { id: string }) => {
  // pass `id` to the Server Action using JS bind ensuring any values passed to the Server Action are encoded
  const deleteMemberWithId = deleteMember.bind(null, id);

  return (
    <form action={deleteMemberWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
};
