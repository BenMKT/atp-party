import * as React from 'react';
import { cn } from '@/app/lib/utils';

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ children, className }: ChartContainerProps) {
  return <div className={cn('relative', className)}>{children}</div>;
}

export const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`absolute rounded bg-white p-2 shadow-lg ${className}`}
    {...props}
  />
));
ChartTooltip.displayName = 'ChartTooltip';

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`text-sm ${className}`} {...props} />
));
ChartTooltipContent.displayName = 'ChartTooltipContent';
