import { RecallPage } from './leader-recall';

export const metadata = {
  title: 'Recall',
  description: 'Initiate recalls for leaders accountability',
};

// Initiate Recall Tracker Page
const InitiateRecallPage = async () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <RecallPage />
    </main>
  );
};

export default InitiateRecallPage;
