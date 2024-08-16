import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { Member } from '@/app/lib/definitions';
import { updateMember } from '@/app/lib/actions';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// receive the member object as a prop and prefill the form fields with the specific member details

const EditMemberForm = async ({ member }: { member: Member }) => {
  // pass id to the Server Action using JS bind ensuring any values passed to the Server Action are encoded
  const updateMemberWithId = updateMember.bind(null, member.id);
  const session = await auth();

  // Check if session is null
  if (!session) {
    // Handle the case where session is null
    // For example, redirect the user to a login page or display an error message
    redirect('/login');
  }

  return (
    <main className="z-30 w-full max-w-md rounded-lg bg-white bg-opacity-60 p-8 shadow-xl shadow-[#1B5CFE]">
      <form action={updateMemberWithId} className="space-y-4">
        <h2 className="mb-6 text-center text-2xl font-bold text-primary">
          Update Member Details
        </h2>
        <p className="font-semibold text-red-700">
          N/B: For security reasons whenever updating member details, if
          updating password, please enter new password otherwise must re-enter
          the original password to update successfully.
        </p>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={member.name}
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={member.email}
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Password*
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={4}
            placeholder="Enter new password or re-enter original password"
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm placeholder:text-xs focus:border-primary focus:outline-none focus:ring-primary sm:text-sm md:placeholder:text-sm"
          />
        </div>
        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            defaultValue={member.phone}
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue={member.role}
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option disabled selected value="">
              Please select an option
            </option>
            <option value="ADMIN" disabled={session?.user?.role === 'MEMBER'}>
              ADMIN
            </option>
            <option value="STAFF" disabled={session?.user?.role === 'MEMBER'}>
              STAFF
            </option>
            <option value="MEMBER">MEMBER</option>
          </select>
        </div>
        {/* County */}
        <div>
          <label
            htmlFor="county"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            County
          </label>
          <input
            type="text"
            id="county"
            name="county"
            defaultValue={member.county}
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Constituency */}
        <div>
          <label
            htmlFor="constituency"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Constituency
          </label>
          <input
            type="text"
            id="constituency"
            name="constituency"
            defaultValue={member.constituency}
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Ward */}
        <div>
          <label
            htmlFor="ward"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Ward
          </label>
          <input
            type="text"
            id="ward"
            name="ward"
            defaultValue={member.ward}
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* footer buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/members"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 no-underline transition-colors hover:scale-110 hover:bg-gray-200 active:scale-95"
          >
            Cancel
          </Link>
          <Button className="hover:scale-110 active:scale-95" type="submit">
            Update
          </Button>
        </div>
      </form>
    </main>
  );
};

export default EditMemberForm;
