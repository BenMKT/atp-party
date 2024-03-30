import Image from 'next/image';
import Link from 'next/link';
import Menu from './menu';
import React from 'react';

const NavBar = () => {
  return (
    <nav className="mb-7 flex h-16 items-center justify-between border-b px-5">
      <Link href="/">
        <Image src="/atplogo.png" alt="ATP party logo" width={50} height={50} />
      </Link>
      <Menu />
    </nav>
  );
};

export default NavBar;
