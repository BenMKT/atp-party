import RegistrationForm from './registration-form';
import type { Metadata } from 'next';

// add metadata title for the registration page
export const metadata: Metadata = {
  title: 'Registration',
};

// create a register member page component with a registration form
const RegisterMember = () => {
  return (
    <main className="relative -m-6 flex min-h-screen items-center justify-center bg-[url('/register.jpeg')] bg-cover bg-center bg-no-repeat p-8 md:-m-12">
      {/* Overlay to ensure content is visible on top of the video */}
      <div className="absolute z-10 min-h-full w-full bg-black bg-opacity-50" />
      <RegistrationForm />
    </main>
  );
};

export default RegisterMember;
