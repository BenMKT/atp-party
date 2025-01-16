import { AdminDashboard } from './admin-dashboard';
import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Attendance Dashboard',
  description: 'Attendance dashboard for managing leaders accountability',
};

// Attendance Dashboard Page
const AdminAttendancePage = async () => {
  const session = await auth();

  // Check if the user is authenticated and has the necessary role to access this page
  if (
    !session ||
    (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-blue-50">
        <div className="flex h-screen animate-pulse items-center justify-center px-4">
          <div className="transform rounded-xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm transition-all hover:scale-105">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-red-400/30 blur-xl"></div>
                <div className=" relative rounded-full bg-red-500 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h3 className="mb-4 text-2xl font-bold text-red-600">
                  Access Restricted
                </h3>
                <p className="text-lg font-medium text-gray-600">
                  Must be either an Admin or Staff to view this page!
                </p>
                <Link
                  href="/login"
                  className="mt-6 hover:scale-105 inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Login to Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-sky-50">
      <div className="mb-3 p-6">
        <h1
          className={`${lusitana.className} text-center text-4xl font-bold text-blue-700`}
        >
          Attendance Analytics Dashboard
        </h1>
      </div>
      <AdminDashboard />
    </main>
  );
};

export default AdminAttendancePage;
