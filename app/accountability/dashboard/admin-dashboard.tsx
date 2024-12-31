'use client';

import { useState, useEffect } from 'react';
import { TownHallMeeting } from '@/app/lib/definitions';
import { AdminOverviewCards } from '@/app/accountability/dashboard/overview-cards';
import { AdminMeetingsTable } from '@/app/accountability/dashboard/meetings-table';
import { AdminCharts } from '@/app/accountability/dashboard/charts';
import { AdminParticipantsPanel } from './participants-panel';

export const AdminDashboard = () => {
  const [meetings, setMeetings] = useState<TownHallMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/zoom/meetings');
        if (!response.ok) throw new Error('Failed to fetch meetings');
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <main className="space-y-8 p-6">
      <AdminOverviewCards meetings={meetings} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCharts meetings={meetings} isLoading={isLoading} />
        <AdminParticipantsPanel meetings={meetings} isLoading={isLoading} />
      </div>

      <AdminMeetingsTable meetings={meetings} isLoading={isLoading} />
    </main>
  );
};
