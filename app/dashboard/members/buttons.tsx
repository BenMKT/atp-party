import Link from "next/link";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// create a button component that will render a link to the edit page
const UpdateMember = ({id}: {id: string}) => {
    return (
      <Link
        href={`/dashboard/members/${id}/edit`} // update the href to accept the id prop by using template literals to link to a dynamic route segment
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
};

export default UpdateMember;
