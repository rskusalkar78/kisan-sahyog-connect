
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SchemeHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-green-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <ArrowLeft className="h-6 w-6 text-green-600" />
            <span className="text-lg font-semibold text-green-800">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-green-800">Schemes Database</h1>
        </div>
      </div>
    </header>
  );
};

export default SchemeHeader;
