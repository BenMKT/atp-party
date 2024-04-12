import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { Member } from './definitions';

// receive the member object as a prop and prefill the form fields with the specific member details 
const EditMemberForm = ({ member }: { member: Member }) => {
  return (
    <form>
      <div className="form-control max-w-xl space-y-5 sm:mx-auto">
        {/* Name */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          readOnly
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
        {/* Mobile Number */}
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          type="text"
          id="mobileNumber"
          name="mobileNumber"
          defaultValue={member.mobileNumber}
          className="input input-bordered input-info w-full max-w-xl"
        />
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
