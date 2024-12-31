import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/accountability/attendance-ui/select';

export const YearFilter = ({
  selectedYear,
  onYearChange,
  years,
}: {
  selectedYear: string;
  onYearChange: (year: string) => void;
  years: string[];
}) => {
  return (
    <Select value={selectedYear} onValueChange={onYearChange}>
      <SelectTrigger className="w-[180px] border-2 border-gray-300 hover:border-gray-400 focus:border-blue-500">
        <SelectValue placeholder="Filter by year" />
      </SelectTrigger>
      <SelectContent className="border-2">
        <SelectItem value="all">All Years</SelectItem>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
