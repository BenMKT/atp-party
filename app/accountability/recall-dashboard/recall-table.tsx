'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/accountability/dashboard-ui/table';
import { Input } from '@/app/ui/accountability/recall-ui/input';
import { Button } from '@/app/ui/accountability/recall-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/accountability/recall-ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/accountability/recall-ui/dialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/app/ui/accountability/recall-ui/card';
import { Skeleton } from '@/app/ui/accountability/recall-ui/skeleton';
import { fetchRecallsWithDetails } from '@/app/lib/data';
import { updateRecallStatus } from '@/app/lib/actions';
import { RecallStatus } from '@prisma/client';
import { RecallResponse } from '@/app/lib/definitions';

// recall table
export const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecallResponse | null>(null);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetchRecallsWithDetails(
        currentPage,
        itemsPerPage,
        searchTerm,
        statusFilter,
      );
      setData(result);
    } catch (error) {
      console.error('Error fetching recalls:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, statusFilter, searchTerm]);

  const handleStatusChange = async (id: string, newStatus: RecallStatus) => {
    try {
      await updateRecallStatus(id, newStatus);
      fetchData(); // Refresh data after status update
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leader Recalls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
          <Input
            type="text"
            placeholder="Search leaders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200 text-lg font-bold">
                <TableHead>Leader Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>County</TableHead>
                <TableHead>Recall Subject</TableHead>
                <TableHead>Recall Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ) : data?.recalls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No recalls found
                  </TableCell>
                </TableRow>
              ) : (
                data?.recalls.map((recall) => (
                  <TableRow
                    key={recall.id}
                    className={
                      recall.status === 'PENDING'
                        ? 'bg-yellow-50'
                        : recall.status === 'COMPLETED'
                          ? 'bg-red-50'
                          : recall.status === 'APPROVED'
                            ? 'bg-green-50'
                            : recall.status === 'REJECTED'
                              ? 'bg-blue-50'
                              : ''
                    }
                  >
                    <TableCell>{recall.member.name}</TableCell>
                    <TableCell>{recall.member.position}</TableCell>
                    <TableCell>{recall.member.county}</TableCell>
                    <TableCell>{recall.subject}</TableCell>
                    <TableCell>
                      <Select
                        value={recall.status}
                        onValueChange={(value) =>
                          handleStatusChange(recall.id, value as RecallStatus)
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue>{recall.status}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="APPROVED">Approved</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {recall.member.name} - Recall Details
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Position:</span>
                              <span className="col-span-3">
                                {recall.member.position}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">County:</span>
                              <span className="col-span-3">
                                {recall.member.county}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Subject:</span>
                              <span className="col-span-3">
                                {recall.subject}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Status:</span>
                              <span className="col-span-3">
                                {recall.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Date Initiated:</span>
                              <span className="col-span-3">
                                {new Date(
                                  recall.createdAt,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Contact:</span>
                              <span className="col-span-3">
                                {recall.member.email} | {recall.member.phone}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                              <span className="font-bold">Details:</span>
                              <span className="col-span-3">
                                {recall.details}
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-gray-500">
            Showing {data ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {data ? Math.min(currentPage * itemsPerPage, data.total) : 0} of{' '}
            {data?.total || 0} entries
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, data?.pages || prev),
                )
              }
              disabled={!data || currentPage === data.pages || loading}
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
