import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts'; // import primary font from file
import '@/app/ui/global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: {
    template: '%s - Accountability and Transparency Party', // The `%s` in the template will be replaced with the specific page title.
    default: 'Accountability and Transparency Party', // The default page title.
  },
  metadataBase: new URL('https://atp-party.vercel.app'), // The base URL for the site.
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // get the session data from the auth function and pass it to the SessionProvider
  const session = await auth();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <main>{children}</main>
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
