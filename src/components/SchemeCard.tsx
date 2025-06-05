
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, Users, Calendar, MapPin, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleApply = (schemeName: string) => {
    toast({
      title: "Application Started",
      description: `Redirecting to ${schemeName} application process`,
    });
  };

  const formatLastUpdated = (lastUpdated: string) => {
    return `Updated ${lastUpdated}`;
  };

  return (
    <Card className="border-green-200 hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {scheme.category}
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-700">
            {scheme.status}
          </Badge>
        </div>
        <CardTitle className="text-green-800 text-lg">{scheme.title}</CardTitle>
        <CardDescription className="text-green-600">{scheme.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <IndianRupee className="h-4 w-4 text-green-600 mr-1" />
              <span className="font-medium">{scheme.amount}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-green-600 mr-1" />
              <span className="font-medium">{scheme.beneficiaries}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-green-600 mr-1" />
              <span className="font-medium">{scheme.deadline}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-green-600 mr-1" />
              <span className="font-medium">{scheme.state}</span>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-xs text-green-600 mb-2">
              <strong>Eligibility:</strong> {scheme.eligibility}
            </p>
            <div className="flex justify-between text-xs text-green-600">
              <span><strong>Launched:</strong> {scheme.launchDate}</span>
              <span className="text-blue-600 font-medium">{formatLastUpdated(scheme.lastUpdated)}</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => handleApply(scheme.title)}
            >
              Apply Now
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                Check Eligibility
              </Button>
              <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemeCard;
