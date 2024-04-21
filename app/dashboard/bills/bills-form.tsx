import { Member } from '../members/[id]/edit/definitions';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { GiMoneyStack } from 'react-icons/gi';
import { TbCalendarTime } from 'react-icons/tb';
import { FaHourglassEnd } from 'react-icons/fa6';
import { MdOutlineDescription } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createBill } from './actions';

// create a form to capture the user's input and pass the form action to be called when the form is submitted

const BillsForm = ({ members }: { members: Member[] }) => {
  return (
    <form action={createBill} className="max-w-5xl sm:mx-auto">
      <div className="form-control rounded-md bg-gray-50 p-4 md:p-6">

        {/* Member Name */}
        <div className="mb-4">
          <label htmlFor="member" className="mb-2 block text-sm font-medium">
            Choose member
          </label>
          <div className="flex">
            <UserCircleIcon className="pointer-events-none absolute ml-2  mt-2 size-5 text-gray-500 peer-focus:text-gray-900" />
            <select
              id="member"
              name="memberId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
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
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter an amount
          </label>
          <div className="mt-2 rounded-md">
            <div className="flex">
              <input
                id="amount"
                name="amount"
                type="number"
                step="1"
                placeholder="Enter KSH amount"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <GiMoneyStack className="pointer-events-none absolute ml-2 mt-2 size-5 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
          <div className="mt-2 rounded-md">
            <div className="flex">
              <input
                id="description"
                name="description"
                placeholder="Enter a brief description of the bill"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MdOutlineDescription className="pointer-events-none absolute ml-2 mt-2 size-5 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Bill Status */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Bill status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="Pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
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
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
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
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="overdue"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Overdue <FaHourglassEnd className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="mb-2 block text-sm font-medium">
            Due Date
          </label>
          <div className="mt-2 rounded-md">
            <div className="flex">
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TbCalendarTime className="pointer-events-none absolute ml-2 mt-2 size-5 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/bills"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Bill</Button>
      </div>
    </form>
  );
};

export default BillsForm;
