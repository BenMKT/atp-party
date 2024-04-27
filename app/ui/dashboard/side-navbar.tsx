import { PowerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ATPLogo from '../atp-logo';
import NavLinks from './side-nav-links';
import { lusitana } from '../fonts';

// create a sidebar navigation component for the dashboard layout
const SideNav = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-sky-400 p-4 md:h-40"
        href="/">
        <div
          className={`${lusitana.className} flex items-center gap-4 leading-none text-gray-600`}>
          <ATPLogo />
          <p className="hidden text-4xl md:block">ATP</p>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideNav;
