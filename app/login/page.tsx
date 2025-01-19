import LoginForm from './login-form';
import NavBar from '../ui/top-navbar';
import type { Metadata } from 'next';

// add metadata title for the login page
export const metadata: Metadata = {
  title: 'Login',
};

// create a login page component to display the login form
const LoginPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute z-0 min-h-full w-auto min-w-full max-w-none"
        src="/loginBG.mp4"
      />
      {/* Overlay to ensure content is visible on top of the video */}
      <div className="absolute z-10 min-h-full w-full bg-black bg-opacity-50" />
      <div className="z-20 mx-auto mt-20 flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <NavBar />
        <p className="h-15 flex w-full items-end rounded-lg bg-blue-500 bg-opacity-50 p-3 text-xl text-white md:h-36 md:text-3xl">
          #OkoaKenya
        </p>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
