'use client';

import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteBill } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { toast } from 'react-toastify';

// create a button component that will render a link to the edit page
export const UpdateBill = ({ id }: { id: string }) => {
  return (
    <Link href={`/dashboard/bills/${id}/edit`} className="not-prose">
      <Button>
        <PencilIcon className="w-4" />
      </Button>
    </Link>
  );
};

// create a delete button component that will delete the bill when clicked
export const DeleteBill = ({ id }: { id: string }) => {
  // This function will be called when the delete button is clicked
  const handleDelete = async () => {
    try {
      // Assuming deleteBill is an async function that deletes the bill and then returns some result
      await deleteBill(id);
      // Display a success message upon successful deletion
      toast.success('Bill Deleted Successfully');
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error('Failed to delete the bill:', error);
      toast.error('Error deleting the bill');
    }
  };
  return (
    <Button type="button" onClick={handleDelete}>
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </Button>
  );
};
