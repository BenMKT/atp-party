'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SlMenu } from 'react-icons/sl';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

// create a top-nav links component with a dropdown menu for small screens
const Menu = () => {
  const currentPath = usePathname(); // gets the current path of the page

  const [isOpen, setIsOpen] = useState(false); // tracks state whether the dropdown menu is open or not

  // link objects array to store and map the menu links
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Vote', href: '/vote' },
    { label: 'News', href: '/news' },
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

  // Define framer-motion variants for the parent
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child animation
      },
    },
  };

  // Define variants for the children
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  // function to render the menu links dynamically
  const renderMenuLinks = () => {
    return links.map((link) => (
      <motion.li
        key={link.href}
        variants={itemVariants}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          href={link.href}
          className={clsx(
            'rounded-md text-white md:p-3 md:text-zinc-600 md:hover:bg-sky-100 md:hover:text-blue-600',
            {
              'bg-blue-500 bg-opacity-50 font-bold md:bg-sky-300':
                currentPath === link.href,
            },
          )}
          onClick={closeDropdown}
        >
          {link.label}
        </Link>
      </motion.li>
    ));
  };

  return (
    <main>
      <div className="dropdown dropdown-end md:hidden">
        {/* button to toggle the dropdown menu */}
        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-sky-100 p-3 text-sm font-medium text-zinc-600 transition-transform duration-75 ease-in-out hover:scale-110 hover:bg-sky-300 hover:text-blue-600 active:scale-90 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={toggleDropdown}
        >
          <SlMenu className="size-5" />
        </button>
        {/* if the dropdown menu `isOpen`, render the menu links */}
        {isOpen && (
          <motion.ul
            className="menu dropdown-content z-50 rounded-box bg-black bg-opacity-50 p-2 shadow-lg shadow-[#1B5CFE]"
            onClick={closeDropdown}
            variants={variants} // Apply the defined variants
            initial="hidden" // Initial state before animation
            animate="visible" // Animate to this state
          >
            {renderMenuLinks()}
          </motion.ul>
        )}
      </div>
      <div>
        {/* contains a list of links that is always visible on large screens and hidden on small screens  */}
        <ul className="hidden space-x-5 md:flex">{renderMenuLinks()}</ul>
      </div>
    </main>
  );
};

export default Menu;
