// Configure Magic UI with Tailwind CSS and clsx for class merging
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// utility function (cn) helps merge Tailwind CSS classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
