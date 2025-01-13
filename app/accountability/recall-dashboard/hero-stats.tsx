'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/ui/accountability/recall-ui/card';
import { Skeleton } from '@/app/ui/accountability/recall-ui/skeleton';
import { fetchDashboardStats } from '@/app/lib/data';

interface StatsData {
  pendingRecalls: number;
  approvedRecalls: number;
  rejectedRecalls: number;
  completedRecalls: number;
  recalledLeaders: number;
}

export const HeroStats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Pending Recalls', value: stats?.pendingRecalls || 0 },
    { title: 'Approved Recalls', value: stats?.approvedRecalls || 0 },
    { title: 'Rejected Recalls', value: stats?.rejectedRecalls || 0 },
    { title: 'Completed Recalls', value: stats?.completedRecalls || 0 },
    { title: 'Recalled Leaders', value: stats?.recalledLeaders || 0 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-7">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-[50px]" />
            ) : (
              <div className="text-2xl font-bold">{stat.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
