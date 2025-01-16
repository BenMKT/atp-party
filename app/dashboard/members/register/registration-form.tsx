'use client';

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { registerMember } from '@/app/lib/actions';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';
import { supabase } from '@/app/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { Position, Role } from '@prisma/client';
import { useRouter } from 'next/navigation';

// create a registration form component to capture user registration details
const RegistrationForm = () => {
  // get the session object from the useSession hook
  const session = useSession().data;
  const router = useRouter();
  // Create a reference to the SignatureCanvas component
  const signaturePad = useRef<any>(null);

  const clearSignature = () => {
    if (signaturePad.current) {
      signaturePad.current.clear();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Get signature image
      if (!signaturePad.current?.getTrimmedCanvas()) {
        toast.error('Signature is required.');
        return;
      }

      const signatureImage = signaturePad.current
        .getTrimmedCanvas()
        .toDataURL('image/png');

      // Convert data URL to blob
      const blob = await fetch(signatureImage).then((res) => res.blob());
      // Generate a unique file name using uuidv4
      const fileName = `${uuidv4()}.png`;
      // Upload the blob to Supabase storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`signatures/${fileName}`, blob);

      if (error) {
        console.error('Error uploading signature:', error);
        toast.error('Error uploading signature');
        return;
      }

      // Get form data
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);

      // Add signature URL to form data
      const signatureURL = `https://hgtovaupiuxajqlkjdfg.supabase.co/storage/v1/object/public/images/${data.path}`;
      formData.set('signature', signatureURL);

      // Set default role to MEMBER
      formData.set('role', 'MEMBER');

      // Submit form
      const result = await registerMember(formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success('Registration successful!');
        router.push('/login');
      } else if (result.fieldErrors) {
        // Show validation errors
        Object.entries(result.fieldErrors).forEach(([field, errors]) => {
          if (Array.isArray(errors)) {
            errors.forEach((error) => toast.error(`${field}: ${error}`));
          }
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  if (session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-bounce-slow rounded-lg bg-gradient-to-r from-red-50 to-red-100 p-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="animate-pulse rounded-full bg-red-500 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="mb-2 text-xl font-bold text-red-600">
                Authentication Notice
              </h3>
              <p className="text-md font-medium text-gray-700">
                Please{' '}
                <span className="animate-pulse font-bold text-red-500">
                  sign out
                </span>{' '}
                to register a new member.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="z-30 w-full max-w-md rounded-lg bg-white bg-opacity-60 p-8 shadow-xl shadow-[#1B5CFE]">
      <h2 className="mb-6 text-center text-2xl font-bold text-blue-700">
        Register and Help Transform Kenya!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* National ID */}
        <div>
          <label
            htmlFor="nationalId"
            className="block text-sm font-medium text-zinc-700 md:text-base "
          >
            Enter your National ID*
          </label>
          <input
            id="nationalId"
            name="nationalId"
            type="number"
            placeholder="12345678"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            What is your name?*
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your First and Last Name"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dateofBirth"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Date of Birth*
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            max="2009-08-01"
          />
        </div>
        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Enter your mobile number*
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="254700000000"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-s block font-medium text-zinc-700 md:text-base"
          >
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="user@user.com"
            required
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
            minLength={4}
            placeholder="Enter a minimum of 4 characters"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Gender*
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option disabled selected value="">
              Select gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        {/* PWD */}
        <div>
          <label
            htmlFor="isDisabled"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Person is with Disability(PWD)*
          </label>
          <select
            id="isDisabled"
            name="isDisabled"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option disabled selected value="">
              Select status
            </option>
            <option value="TRUE">Yes</option>
            <option value="FALSE">No</option>
          </select>
        </div>
        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Role*
          </label>
          <select
            id="role"
            name="role"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm"
            defaultValue="MEMBER"
          >
            {Object.values(Role).map((role) => (
              <option key={role} value={role} disabled={role !== 'MEMBER'}>
                {role}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Only Member role is allowed during registration
          </p>
        </div>
        {/* Position */}
        <div className="mb-4">
          <label
            htmlFor="position"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Position
          </label>
          <select
            id="position"
            name="position"
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm"
            defaultValue=""
          >
            <option value="">No Position</option>
            {Object.values(Position).map((position) => (
              <option key={position} value={position} disabled>
                {position}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Position will be assigned by admin
          </p>
        </div>
        {/* Religion */}
        <div>
          <label
            htmlFor="religion"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Religion
          </label>
          <input
            id="religion"
            name="religion"
            type="text"
            placeholder="Religion (Optional)"
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* County */}
        <div>
          <label
            htmlFor="county"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            County*
          </label>
          <input
            id="county"
            name="county"
            type="text"
            placeholder="County"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Constituency */}
        <div>
          <label
            htmlFor="constituency"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Constituency*
          </label>
          <input
            id="constituency"
            name="constituency"
            type="text"
            placeholder="Constituency"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Ward */}
        <div>
          <label
            htmlFor="ward"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Ward*
          </label>
          <input
            id="ward"
            name="ward"
            type="text"
            placeholder="Ward"
            required
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        {/* Signature */}
        <div className="space-y-2">
          <label
            htmlFor="signature"
            className="block text-sm font-medium text-zinc-700 md:text-base"
          >
            Signature*
          </label>
          <div className="h-24 w-full overflow-hidden rounded-md border border-zinc-500">
            <SignatureCanvas
              penColor="black"
              ref={signaturePad}
              canvasProps={{ className: 'w-full h-full' }}
            />
          </div>
          <button
            type="button"
            onClick={clearSignature}
            className="flex h-10 items-center rounded-lg bg-gray-200 bg-opacity-60 px-4 text-sm font-medium text-gray-600 transition-colors hover:scale-110 hover:bg-gray-100 active:scale-95"
          >
            Clear
          </button>
        </div>
        {/* footer buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Link href="/login">
            <Button className="hover:scale-110 active:scale-95">Login</Button>
          </Link>
          <Button type="submit" className="hover:scale-110 active:scale-95">
            Register
          </Button>
        </div>
      </form>
    </main>
  );
};

export default RegistrationForm;
