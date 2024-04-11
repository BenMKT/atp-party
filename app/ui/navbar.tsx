import Image from 'next/image';
import Link from 'next/link';
import Menu from './menu';
import React from 'react';

const NavBar = () => {
  return (
    <nav className=" flex h-16 items-center justify-between border-b px-5 top-0 left-0 right-0 bottom-0 fixed bg-white">
      <Link href="/">
        <Image src="/atplogo.png" alt="ATP party logo" width={50} height={50} />
      </Link>
      <Menu />
    </nav>
  );
};

export default NavBar;
