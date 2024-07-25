'use client';

import { Member } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  PlusIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { GiMoneyStack } from 'react-icons/gi';
import { TbCalendarTime } from 'react-icons/tb';
import { FaHourglassEnd } from 'react-icons/fa6';
import { MdOutlineDescription } from 'react-icons/md';
import { Button } from '@/app/ui/button';
import { createBill } from '@/app/lib/actions';
import { toast } from 'react-toastify';

// form modal to capture the user's input for creating a new bill
const BillsForm = ({ members }: { members: Member[] }) => {
  // Function to close the modal
  const closeModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  return (
    <main>
      <Button
        onClick={() => {
          const modal = document.getElementById('my_modal_3');
          if (modal instanceof HTMLDialogElement) {
            // This checks if modal is not null and is a dialog element
            modal.showModal();
          }
        }}
      >
        <span className="hidden md:inline ">Create Bill</span>{' '}
        <PlusIcon className="h-5 md:ml-4 md:hidden" />
      </Button>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box rounded-lg bg-black bg-opacity-50 p-9 shadow-lg shadow-[#1B5CFE]">
          <form
            id="createBillForm"
            onSubmit={(e) => {
              e.preventDefault();
              // Call createBill function with form data here
              const target = e.target as HTMLFormElement;
              const formData = new FormData(target);
              createBill(formData).then(() => {
                toast.success('Bill Created Successfully!');
                // Clear the form by resetting each field
                const form = document.getElementById('createBillForm');
                if (form instanceof HTMLFormElement) {
                  form.reset();
                }
                closeModal();
              });
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-circle btn-sm absolute right-2 top-1 bg-transparent text-white hover:scale-110 active:scale-90"
            >
              ✕
            </button>
            {/* Bill Form */}
            <div className="form-control rounded-md bg-gray-50 bg-opacity-60 p-4 md:p-6">
              {/* Member Name */}
              <div className="mb-4">
                <label
                  htmlFor="member"
                  className="mb-2 block text-sm font-medium"
                >
                  Choose member
                </label>
                <div className="flex">
                  <UserCircleIcon className="pointer-events-none absolute ml-2  mt-2 size-5 text-gray-600 peer-focus:text-gray-900" />
                  <select
                    id="member"
                    name="memberId"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 bg-transparent py-2 pl-10 text-sm outline-2 placeholder:text-zinc-600"
                    defaultValue=""
                    required
                  >
                    <option className="text-zinc-600" value="" disabled>
                      Select a member
                    </option>
                    {members.map((member: Member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Bill Amount */}
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="mb-2 block text-sm font-medium"
                >
                  Enter an amount
                </label>
                <div className="mt-2 flex rounded-md">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    step="1"
                    placeholder="Enter KSH amount"
                    required
                    className="peer block w-full rounded-md border border-gray-200 bg-transparent py-2 pl-10 text-sm text-gray-900 outline-2 placeholder:text-zinc-600"
                  />
                  <GiMoneyStack className="pointer-events-none absolute ml-2 mt-2 size-5 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              {/* Bill Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium"
                >
                  Bill description
                </label>
                <div className="mt-2 flex rounded-md">
                  <input
                    id="description"
                    name="description"
                    placeholder="Enter a brief description of the bill"
                    required
                    className="peer block w-full rounded-md border border-gray-200 bg-transparent py-2 pl-10 text-sm text-gray-900 outline-2 placeholder:text-zinc-600"
                  />
                  <MdOutlineDescription className="pointer-events-none absolute ml-2 mt-2 size-5 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              {/* Bill Status */}
              <fieldset className="mb-4">
                <legend className="mb-2 block text-sm font-medium">
                  Bill status
                </legend>
                <div className="rounded-md border border-gray-200 bg-transparent px-[14px] py-3">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <input
                        id="pending"
                        name="status"
                        type="radio"
                        value="Pending"
                        className="h-4 w-4 cursor-pointer border-gray-200 bg-transparent text-zinc-600 focus:ring-2"
                      />
                      <label
                        htmlFor="pending"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 bg-opacity-50 px-3 py-1.5 text-xs font-medium text-zinc-600"
                      >
                        Pending <ClockIcon className="h-4 w-4" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="paid"
                        name="status"
                        type="radio"
                        value="Paid"
                        required
                        className="h-4 w-4 cursor-pointer border-gray-200 bg-transparent text-zinc-600 focus:ring-2"
                      />
                      <label
                        htmlFor="paid"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 bg-opacity-50 px-3 py-1.5 text-xs font-medium text-zinc-600"
                      >
                        Paid <CheckIcon className="h-4 w-4" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="overdue"
                        name="status"
                        type="radio"
                        value="Overdue"
                        className="h-4 w-4 cursor-pointer border-gray-200 bg-transparent text-zinc-600 focus:ring-2"
                      />
                      <label
                        htmlFor="overdue"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 bg-opacity-50 px-3 py-1.5 text-xs font-medium text-zinc-600"
                      >
                        Overdue <FaHourglassEnd className="h-4 w-4" />
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              {/* Due Date */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="mb-2 block text-sm font-medium"
                >
                  Due Date
                </label>
                <div className="mt-2 rounded-md">
                  <div className="flex">
                    <input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      required
                      className="peer block w-full rounded-md border border-gray-200 bg-transparent py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <TbCalendarTime className="pointer-events-none absolute ml-2 mt-2 size-5 text-zinc-600 peer-focus:text-zinc-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <Button
                type="button"
                onClick={() => {
                  // Clear the form by resetting each field
                  const form = document.getElementById('createBillForm');
                  if (form instanceof HTMLFormElement) {
                    form.reset();
                  }
                }}
                className="bg-opacity-70"
              >
                Clear
              </Button>
              <Button type="submit" className="bg-opacity-70">
                Create Bill
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </main>
  );
};

export default BillsForm;
