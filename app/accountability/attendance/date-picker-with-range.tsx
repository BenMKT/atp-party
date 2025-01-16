'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/app/lib/utils';
import { Button } from '@/app/ui/accountability/attendance-ui/button';
import { Calendar } from '@/app/ui/accountability/attendance-ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/ui/accountability/attendance-ui/popover';

interface DatePickerWithRangeProps {
  className?: string;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export const DatePickerWithRange = ({
  className,
  onDateRangeChange,
}: DatePickerWithRangeProps) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 1), // January 1, 2024
    to: new Date(4024, 11, 31), // December 31, 4024
  });

  // Notify parent component when date range changes
  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onDateRangeChange(newDate);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {date.from.toDateString()} - {date.to.toDateString()}
                </>
              ) : (
                date.from.toDateString()
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
