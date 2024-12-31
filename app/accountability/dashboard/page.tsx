import { AdminDashboard } from './admin-dashboard';
import { lusitana } from '@/app/ui/fonts';

const AdminAttendancePage = () => {
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
