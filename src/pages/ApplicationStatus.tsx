
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, CheckCircle, Clock, XCircle, Eye, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  schemeName: string;
  applicationNumber: string;
  submittedDate: string;
  status: "pending" | "under-review" | "approved" | "rejected" | "completed";
  progress: number;
  lastUpdate: string;
  estimatedCompletion: string;
  amount?: string;
}

const ApplicationStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const applications: Application[] = [
    {
      id: "1",
      schemeName: "PM-KISAN Samman Nidhi",
      applicationNumber: "PMK2024001234",
      submittedDate: "2024-01-15",
      status: "approved",
      progress: 100,
      lastUpdate: "2024-01-20",
      estimatedCompletion: "Completed",
      amount: "₹6,000"
    },
    {
      id: "2",
      schemeName: "Pradhan Mantri Fasal Bima Yojana",
      applicationNumber: "PMFBY2024005678",
      submittedDate: "2024-01-10",
      status: "under-review",
      progress: 65,
      lastUpdate: "2024-01-18",
      estimatedCompletion: "2024-01-25"
    },
    {
      id: "3",
      schemeName: "PM Kisan Credit Card",
      applicationNumber: "KCC2024009876",
      submittedDate: "2024-01-05",
      status: "pending",
      progress: 25,
      lastUpdate: "2024-01-16",
      estimatedCompletion: "2024-01-30"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800";
      case "under-review":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "under-review":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleViewDetails = (applicationId: string) => {
    toast({
      title: "Application Details",
      description: `Viewing details for application ${applicationId}`,
    });
  };

  const handleDownloadCertificate = (applicationId: string) => {
    toast({
      title: "Download Started",
      description: "Certificate download has started",
    });
  };

  const filteredApplications = applications.filter(app =>
    app.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold text-green-800">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-green-800">Application Status</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Track Your Applications</h2>
          <p className="text-green-600">Monitor the progress of your scheme applications</p>
        </div>

        {/* Search */}
        <Card className="border-green-200 mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by scheme name or application number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 border-green-200 focus:border-green-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length === 0 ? (
            <Card className="border-green-200">
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Applications Found</h3>
                <p className="text-gray-600">Try adjusting your search or submit a new application</p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((application) => (
              <Card key={application.id} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-green-800">{application.schemeName}</CardTitle>
                      <CardDescription>
                        Application #{application.applicationNumber}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1 capitalize">{application.status.replace("-", " ")}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-green-600 mb-2">
                        <span>Progress</span>
                        <span>{application.progress}% Complete</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>

                    {/* Application Details */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Submitted:</span>
                        <p className="text-gray-600">{application.submittedDate}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Last Update:</span>
                        <p className="text-gray-600">{application.lastUpdate}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Expected Completion:</span>
                        <p className="text-gray-600">{application.estimatedCompletion}</p>
                      </div>
                      {application.amount && (
                        <div>
                          <span className="font-medium text-gray-700">Amount:</span>
                          <p className="text-green-600 font-bold">{application.amount}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(application.id)}
                        className="border-green-200 hover:bg-green-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {application.status === "approved" && (
                        <Button
                          size="sm"
                          onClick={() => handleDownloadCertificate(application.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
