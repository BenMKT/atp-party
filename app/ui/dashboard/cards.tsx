import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { FaMale, FaFemale, FaHourglassEnd } from 'react-icons/fa';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

// create an object map with the card type as the key and the corresponding icon as the value
const iconMap = {
  paid: BanknotesIcon,
  members: UserGroupIcon,
  pending: ClockIcon,
  bills: InboxIcon,
  overdue: FaHourglassEnd,
  male: FaMale,
  female: FaFemale,
};

// create a card component to display card data
export const Card = ({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type:
    | 'bills'
    | 'members'
    | 'overdue'
    | 'pending'
    | 'paid'
    | 'male'
    | 'female';
}) => {
  const Icon = iconMap[type];
  return (
    <main className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <p className="ml-2 text-sm font-medium">{title}</p>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
        {value}
      </p>
    </main>
  );
};

// create a card wrapper component to display the card components
export const CardWrapper = async () => {
  const {
    numberOfBills,
    numberOfMembers,
    totalPaidBills,
    totalPendingBills,
    totalOverdueBills,
    totalMale,
    totalFemale,
  } = await fetchCardData();
  return (
    <main className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card title="Total Members" value={numberOfMembers} type="members" />
      <Card
        title="Invoices Collected (KSHS)"
        value={totalPaidBills}
        type="paid" />
      <Card
        title="Invoices Pending (KSHS)"
        value={totalPendingBills}
        type="pending" />
      <Card
        title="Invoices Overdue (KSHS)"
        value={totalOverdueBills}
        type="overdue" />
      <Card title="Total Male" value={totalMale} type="male" />
      <Card title="Total Female" value={totalFemale} type="female" />
    </main>
  );
};
