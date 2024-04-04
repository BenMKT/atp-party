import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts'; // import primary font from file
import '@/app/ui/global.css';
import NavBar from './ui/navbar';

// export const metadata: Metadata = {
//   title: {
//     template: '%s | ACCOUNTABILITY AND TRANSPARENCY PARTY', // The `%s` in the template will be replaced with the specific page title.
//   },
//   description: '#pamojatwaweza',
//   metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavBar />
        <main className='p-5 mt-16'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
