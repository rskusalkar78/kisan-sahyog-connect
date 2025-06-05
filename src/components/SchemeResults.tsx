
import { Clock } from "lucide-react";

interface SchemeResultsProps {
  filteredSchemesCount: number;
  totalSchemesCount: number;
}

const SchemeResults = ({ filteredSchemesCount, totalSchemesCount }: SchemeResultsProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="text-green-700">
        Showing {filteredSchemesCount} of {totalSchemesCount} schemes
      </p>
      <div className="flex items-center space-x-2 text-sm text-green-600">
        <Clock className="h-4 w-4" />
        <span>Last updated: December 2024</span>
      </div>
    </div>
  );
};

export default SchemeResults;
