'use client';

import {
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { RxDashboard } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

// create a list of navigation links with their respective icons and hrefs for the dashboard sidebar navigation menu
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: RxDashboard },
  { name: 'Members', href: '/dashboard/members', icon: UserGroupIcon },
  { name: 'Bills', href: '/dashboard/bills', icon: DocumentDuplicateIcon },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
