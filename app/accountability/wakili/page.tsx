import { Metadata } from 'next';
import WakiliAI from './wakili-AI';

export const metadata: Metadata = {
  title: 'Wakili AI',
  description: 'Wakili AI Website',
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
