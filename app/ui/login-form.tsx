'use client';

import { lusitana } from '@/app/ui/fonts';
import { KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { HiOutlineIdentification } from 'react-icons/hi2';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';

// create a login form component to capture user login details
const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3 ">
      <div className="flex-1 rounded-lg bg-gray-50 bg-opacity-70 px-6 pb-2 pt-8">
        <h1 className={`${lusitana.className} text-center text-2xl`}>
          Already a member?
        </h1>
        <p className="text-center text-sm text-zinc-700">
          Please login to continue...
        </p>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="nationalId"
            >
              National ID
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-zinc-600 bg-transparent py-[9px] pl-10 text-sm text-zinc-800 outline-2 placeholder:text-zinc-600"
                id="nationalId"
                type="text"
                name="nationalId"
                placeholder="Enter your National ID number"
                required
              />
              <HiOutlineIdentification className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-600 peer-focus:text-zinc-800" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-zinc-600 bg-transparent py-[9px] pl-10 text-sm text-zinc-800 outline-2 placeholder:text-zinc-600"
                id="password"
                type="password"
                name="password"
                placeholder="Minimum 4 characters"
                required
                minLength={4}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-600 peer-focus:text-zinc-800" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <LoginButton />
          <Link
            href="/contact"
            className="text-sm text-zinc-700 hover:scale-105 hover:text-blue-500 active:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>
        <div className=" mt-3 text-center text-xs font-medium text-zinc-500">
          <hr className="mr-5 inline-flex h-1 w-1/3" />
          OR
          <hr className="ml-5 inline-flex h-1 w-1/3" />
        </div>
        <p className="mt-3 block text-center text-xs font-medium text-gray-900">
          Please register to become a member
        </p>
        <SignUpButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-1/3 bg-opacity-70 hover:scale-110 active:scale-95"
      aria-disabled={pending}
    >
      Login <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
};

const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <Link href="/dashboard/members/register">
      <Button
        className="mt-4 w-full bg-opacity-70 hover:scale-110 active:scale-95"
        aria-disabled={pending}
      >
        Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </Link>
  );
};

export default LoginForm;
