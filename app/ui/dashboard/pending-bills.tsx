import { fetchPendingBills } from '@/app/lib/data';
import {
  ArrowPathIcon,
  UserIcon,
  PhoneArrowUpRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import clsx from 'clsx';

// component to display pending bills on the dashboard page

const PendingBills = async () => {
  const pendingBills = await fetchPendingBills();

  return (
    <main>
      <div className="flex flex-col ">
        <h2
          className={`${lusitana.className} my-4 text-xl font-semibold md:text-2xl`}>
          Pending Invoices
        </h2>
        <div className="flex grow flex-col justify-between rounded-xl bg-amber-300 p-4">
          <div className="bg-white px-6">
            {pendingBills.map((bill, i) => {
              return (
                <div
                  key={bill.id}
                  className={clsx(
                    'flex flex-row items-center justify-between py-4',
                    {
                      'border-t': i !== 0,
                    },
                  )}>
                  <div className="flex items-center">
                    <UserIcon className="size-16" />
                    <div className="flex min-w-0 flex-col">
                      {/* member name */}
                      <p className="text-sm font-semibold md:text-base">
                        {bill.Member.name}
                      </p>
                      {/* phone number */}
                      <p className="hidden gap-1 text-sm text-gray-500 sm:inline-flex">
                        <PhoneArrowUpRightIcon className="h-4 w-4 text-gray-500" />
                        {bill.Member.mobileNumber}
                      </p>
                      {/* due date */}
                      <p
                        className={`${lusitana.className} inline-flex gap-1 truncate align-text-bottom text-sm font-semibold md:text-base`}>
                        <ClockIcon className="h-5 w-4 text-gray-500 sm:hidden" />
                        <span className="hidden sm:inline">Due Date:</span>
                        {bill.dueDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {/* bill amount */}
                  <div>
                    <p
                      className={`${lusitana.className} truncate text-sm font-semibold md:text-base`}
                    >
                      {`KSHS ${bill.amount}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* footer */}
          <div className="flex items-center pb-2 pt-6">
            <ArrowPathIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PendingBills;