import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { registerMember } from '@/app/lib/actions';

// create a registration form component to capture user registration details
const RegistrationForm = () => {
  return (
    <form action={registerMember}>
      <div className="form-control max-w-xl space-y-5 sm:mx-auto">
        {/* National ID */}
        <span className="label-text">Enter your National ID*</span>
        <label htmlFor="nationalId">
          <input
            id="nationalId"
            name="nationalId"
            type="number"
            placeholder="12345678"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Name */}
        <span className="label-text">What is your name?*</span>
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Names"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Date of Birth */}
        <span className="label-text">Date of Birth*</span>
        <label htmlFor="dateofBirth">
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Phone */}
        <span className="label-text">Enter your mobile number*</span>
        <label htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="254700000000"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Email */}
        <span className="label-text">Email*</span>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="user@user.com"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Password */}
        <span className="label-text">Password*</span>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Gender */}
        <span className="label-text">Gender*</span>
        <label htmlFor="gender">
          <select
            id="gender"
            name="gender"
            required
            className="input input-bordered input-info w-full max-w-xl"
          >
            <option disabled selected value="">
              Choose your Gender
            </option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </label>
        {/* PWD */}
        <span className="label-text">Person is with Disability(PWD)*</span>
        <label htmlFor="isDisabled">
          <select
            id="isDisabled"
            name="isDisabled"
            required
            className="input input-bordered input-info w-full max-w-xl"
          >
            <option disabled selected value="">
              Please select an option
            </option>
            <option value="TRUE">TRUE</option>
            <option value="FALSE">FALSE</option>
          </select>
        </label>
        {/* Role */}
        <span className="label-text">Role*</span>
        <label htmlFor="role">
          <select
            id="role"
            name="role"
            required
            className="input input-bordered input-info w-full max-w-xl"
          >
            <option disabled selected value="">
              Please select an option
            </option>
            <option disabled value="ADMIN">
              ADMIN
            </option>
            <option disabled value="STAFF">
              STAFF
            </option>
            <option value="MEMBER">MEMBER</option>
          </select>
        </label>
        {/* Religion */}
        <span className="label-text">Religion</span>
        <label htmlFor="religion">
          <input
            id="religion"
            name="religion"
            type="text"
            placeholder="Religion"
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* County */}
        <span className="label-text">County*</span>
        <label htmlFor="county">
          <input
            id="county"
            name="county"
            type="text"
            placeholder="County"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Constituency */}
        <span className="label-text">Constituency*</span>
        <label htmlFor="constituency">
          <input
            id="constituency"
            name="constituency"
            type="text"
            placeholder="Constituency"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Ward */}
        <span className="label-text">Ward*</span>
        <label htmlFor="ward">
          <input
            id="ward"
            name="ward"
            type="text"
            placeholder="Ward"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* Signature */}
        <span className="label-text">Signature*</span>
        <label htmlFor="signature">
          <input
            id="signature"
            name="signature"
            type="text"
            placeholder="Sign here"
            required
            className="input input-bordered input-info w-full max-w-xl"
          />
        </label>
        {/* footer buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/members"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Back
          </Link>
          <Button type="submit">Register</Button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
