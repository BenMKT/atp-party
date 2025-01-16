import { Metadata } from 'next';
import WakiliAI from './wakili-AI';

export const metadata: Metadata = {
  title: 'Wakili AI',
  description: 'Democratizing legal services to the people',
};

// Wakili AI Page
const WakiliPage = () => {
  return (
    <main className="bg-sky-50">
      <WakiliAI />
    </main>
  );
};

export default WakiliPage;
