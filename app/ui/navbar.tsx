import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'News', href: '/news' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="mb-7 flex h-16 items-center space-x-6 border-b px-5">
      <Link href="/">
        <Image src="/atplogo.png" alt="ATP party logo" width={50} height={50} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className="text-zinc-500 transition-colors hover:text-zinc-950"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
