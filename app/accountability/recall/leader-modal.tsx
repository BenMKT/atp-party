'use client';

import { useState, useTransition } from 'react';
import { Leaders } from '../../lib/definitions';
import { initiateRecall } from '../../lib/actions';
import { Button } from '@/app/ui/accountability/recall-ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/app/ui/accountability/recall-ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/ui/accountability/recall-ui/tabs';
import { Progress } from '@/app/ui/accountability/recall-ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/accountability/recall-ui/select';
import { Textarea } from '@/app/ui/accountability/recall-ui/textarea';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const RECALL_SUBJECTS = [
  'Misconduct in Office',
  'Violation of Oath',
  'Incompetence',
  'Financial Mismanagement',
  'Abuse of Power',
  'Negligence of Duty',
  'Ethics Violation',
  'Criminal Activity',
  'Corruption',
  'Other',
] as const;

interface LeaderModalProps {
  leader: Leaders | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeaderModal({ leader, isOpen, onClose }: LeaderModalProps) {
  const [isInitiatingRecall, setIsInitiatingRecall] = useState(false);
  const [recallProgress, setRecallProgress] = useState(0);
  const [recallSubject, setRecallSubject] = useState<string>('');
  const [recallDetails, setRecallDetails] = useState('');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!leader) return null;

  const handleInitiateRecall = async () => {
    if (!recallSubject || !recallDetails.trim()) {
      toast.error('Please provide both subject and details for the recall.');
      return;
    }

    setIsInitiatingRecall(true);
    try {
      await initiateRecall(leader.id, recallSubject, recallDetails);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setRecallProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsInitiatingRecall(false);
          toast.success('Recall initiated successfully!');
          // Reset form
          setRecallSubject('');
          setRecallDetails('');
          // Refresh the data and close modal
          startTransition(() => {
            router.refresh();
            onClose(); // This will trigger the refresh in the parent component
          });
        }
      }, 500);
    } catch (error) {
      console.error('Failed to initiate recall:', error);
      toast.error('Failed to initiate recall. Please try again.');
      setIsInitiatingRecall(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{leader.name}</DialogTitle>
          <DialogDescription className="font-medium text-blue-600">
            {leader.position}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="recalls">Recalls</TabsTrigger>
            <TabsTrigger value="initiate">Initiate Recall</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-semibold">Email:</span>
                <span className="col-span-3">{leader.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-semibold">Phone:</span>
                <span className="col-span-3">{leader.phone}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-semibold">County:</span>
                <span className="col-span-3">{leader.county}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-semibold">Constituency:</span>
                <span className="col-span-3">{leader.constituency}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-semibold">Ward:</span>
                <span className="col-span-3">{leader.ward}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-semibold">Total Recalls:</span>
                <span className="col-span-3">{leader.totalRecalls}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="recalls">
            <div className="mt-4">
              <h4 className="mb-2 font-semibold">Recall Breakdown:</h4>
              <ul>
                {leader.recallBreakdown.map((item, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.count} recalls
                      </span>
                    </div>
                    <Progress
                      value={(item.count / leader.totalRecalls) * 100}
                      className="mt-2"
                    />
                  </li>
                ))}
              </ul>
              {leader.recallBreakdown.length === 0 && (
                <p className="text-center text-gray-500">
                  No recalls initiated yet
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="initiate">
            <div className="mt-4">
              <h4 className="mb-2 font-semibold">Initiate Recall Process:</h4>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <Select
                    value={recallSubject}
                    onValueChange={setRecallSubject}
                    disabled={isInitiatingRecall}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recall subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {RECALL_SUBJECTS.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="details"
                    className="mb-2 block text-sm font-medium"
                  >
                    Details
                  </label>
                  <Textarea
                    id="details"
                    value={recallDetails}
                    onChange={(e) => setRecallDetails(e.target.value)}
                    placeholder="Enter recall details"
                    rows={4}
                    disabled={isInitiatingRecall}
                  />
                </div>
                {isInitiatingRecall ? (
                  <div>
                    <Progress value={recallProgress} className="mb-2" />
                    <p>Initiating recall... {recallProgress}%</p>
                  </div>
                ) : (
                  <Button onClick={handleInitiateRecall} variant="destructive">
                    Initiate Recall
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
