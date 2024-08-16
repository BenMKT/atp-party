import { PowerIcon } from '@heroicons/react/24/outline';
import { logOut } from '../lib/actions';

// create a sign-out component to log out a user
const SignOut = () => {
  return (
    <form action={logOut}>
      <button
        type="submit"
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-sky-100 p-3 text-sm font-medium text-zinc-600 transition-transform duration-75 ease-in-out hover:bg-sky-300 hover:text-blue-600 hover:scale-110 active:scale-90 md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
};

export default SignOut;
