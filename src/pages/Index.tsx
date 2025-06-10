
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, TrendingUp, Calendar, MapPin, FileText, Award, BookOpen, CheckCircle, Bot, Upload, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const featuredSchemes = [
    {
      id: 1,
      title: "PM-KISAN Samman Nidhi",
      description: "Direct income support of ₹6000 per year to farmer families",
      amount: "₹6,000/year",
      deadline: "Ongoing",
      category: "Income Support",
      status: "Active",
      beneficiaries: "12 Crore+"
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme protecting farmers against production risks",
      amount: "Up to ₹2 Lakh",
      deadline: "Seasonal",
      category: "Insurance",
      status: "Active",
      beneficiaries: "5.5 Crore+"
    },
    {
      id: 3,
      title: "Soil Health Card Scheme",
      description: "Free soil testing and health cards for optimal fertilizer use",
      amount: "Free",
      deadline: "Ongoing",
      category: "Soil Health",
      status: "Active",
      beneficiaries: "22 Crore+"
    }
  ];

  const recentNews = [
    {
      title: "New MSP rates announced for Rabi crops 2024-25",
      date: "Dec 2024",
      category: "Policy Update"
    },
    {
      title: "Digital Agriculture Mission 2.0 launched",
      date: "Nov 2024",
      category: "Technology"
    },
    {
      title: "Subsidy rates increased for organic farming",
      date: "Nov 2024",
      category: "Subsidy"
    }
  ];

  const quickStats = [
    { label: "Total Schemes", value: "150+", icon: Award },
    { label: "Active Beneficiaries", value: "25 Cr+", icon: TrendingUp },
    { label: "Budget Allocated", value: "₹2.8L Cr", icon: FileText },
    { label: "States Covered", value: "36", icon: MapPin }
  ];

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new scheme updates available",
    });
  };

  const handleSchemeApply = (schemeName: string) => {
    toast({
      title: "Application Started",
      description: `Redirecting to ${schemeName} application form`,
    });
  };

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case "schemes":
        navigate("/schemes");
        break;
      case "eligibility":
        navigate("/eligibility");
        break;
      case "documents":
        navigate("/documents");
        break;
      case "status":
        navigate("/status");
        break;
      case "support":
        navigate("/support");
        break;
      case "assistant":
        toast({
          title: "Application Assistant",
          description: "Opening AI-powered application assistant...",
        });
        break;
      case "alerts":
        toast({
          title: "Real-Time Alerts",
          description: "Opening real-time alerts dashboard...",
        });
        break;
      default:
        toast({
          title: feature,
          description: `Opening ${feature}...`,
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">Agriconnect</h1>
                <p className="text-sm text-green-600">Government Schemes Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNotificationClick}
                className="border-green-200 hover:bg-green-50"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Login / Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Empowering Farmers with Government Schemes
          </h2>
          <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
            Access real-time information about government policies, subsidies, and schemes designed to support Indian agriculture
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for schemes, policies, or benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg border-green-200 focus:border-green-400 focus:ring-green-400"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-800">{stat.value}</div>
                  <div className="text-sm text-green-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">New Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card 
              className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick("schemes")}
            >
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">Schemes Database</h4>
                <p className="text-sm text-green-600">Browse comprehensive database of all government schemes</p>
                <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                  Explore Schemes
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick("eligibility")}
            >
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">Eligibility Checker</h4>
                <p className="text-sm text-green-600">Check your eligibility for multiple schemes instantly</p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700" variant="secondary">
                  Check Eligibility
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick("documents")}
            >
              <CardContent className="p-6 text-center">
                <Upload className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">Document Upload</h4>
                <p className="text-sm text-green-600">Upload and manage your application documents</p>
                <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700" variant="secondary">
                  Upload Documents
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick("status")}
            >
              <CardContent className="p-6 text-center">
                <Bell className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">Application Status</h4>
                <p className="text-sm text-green-600">Track your application progress</p>
                <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700" variant="secondary">
                  Check Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">Featured Schemes</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredSchemes.map((scheme) => (
              <Card key={scheme.id} className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {scheme.category}
                    </Badge>
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      {scheme.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-green-800">{scheme.title}</CardTitle>
                  <CardDescription className="text-green-600">{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-green-700">Benefit Amount:</span>
                      <span className="text-sm font-bold text-green-800">{scheme.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-green-700">Beneficiaries:</span>
                      <span className="text-sm font-bold text-green-800">{scheme.beneficiaries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-green-700">Deadline:</span>
                      <span className="text-sm font-bold text-green-800">{scheme.deadline}</span>
                    </div>
                    <div className="pt-4 space-y-2">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleSchemeApply(scheme.title)}
                      >
                        Apply Now
                      </Button>
                      <Button variant="outline" className="w-full border-green-200 hover:bg-green-50">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News & Updates */}
      <section className="py-12 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-green-800">Latest News & Updates</h3>
            <Button variant="outline" className="border-green-200 hover:bg-green-100">
              <BookOpen className="h-4 w-4 mr-2" />
              View All News
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentNews.map((news, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {news.category}
                    </Badge>
                    <div className="flex items-center text-sm text-green-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {news.date}
                    </div>
                  </div>
                  <h4 className="font-semibold text-green-800 leading-snug">{news.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-800 mb-8">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "All Schemes", icon: Award, color: "green", action: "schemes" },
              { title: "Document Upload", icon: Upload, color: "blue", action: "documents" },
              { title: "Application Status", icon: CheckCircle, color: "purple", action: "status" },
              { title: "Contact Support", icon: Phone, color: "orange", action: "support" }
            ].map((item, index) => (
              <Card 
                key={index} 
                className="border-green-200 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                onClick={() => handleFeatureClick(item.action)}
              >
                <CardContent className="p-8 text-center">
                  <item.icon className={`h-12 w-12 mx-auto mb-4 text-${item.color}-600`} />
                  <h4 className="font-semibold text-green-800">{item.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Award className="h-6 w-6" />
            <span className="text-xl font-bold">Agriconnect</span>
          </div>
          <p className="text-green-200 mb-4">
            Connecting farmers with government schemes for a prosperous agricultural future
          </p>
          <div className="text-sm text-green-300">
            © 2024 Agriconnect. A Government of India Initiative
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
