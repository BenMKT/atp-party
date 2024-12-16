// Configure Magic UI with Tailwind CSS and clsx for class merging
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// utility function (cn) helps merge Tailwind CSS classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a date string to a human-readable format
export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
