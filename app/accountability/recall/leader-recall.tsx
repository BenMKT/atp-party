'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { LeaderCard } from './leader-card';
import { LeaderModal } from './leader-modal';
import {
  Leaders,
  SortField,
  SortOrder,
  FilterOptions,
} from '../../lib/definitions';
import { sortLeaders, filterLeaders } from '../../lib/utils';
import { fetchLeaders } from '../../lib/data';
import { Button } from '@/app/ui/accountability/recall-ui/button';
import { Input } from '@/app/ui/accountability/recall-ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/accountability/recall-ui/select';

const ITEMS_PER_PAGE = 8;

export function RecallPage() {
  const [leaders, setLeaders] = useState<Leaders[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<Leaders | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filters, setFilters] = useState<FilterOptions>({
    county: '',
    position: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    async function loadLeaders() {
      try {
        setIsLoading(true);
        const data = await fetchLeaders();
        const validLeaders = data.filter(
          (leader): leader is Leaders => leader.position !== null,
        );
        setLeaders(validLeaders);
      } catch (error) {
        console.error('Failed to fetch leaders:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadLeaders();
  }, [refreshTrigger]);

  const handleOpenModal = (leader: Leaders) => {
    setSelectedLeader(leader);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSort = (value: string) => {
    const field = value as SortField;
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredAndSortedLeaders = filterLeaders(
    sortLeaders(leaders, sortField, sortOrder),
    filters,
  );
  const pageCount = Math.ceil(filteredAndSortedLeaders.length / ITEMS_PER_PAGE);
  const paginatedLeaders = filteredAndSortedLeaders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-sky-50">
        <div className="flex flex-col items-center gap-6">
          <div className="h-24 w-24 animate-spin rounded-full border-8 border-blue-600 border-t-transparent"></div>
          <span className="animate-pulse text-3xl font-semibold text-blue-600">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 p-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-blue-600">
        Recall Leaders
      </h1>
      <div className="mb-6 flex flex-wrap gap-4">
        <Select onValueChange={handleSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="position">Position</SelectItem>
            <SelectItem value="totalRecalls">Total Recalls</SelectItem>
            <SelectItem value="lastRecallDate">Last Recall Date</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
        <Input
          placeholder="Filter by county"
          value={filters.county}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFilterChange('county', e.target.value)
          }
          className="w-[200px]"
        />
        <Input
          placeholder="Filter by position"
          value={filters.position}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFilterChange('position', e.target.value)
          }
          className="w-[200px]"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedLeaders.map((leader) => (
          <LeaderCard
            key={leader.id}
            leader={leader}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: pageCount }, (_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            variant={currentPage === i + 1 ? 'default' : 'outline'}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <LeaderModal
        leader={selectedLeader}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
