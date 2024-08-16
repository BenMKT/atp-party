'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { registerMember } from '@/app/lib/actions';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';
import { supabase } from '@/app/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// create a registration form component to capture user registration details
const RegistrationForm = () => {
  // Create a reference to the SignatureCanvas component
  const signaturePad = useRef<any>(null);
  // Create a function to clear the signature
  const clearSignature = () => {
    if (signaturePad.current) {
      signaturePad.current.clear();
    }
  };
  // Create a function to save the signature to DB
  const saveSignature = async () => {
    if (signaturePad.current) {
      const signatureImage = signaturePad.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      // Convert data URL to blob
      const blob = await (await fetch(signatureImage)).blob();
      // Generate a unique file name using uuidv4
      const fileName = `${uuidv4()}.png`;
      // Upload the blob to Supabase storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`signatures/${fileName}`, blob);

      if (error) {
        toast.error(error.message);
        return;
      }

      // Construct the URL to access the image directly
      const signatureURL = `https://hgtovaupiuxajqlkjdfg.supabase.co/storage/v1/object/public/images/${data.path}`;
      // Optionally, toast success message
      // toast.success('File uploaded successfully!');

      return signatureURL;
    }
    return undefined; // Ensure saveSignature returns undefined if no signature is saved
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call saveSignature and get the signature image
    const signatureImage = await saveSignature();

    if (!signatureImage) {
      toast.error('Signature is required.');
      return;
    }

    // Prepare form data here, including the signatureImage if necessary
    const formElement = document.getElementById(
      'registrationForm',
    ) as HTMLFormElement;
    const formData = new FormData(formElement);
    formData.append('signature', signatureImage);

    // Manually call registerMember with formData
    try {
      await registerMember(formData).then(() => {
        toast.success('Member registered successfully!');
        // Redirect or perform any action needed after registration
      });
    } catch (error) {
      // Use a type guard to check if error is an instance of Error
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        // Handle cases where error is not an Error object
        // For example, you might want to log it or display a generic error message
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <main className="z-30 w-full max-w-md rounded-lg bg-white bg-opacity-60 p-8 shadow-xl shadow-[#1B5CFE]">
      <h2 className="mb-6 text-center text-2xl font-bold text-primary">
        Register to Help Transform Kenya!
      </h2>
      <form onSubmit={handleSubmit} id="registrationForm" className="space-y-4">
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
              Choose your Gender
            </option>
            <option className="text-zinc-800" value="MALE">
              MALE
            </option>
            <option className="text-zinc-800" value="FEMALE">
              FEMALE
            </option>
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
              Please select an option
            </option>
            <option className="text-zinc-800" value="TRUE">
              TRUE
            </option>
            <option className="text-zinc-800" value="FALSE">
              FALSE
            </option>
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
            className="mt-1 block w-full rounded-md border border-zinc-500 bg-transparent px-3 py-2 text-zinc-800 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option disabled selected value="">
              Please select an option
            </option>
            <option className="text-zinc-800" disabled value="ADMIN">
              ADMIN
            </option>
            <option className="text-zinc-800" disabled value="STAFF">
              STAFF
            </option>
            <option className="text-zinc-800" value="MEMBER">
              MEMBER
            </option>
          </select>
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
            placeholder="Religion"
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
            className="flex h-10 items-center rounded-lg bg-gray-200 bg-opacity-60 px-4 text-sm font-medium text-gray-600 transition-colors hover:scale-110 hover:bg-gray-100 active:scale-95"
            type="button"
            onClick={clearSignature}
          >
            Clear
          </button>
        </div>
        {/* footer buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Link href="/login">
            <Button className="hover:scale-110 active:scale-95">Login</Button>
          </Link>
          <Button className="hover:scale-110 active:scale-95" type="submit">
            Register
          </Button>
        </div>
      </form>
    </main>
  );
};

export default RegistrationForm;
