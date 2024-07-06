import LoginForm from '../ui/login-form';
import NavBar from '../ui/top-navbar';

// create a login page component to display the login form
export default function LoginPage() {
  return (
    <main className="relative flex items-center justify-center overflow-hidden md:h-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute z-0 min-h-full w-auto min-w-full max-w-none"
        src="/loginBG.mp4" 
      />
      {/* Overlay to ensure content is visible on top of the video */}
      <div className="absolute z-10 min-h-dvh w-full bg-black bg-opacity-50" />
      <div className="z-20 mx-auto mt-20 flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <NavBar />
        <p className="h-15 flex w-full items-end rounded-lg bg-blue-500 p-3 text-xl text-white md:h-36 md:text-3xl">
          #OkoaKenya
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
