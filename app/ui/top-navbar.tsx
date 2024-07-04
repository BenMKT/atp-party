import Link from 'next/link';
import Menu from './top-nav-links';
import React from 'react';
import ATPLogo from './atp-logo';
import SignOut from './signout';
import { TbHeartHandshake } from 'react-icons/tb';

// create a top navigation bar component with the ATP logo and menu items
const NavBar = () => {
  return (
    <nav className=" fixed bottom-0 left-0 right-0 top-0 flex h-16 items-center justify-between border-b bg-sky-50 px-5">
      <div className="flex gap-2">
        <Link href="/">
          <ATPLogo />
        </Link>
        <Link href="/dashboard/members/register">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-sky-100 p-3 text-sm font-medium text-zinc-600 transition-transform duration-75 ease-in-out hover:scale-110 hover:bg-sky-300 hover:text-blue-600 active:scale-90 md:flex-none md:justify-start md:p-2 md:px-3">
            <TbHeartHandshake className='size-7' />
            <span className="hidden md:block">Join Us</span>
          </button>
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <Menu />
        <SignOut />
      </div>
    </nav>
  );
};

export default NavBar;
