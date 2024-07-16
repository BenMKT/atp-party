import { lusitana } from './fonts';
import Image from 'next/image';

// create a reusable component to display the ATP party logo
const ATPLogo = () => {
  return (
    <div
      className={`${lusitana.className} flex h-auto flex-row items-center md:gap-4 md:leading-none md:text-gray-600`}
    >
      <Image
        className="h-auto rounded-lg"
        src="/atplogo.png"
        alt="ATP party logo"
        width={70}
        height={50}
        quality={100}
      />
    </div>
  );
};

export default ATPLogo;
