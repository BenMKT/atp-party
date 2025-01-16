'use client';

import { useState } from 'react';
import { HeroStats } from '@/app/accountability/recall-dashboard/hero-stats';
import { ChartsGrid } from '@/app/accountability/recall-dashboard/charts-grid';
import { DataTable } from '@/app/accountability/recall-dashboard/recall-table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/ui/accountability/recall-ui/tabs';

const RecallDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-sky-50 p-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
         Recall Leaders Dashboard
      </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recalls">Recalls</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <HeroStats />
            <ChartsGrid />
          </TabsContent>
          <TabsContent value="recalls">
            <DataTable />
          </TabsContent>
        </Tabs>
      </main>
  );
};

export default RecallDashboard;
