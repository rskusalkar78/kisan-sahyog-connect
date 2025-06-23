
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Info, FileText } from "lucide-react";
import SchemeApplicationForm from "./SchemeApplicationForm";

interface Scheme {
  id: number;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  category: string;
  status: string;
  beneficiaries: string;
  eligibility: string;
  state: string;
  launchDate: string;
  lastUpdated: string;
}

interface SchemeCardProps {
  scheme: Scheme;
}

const SchemeCard = ({ scheme }: SchemeCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  console.log("SchemeCard rendered, showApplicationForm:", showApplicationForm);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Income Support": "bg-emerald-100 text-emerald-800",
      "Insurance": "bg-blue-100 text-blue-800",
      "Subsidy": "bg-purple-100 text-purple-800",
      "Loan": "bg-orange-100 text-orange-800",
      "Technology": "bg-cyan-100 text-cyan-800",
      "Soil Health": "bg-green-100 text-green-800",
      "Marketing": "bg-pink-100 text-pink-800",
      "Irrigation": "bg-teal-100 text-teal-800",
      "Seeds": "bg-yellow-100 text-yellow-800",
      "Equipment": "bg-indigo-100 text-indigo-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const handleApplyClick = () => {
    console.log("Apply button clicked for scheme:", scheme.title);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    console.log("Closing application form");
    setShowApplicationForm(false);
  };

  return (
    <>
      <Card className="border-green-200 hover:shadow-lg transition-all duration-300 hover:border-green-300 bg-gradient-to-br from-white to-green-50">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <Badge className={getCategoryColor(scheme.category)}>
              {scheme.category}
            </Badge>
            <Badge className={getStatusColor(scheme.status)}>
              {scheme.status}
            </Badge>
          </div>
          <CardTitle className="text-green-800 text-lg">{scheme.title}</CardTitle>
          <CardDescription className="text-green-600 line-clamp-2">
            {scheme.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-green-700">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="font-medium">{scheme.amount}</span>
            </div>
            <div className="flex items-center text-green-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{scheme.beneficiaries}</span>
            </div>
            <div className="flex items-center text-green-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{scheme.state}</span>
            </div>
            <div className="flex items-center text-green-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{scheme.deadline}</span>
            </div>
          </div>

          {showDetails && (
            <div className="space-y-3 pt-3 border-t border-green-200">
              <div>
                <h4 className="font-medium text-green-800 mb-1">Eligibility:</h4>
                <p className="text-sm text-green-600">{scheme.eligibility}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-green-600">
                <div>
                  <span className="font-medium">Launch Date:</span>
                  <p>{scheme.launchDate}</p>
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>
                  <p>{scheme.lastUpdated}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
            >
              <Info className="h-4 w-4 mr-1" />
              {showDetails ? "Less Info" : "More Info"}
            </Button>
            <Button
              size="sm"
              onClick={handleApplyClick}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <FileText className="h-4 w-4 mr-1" />
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {showApplicationForm && (
        <SchemeApplicationForm
          schemeName={scheme.title}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
};

export default SchemeCard;
