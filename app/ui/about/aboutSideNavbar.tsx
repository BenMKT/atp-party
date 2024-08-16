import Link from 'next/link';
import ATPLogo from '../atp-logo';
import { lusitana } from '../fonts';
import SignOut from '../signout';
import AboutNavLinks from './aboutNavLinks';

// create a sidebar navigation component for the about page layout
const AboutSideNav = () => {
  return (
    <main className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-sky-50 p-4 md:h-40"
        href="/"
      >
        <div
          className={`${lusitana.className} flex items-center gap-4 leading-none text-gray-600`}
        >
          <ATPLogo />
          <p className="hidden text-4xl md:block">ATP</p>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 overflow-hidden md:flex-col md:space-x-0 md:space-y-2">
        <AboutNavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-sky-50 md:block"></div>
        <SignOut />
      </div>
    </main>
  );
};

export default AboutSideNav;
