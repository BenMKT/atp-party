// Configure Magic UI with Tailwind CSS and clsx for class merging
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Leaders, FilterOptions, SortField, SortOrder } from './definitions';

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

// Filter leaders based on the provided filters
export const filterLeaders = (
  leaders: Leaders[],
  filters: FilterOptions,
): Leaders[] => {
  return leaders.filter(
    (leader) =>
      (filters.county === '' ||
        leader.county.toLowerCase().includes(filters.county.toLowerCase())) &&
      (filters.position === '' ||
        leader.position.toLowerCase().includes(filters.position.toLowerCase())),
  );
};

// Sort leaders based on the provided field and order
export const sortLeaders = (
  leaders: Leaders[],
  field: SortField,
  order: SortOrder,
): Leaders[] => {
  return [...leaders].sort((a, b) => {
    let comparison = 0;
    switch (field) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'position':
        comparison = a.position.localeCompare(b.position);
        break;
      case 'totalRecalls':
        comparison = a.totalRecalls - b.totalRecalls;
        break;
      case 'lastRecallDate':
        if (!a.lastRecallDate && !b.lastRecallDate) comparison = 0;
        else if (!a.lastRecallDate) comparison = -1;
        else if (!b.lastRecallDate) comparison = 1;
        else
          comparison =
            new Date(a.lastRecallDate).getTime() -
            new Date(b.lastRecallDate).getTime();
        break;
    }
    return order === 'asc' ? comparison : -comparison;
  });
};
