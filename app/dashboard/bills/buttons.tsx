import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export const CreateBill = () => {
    return (
        <button>
            <Link
                href="/dashboard/bills/create"
                className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 end md:max-w-28 focus-visible:outline-blue-600"
            >
                <span className="hidden md:inline ">Create Bill</span>{' '}
                <PlusIcon className="h-5 md:ml-4 md:hidden" />
            </Link>
        </button>
    );
};
