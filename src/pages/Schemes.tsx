
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar, IndianRupee, Users, ArrowLeft, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Schemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const categories = ["All", "Income Support", "Insurance", "Subsidy", "Loan", "Technology", "Soil Health", "Marketing", "Irrigation", "Seeds", "Equipment"];

  const allSchemes = [
    {
      id: 1,
      title: "PM-KISAN Samman Nidhi",
      description: "Direct income support of ₹6000 per year to farmer families owning cultivable land",
      amount: "₹6,000/year",
      deadline: "Ongoing",
      category: "Income Support",
      status: "Active",
      beneficiaries: "12 Crore+",
      eligibility: "Small and marginal farmers with cultivable land",
      state: "All India",
      launchDate: "2019",
      lastUpdated: "Dec 2024"
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme protecting farmers against production risks",
      amount: "Up to ₹2 Lakh",
      deadline: "Seasonal",
      category: "Insurance",
      status: "Active",
      beneficiaries: "5.5 Crore+",
      eligibility: "All farmers growing notified crops",
      state: "All India",
      launchDate: "2016",
      lastUpdated: "Nov 2024"
    },
    {
      id: 3,
      title: "Soil Health Card Scheme",
      description: "Free soil testing and health cards for optimal fertilizer use",
      amount: "Free",
      deadline: "Ongoing",
      category: "Soil Health",
      status: "Active",
      beneficiaries: "22 Crore+",
      eligibility: "All farmers",
      state: "All India",
      launchDate: "2015",
      lastUpdated: "Dec 2024"
    },
    {
      id: 4,
      title: "PM Kisan Credit Card",
      description: "Easy access to credit for farmers at subsidized interest rates",
      amount: "Up to ₹3 Lakh",
      deadline: "Ongoing",
      category: "Loan",
      status: "Active",
      beneficiaries: "7 Crore+",
      eligibility: "All farmers with land records",
      state: "All India",
      launchDate: "1998",
      lastUpdated: "Dec 2024"
    },
    {
      id: 5,
      title: "Digital Agriculture Mission 2.0",
      description: "Technology-driven solutions for modern farming practices",
      amount: "₹2,817 Crore",
      deadline: "2024-26",
      category: "Technology",
      status: "Active",
      beneficiaries: "1 Crore+",
      eligibility: "Progressive farmers and FPOs",
      state: "Selected States",
      launchDate: "2021",
      lastUpdated: "Dec 2024"
    },
    {
      id: 6,
      title: "Paramparagat Krishi Vikas Yojana",
      description: "Promotion of organic farming through cluster approach",
      amount: "₹50,000/hectare",
      deadline: "March 2025",
      category: "Subsidy",
      status: "Active",
      beneficiaries: "8 Lakh+",
      eligibility: "Farmers interested in organic farming",
      state: "All India",
      launchDate: "2015",
      lastUpdated: "Dec 2024"
    },
    {
      id: 7,
      title: "PM Krishi Sinchai Yojana",
      description: "Expanding cultivated area under assured irrigation and improving water use efficiency",
      amount: "₹50,000 Crore",
      deadline: "2026",
      category: "Irrigation",
      status: "Active",
      beneficiaries: "2 Crore+",
      eligibility: "All farmers with irrigation needs",
      state: "All India",
      launchDate: "2015",
      lastUpdated: "Nov 2024"
    },
    {
      id: 8,
      title: "National Seeds Mission",
      description: "Quality seed production and distribution to increase crop productivity",
      amount: "₹25,000/hectare",
      deadline: "Ongoing",
      category: "Seeds",
      status: "Active",
      beneficiaries: "50 Lakh+",
      eligibility: "Seed producing farmers and agencies",
      state: "All India",
      launchDate: "2014",
      lastUpdated: "Oct 2024"
    },
    {
      id: 9,
      title: "Sub-Mission on Agricultural Mechanization",
      description: "Promoting farm mechanization for higher productivity",
      amount: "40-50% subsidy",
      deadline: "2025",
      category: "Equipment",
      status: "Active",
      beneficiaries: "15 Lakh+",
      eligibility: "Individual farmers, FPOs, SHGs",
      state: "All India",
      launchDate: "2014",
      lastUpdated: "Dec 2024"
    },
    {
      id: 10,
      title: "e-NAM (National Agriculture Market)",
      description: "Online trading platform for agricultural commodities",
      amount: "Free platform",
      deadline: "Ongoing",
      category: "Marketing",
      status: "Active",
      beneficiaries: "1.7 Crore+",
      eligibility: "All farmers and traders",
      state: "All India",
      launchDate: "2016",
      lastUpdated: "Dec 2024"
    },
    {
      id: 11,
      title: "Pradhan Mantri Kisan Maan Dhan Yojana",
      description: "Pension scheme for small and marginal farmers",
      amount: "₹3,000/month pension",
      deadline: "Ongoing",
      category: "Income Support",
      status: "Active",
      beneficiaries: "25 Lakh+",
      eligibility: "Small and marginal farmers (18-40 years)",
      state: "All India",
      launchDate: "2019",
      lastUpdated: "Nov 2024"
    },
    {
      id: 12,
      title: "Formation & Promotion of FPOs",
      description: "Supporting formation of Farmer Producer Organizations",
      amount: "₹18.5 Lakh/FPO",
      deadline: "2024-25",
      category: "Subsidy",
      status: "Active",
      beneficiaries: "10,000 FPOs",
      eligibility: "Groups of farmers",
      state: "All India",
      launchDate: "2020",
      lastUpdated: "Oct 2024"
    }
  ];

  const filteredSchemes = allSchemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
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

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search schemes by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 border-green-200 focus:border-green-400"
              />
            </div>
            <Button variant="outline" className="border-green-200 hover:bg-green-50">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : "border-green-200 hover:bg-green-50"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-green-700">
            Showing {filteredSchemes.length} of {allSchemes.length} schemes
          </p>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Clock className="h-4 w-4" />
            <span>Last updated: December 2024</span>
          </div>
        </div>

        {/* Enhanced Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="border-green-200 hover:shadow-xl transition-all duration-300">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
