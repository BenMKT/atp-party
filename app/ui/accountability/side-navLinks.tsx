'use client';

import { HomeIcon } from '@heroicons/react/24/outline';
import {
  FaBalanceScale,
  FaCalendar,
  FaChartLine,
  FaGavel,
  FaUserTie,
} from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

// create a list of navigation links with their respective icons and hrefs for the dashboard sidebar navigation menu
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Ajibika', href: '/accountability', icon: FaBalanceScale },
  {
    name: 'Attendance Tracker',
    href: '/accountability/attendance',
    icon: FaCalendar,
  },
  {
    name: 'Admin Dashboard',
    href: '/accountability/dashboard',
    icon: FaChartLine,
  },
  {
    name: 'Wakili',
    href: '/accountability/wakili',
    icon: FaUserTie,
  },
];

const NavLinks = () => {
  // get the current pathname of the page
  const pathname = usePathname();

  return (
    <main className="flex h-full grow gap-2 md:flex-col">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow origin-left items-center justify-center gap-2 rounded-md p-3 text-sm font-medium transition-transform duration-300 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-200 text-blue-600': pathname === link.href,
                'transform bg-sky-50 hover:scale-105 hover:bg-sky-100 hover:text-base hover:text-blue-600':
                  pathname !== link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <div className="hidden flex-grow rounded-md bg-sky-50 md:flex"></div>
    </main>
  );
};

export default NavLinks;
