import ATPLogo from '@/app/ui/atp-logo';
import LoginForm from '../ui/login-form';
import NavBar from '../ui/top-navbar';

// create a login page component to display the login form
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <NavBar />
      <div className="relative mx-auto mt-20 flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
