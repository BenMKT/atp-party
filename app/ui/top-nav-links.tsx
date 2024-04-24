'use client'; // makes this a client-side component

import clsx from 'clsx';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SlMenu } from 'react-icons/sl';
import Link from 'next/link';
import React from 'react';

// create a top-nav links component with a dropdown menu for small screens
const Menu = () => {
  const currentPath = usePathname(); // gets the current path of the page

  const [isOpen, setIsOpen] = useState(false); // tracks state whether the dropdown menu is open or not

  // link objects array to store and map the menu links
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'News', href: '/news' },
    { label: 'Vote', href: '/vote' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  // function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // function to close the dropdown menu
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // function to render the menu links dynamically
  const renderMenuLinks = () => {
    return links.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className={clsx('text-zinc-500', {
            'font-bold text-black': currentPath === link.href,
          })}
          onClick={closeDropdown}>
          {link.label}
        </Link>
      </li>
    ));
  };

  return (
    <main>
      <div className="dropdown dropdown-end sm:hidden">
        {/* button to toggle the dropdown menu */}
        <button className="btn m-3" onClick={toggleDropdown}>
          <SlMenu />
        </button>
        {/* if the dropdown menu `isOpen`, render the menu links */}
        {isOpen && (
          <ul
            className="menu dropdown-content z-[1] w-52 rounded-box bg-emerald-200 p-2 shadow"
            onClick={closeDropdown}>
            {renderMenuLinks()}
          </ul>
        )}
      </div>
      <div>
        {/* contains a list of links that is always visible on large screens and hidden on small screens  */}
        <ul className="hidden space-x-6 sm:flex">{renderMenuLinks()}</ul>
      </div>
    </main>
  );
};

export default Menu;
