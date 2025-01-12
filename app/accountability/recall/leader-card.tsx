import { useState } from 'react';
import { Leaders } from '../../lib/definitions';
import { Button } from '@/app/ui/accountability/recall-ui/button';
import { Badge } from '@/app/ui/accountability/recall-ui/badge';
import { Card, CardContent } from '@/app/ui/accountability/recall-ui/card';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/app/ui/accountability/recall-ui/avatar';

interface LeaderCardProps {
  leader: Leaders;
  onOpenModal: (leader: Leaders) => void;
}

export function LeaderCard({ leader, onOpenModal }: LeaderCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card
      className="relative overflow-hidden bg-white transition-all duration-300 ease-in-out hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={`/avatars/${leader.id}.jpg`}
                alt={leader.name}
              />
              <AvatarFallback>{getInitials(leader.name)}</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mb-1 text-xl font-bold text-gray-900">
            {leader.name}
          </h3>
          <p className="transform animate-bounce font-medium text-blue-600 transition-all duration-1000">
            {leader.position}
          </p>
          <p className="mb-2 transform animate-pulse text-xl font-medium text-green-800 transition-all duration-1000">
            {leader.county}
          </p>
          <div className="flex w-full flex-row justify-between">
            <Badge
              variant="secondary"
              className={`mb-4 ${
                leader.role === 'RECALLED' || leader.role === 'IMPEACHED'
                  ? 'bg-red-100 text-red-800'
                  : leader.role === 'ELECTED' || leader.role === 'NOMINATED'
                    ? 'bg-green-100 text-green-800'
                    : ''
              }`}
            >
              {leader.role}
            </Badge>
            <Badge variant="secondary" className="mb-4">
              {leader.totalRecalls} Recalls
            </Badge>
          </div>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button onClick={() => onOpenModal(leader)}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
