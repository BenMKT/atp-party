import Policies from '@/app/ui/about/policy';
import type { Metadata } from 'next';

// add metadata title for the policies page
export const metadata: Metadata = {
  title: 'Policies',
};

// create a component for the policies and documentations page
const PolicyDocs = () => {
  return (
    <main>
      <Policies />
    </main>
  );
};

export default PolicyDocs;
