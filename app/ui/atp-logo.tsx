import { lusitana } from './fonts';
import Image from 'next/image';

// create a reusable component to display the ATP party logo
const ATPLogo = () => {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center gap-4 leading-none text-gray-600`}>
      <Image src="/atplogo.png" alt="ATP party logo" width={50} height={50} />
    </div>
  );
};

export default ATPLogo;
