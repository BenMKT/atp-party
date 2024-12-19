'use client';

import {
  HomeIcon,
} from '@heroicons/react/24/outline';
import { FaBalanceScale, FaCalendar } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

// create a list of navigation links with their respective icons and hrefs for the dashboard sidebar navigation menu
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Ajibika', href: '/accountability', icon: FaBalanceScale },
  { name: 'Attendance', href: '/accountability/attendance', icon: FaCalendar },
];

const NavLinks = () => {
  // get the current pathname of the page
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            style={{ transformOrigin: 'left' }}
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium transition-transform duration-300 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-200 text-blue-600': pathname === link.href,
                'transform bg-sky-50 hover:scale-110 hover:bg-sky-100 hover:text-base hover:text-blue-600':
                  pathname !== link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
