import Link from 'next/link';
import Menu from './top-nav-links';
import React from 'react';
import ATPLogo from './atp-logo';

// create a top navigation bar component with the ATP logo and menu items
const NavBar = () => {
  return (
    <nav className=" fixed bottom-0 left-0 right-0 top-0 flex h-16 items-center justify-between border-b bg-white px-5">
      <Link href="/">
        <ATPLogo />
      </Link>
      <Menu />
    </nav>
  );
};

export default NavBar;
