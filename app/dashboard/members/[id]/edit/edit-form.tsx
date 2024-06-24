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
    <form action={updateMemberWithId}>
      <div className="form-control max-w-xl space-y-5 sm:mx-auto">
        {/* Name */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={member.name}
          className="input input-bordered input-disabled w-full max-w-xl"
        />
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={member.email}
          className="input input-bordered input-info w-full max-w-xl"
        />
        {/* Password */}
        <span className="label-text">Password*</span>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            defaultValue={member.password}
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Phone */}
        <label htmlFor="phone">Mobile Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          defaultValue={member.phone}
          className="input input-bordered input-info w-full max-w-xl"
        />
        {/* Role */}
        <span className="label-text">Role*</span>
        <label htmlFor="role">
          <select
            id="role"
            name="role"
            required
            defaultValue={member.role}
            className="input input-bordered input-info w-full max-w-xl"
          >
            <option disabled selected value="">
              Please select an option
            </option>
            <option value="ADMIN">ADMIN</option>
            <option value="STAFF">STAFF</option>
            <option value="MEMBER">MEMBER</option>
          </select>
        </label>
        {/* County */}
        <label htmlFor="county">County</label>
        <input
          type="text"
          id="county"
          name="county"
          defaultValue={member.county}
          className="input input-bordered input-info w-full max-w-xl"
        />
        {/* Constituncy */}
        <label htmlFor="constituency">Constituency</label>
        <input
          type="text"
          id="constituency"
          name="constituency"
          defaultValue={member.constituency}
          className="input input-bordered input-info w-full max-w-xl"
        />
        {/* Ward */}
        <label htmlFor="ward">Ward</label>
        <input
          type="text"
          id="ward"
          name="ward"
          defaultValue={member.ward}
          className="input input-bordered input-info w-full max-w-xl"
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/members"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 no-underline transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};

export default EditMemberForm;
