'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/ui/accountability/recall-ui/card';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { ChartContainer } from '@/app/ui/accountability/recall-ui/chart';
import { fetchDashboardStats } from '@/app/lib/data';
import { Skeleton } from '@/app/ui/accountability/recall-ui/skeleton';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
);

const colors = [
  '#FF6384', // Red
  '#36A2EB', // Blue
  '#FFCE56', // Yellow
  '#4BC0C0', // Teal
  '#9966FF', // Purple
  '#FF9F40', // Orange
  '#0f5264', // Teal
  '#0bbfc9', // Blue
  '#50C878', // Emerald green
  '#8B4513', // Saddle brown
  '#DA70D6', // Orchid
  '#20B2AA', // Light sea green
  '#CD853F', // Peru
  '#6495ED', // Cornflower blue
  '#DC143C', // Crimson
];

// charts grid
export const ChartsGrid = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardStats();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // loading skeletons UI
  if (loading) {
    return (
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-[200px]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // charts data
  const countyData = {
    labels: chartData?.countyData.map((d: any) => d.county) || [],
    datasets:
      chartData?.subjects.map((subject: string, index: number) => ({
        label: subject,
        data: chartData?.countyData.map((d: any) => d[subject] || 0),
        backgroundColor: colors[index % colors.length],
      })) || [],
  };

  const countyTotals =
    chartData?.countyData.reduce(
      (acc: { [key: string]: number }, county: any) => {
        acc[county.county] = Object.values(county)
          .filter((val): val is number => typeof val === 'number')
          .reduce((sum, val) => sum + val, 0);
        return acc;
      },
      {},
    ) || {};

  const statusData = {
    labels: ['Pending', 'Approved', 'Rejected', 'Completed'],
    datasets: [
      {
        data: [
          chartData?.stats.pendingRecalls,
          chartData?.stats.approvedRecalls,
          chartData?.stats.rejectedRecalls,
          chartData?.stats.completedRecalls,
        ],
        backgroundColor: colors.slice(0, 4),
      },
    ],
  };

  const trendsData = {
    labels:
      chartData?.trendsData.map((d: any) => {
        const date = new Date(d.month);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
      }) || [],
    datasets: [
      {
        label: 'Recalls',
        data: chartData?.trendsData.map((d: any) => d.count) || [],
        borderColor: colors[0],
        tension: 0.1,
      },
    ],
  };

  const positionData = {
    labels: chartData?.positionData.map((d: any) => d.position) || [],
    datasets: [
      {
        data: chartData?.positionData.map((d: any) => d.count) || [],
        backgroundColor: colors,
      },
    ],
  };

  const subjectData = {
    labels: chartData?.subjectData.map((d: any) => d.subject) || [],
    datasets: [
      {
        label: 'Recalls',
        data: chartData?.subjectData.map((d: any) => d.count) || [],
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="mb-8 flex flex-wrap gap-6 md:grid md:grid-cols-2">
      <div className="flex min-w-[360px] flex-1 flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-center">Recalls by Subject</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <ChartContainer className="relative h-[350px] w-full">
              <Bar
                data={subjectData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        autoSkip: true,
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex min-w-[360px] flex-1 flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-center">
              Recall Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-2 sm:p-6">
            <ChartContainer className="relative h-[350px] w-full max-w-[400px]">
              <Pie
                data={statusData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }}
              />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex min-w-[360px] flex-1 flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-center">Recall Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <ChartContainer className="relative h-[350px] w-full">
              <Line
                data={trendsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        autoSkip: true,
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex min-w-[360px] flex-1 flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-center">
              Recalls by Leader Position
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-2 sm:p-6">
            <ChartContainer className="relative h-[350px] w-full max-w-[400px]">
              <Pie
                data={positionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }}
              />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex min-w-[360px] flex-1 flex-col md:col-span-2">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-center">
              Recalls by County and Subject
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <ChartContainer className="relative h-[350px] w-full">
              <Bar
                data={countyData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        title: (context) => {
                          const county = context[0].label;
                          return `${county} (Total: ${countyTotals[county]})`;
                        },
                      },
                    },
                    legend: {
                      position: 'top',
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                      ticks: {
                        autoSkip: true,
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
