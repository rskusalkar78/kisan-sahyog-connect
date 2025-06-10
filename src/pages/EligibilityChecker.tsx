
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    landSize: "",
    landOwnership: "",
    annualIncome: "",
    farmingType: "",
    state: "",
    hasKisanCard: "",
    bankAccount: ""
  });
  const [results, setResults] = useState<any[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const schemes = [
    {
      name: "PM-KISAN Samman Nidhi",
      criteria: {
        minAge: 18,
        maxAge: 75,
        landSize: { max: 5, unit: "hectares" },
        landOwnership: "owned",
        annualIncome: { max: 200000 },
        bankAccount: true
      }
    },
    {
      name: "Pradhan Mantri Kisan Maan Dhan Yojana",
      criteria: {
        minAge: 18,
        maxAge: 40,
        landSize: { max: 2, unit: "hectares" },
        landOwnership: "owned",
        bankAccount: true
      }
    },
    {
      name: "PM Kisan Credit Card",
      criteria: {
        minAge: 18,
        maxAge: 75,
        landOwnership: "owned",
        bankAccount: true
      }
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      criteria: {
        minAge: 18,
        maxAge: 70,
        farmingType: ["seasonal", "perennial"],
        bankAccount: true,
        hasKisanCard: true
      }
    },
    {
      name: "Soil Health Card Scheme",
      criteria: {
        minAge: 18,
        maxAge: 80,
        landOwnership: "owned",
        farmingType: ["seasonal", "perennial", "organic"]
      }
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const checkEligibility = () => {
    if (!formData.age || !formData.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and age to check eligibility",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);
    
    setTimeout(() => {
      const userAge = parseInt(formData.age);
      
      const eligibilityResults = schemes.map(scheme => {
        let isEligible = true;
        const missingCriteria: string[] = [];

        // Age is primary criteria for farmer eligibility
        if (userAge < scheme.criteria.minAge || userAge > scheme.criteria.maxAge) {
          isEligible = false;
          missingCriteria.push(`Age must be between ${scheme.criteria.minAge}-${scheme.criteria.maxAge} years`);
        }

        // Check other criteria if provided
        if (scheme.criteria.landSize && formData.landSize) {
          const userLandSize = parseFloat(formData.landSize);
          if (!isNaN(userLandSize) && userLandSize > scheme.criteria.landSize.max) {
            isEligible = false;
            missingCriteria.push(`Land size should be max ${scheme.criteria.landSize.max} ${scheme.criteria.landSize.unit}`);
          }
        }

        if (scheme.criteria.landOwnership && formData.landOwnership && formData.landOwnership !== scheme.criteria.landOwnership) {
          isEligible = false;
          missingCriteria.push(`Requires ${scheme.criteria.landOwnership} land`);
        }

        if (scheme.criteria.annualIncome && formData.annualIncome) {
          const userIncome = parseFloat(formData.annualIncome);
          if (!isNaN(userIncome) && userIncome > scheme.criteria.annualIncome.max) {
            isEligible = false;
            missingCriteria.push(`Annual income should be max ₹${scheme.criteria.annualIncome.max.toLocaleString()}`);
          }
        }

        if (scheme.criteria.farmingType && formData.farmingType && !scheme.criteria.farmingType.includes(formData.farmingType)) {
          isEligible = false;
          missingCriteria.push(`Requires farming type: ${scheme.criteria.farmingType.join(" or ")}`);
        }

        if (scheme.criteria.bankAccount && formData.bankAccount === "no") {
          isEligible = false;
          missingCriteria.push("Requires bank account");
        }

        if (scheme.criteria.hasKisanCard && formData.hasKisanCard === "no") {
          isEligible = false;
          missingCriteria.push("Requires Kisan Credit Card");
        }

        return {
          schemeName: scheme.name,
          isEligible,
          missingCriteria,
          ageEligible: userAge >= scheme.criteria.minAge && userAge <= scheme.criteria.maxAge
        };
      });

      setResults(eligibilityResults);
      setIsChecking(false);
      
      const eligibleCount = eligibilityResults.filter(r => r.isEligible).length;
      const ageEligibleCount = eligibilityResults.filter(r => r.ageEligible).length;
      
      toast({
        title: "Eligibility Check Complete",
        description: `Based on your age (${userAge}), you're age-eligible for ${ageEligibleCount} schemes and fully eligible for ${eligibleCount} schemes`,
      });
    }, 2000);
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
            <h1 className="text-2xl font-bold text-green-800">Eligibility Checker</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="border-green-200 max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <User className="h-6 w-6 mr-2" />
              Farmer Eligibility Checker
            </CardTitle>
            <CardDescription>
              Check your eligibility for various government schemes. Age verification is the primary criteria for most schemes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-green-700 mb-1">
                    Age (years) *
                  </label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 35"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                  <p className="text-xs text-green-600 mt-1">Most schemes require minimum age of 18 years</p>
                </div>

                <div>
                  <label htmlFor="landSize" className="block text-sm font-medium text-green-700 mb-1">
                    Land Size (hectares)
                  </label>
                  <Input
                    id="landSize"
                    type="number"
                    placeholder="e.g., 2.5"
                    value={formData.landSize}
                    onChange={(e) => handleInputChange("landSize", e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>

                <div>
                  <label htmlFor="landOwnership" className="block text-sm font-medium text-green-700 mb-1">
                    Land Ownership
                  </label>
                  <select
                    id="landOwnership"
                    value={formData.landOwnership}
                    onChange={(e) => handleInputChange("landOwnership", e.target.value)}
                    className="w-full p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none"
                  >
                    <option value="">Select ownership type</option>
                    <option value="owned">Owned</option>
                    <option value="leased">Leased</option>
                    <option value="shared">Share Cropping</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="annualIncome" className="block text-sm font-medium text-green-700 mb-1">
                    Annual Income (₹)
                  </label>
                  <Input
                    id="annualIncome"
                    type="number"
                    placeholder="e.g., 150000"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>

                <div>
                  <label htmlFor="bankAccount" className="block text-sm font-medium text-green-700 mb-1">
                    Do you have a bank account?
                  </label>
                  <select
                    id="bankAccount"
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                    className="w-full p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <Button 
                  onClick={checkEligibility}
                  disabled={isChecking || !formData.name || !formData.age}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isChecking ? "Checking Eligibility..." : "Check Age & Scheme Eligibility"}
                </Button>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Eligibility Results</h3>
                {results.length === 0 ? (
                  <Card className="border-green-200">
                    <CardContent className="p-6 text-center text-green-600">
                      Fill out your details and click "Check Eligibility" to see your results
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {formData.age && (
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-blue-800 mb-2">
                            Age Verification: {formData.age} years
                          </h4>
                          <p className="text-sm text-blue-700">
                            {formData.name}, based on your age, here are the schemes you may be eligible for:
                          </p>
                        </CardContent>
                      </Card>
                    )}
                    
                    {results.map((result, index) => (
                      <Card key={index} className={`border ${result.isEligible ? 'border-green-500 bg-green-50' : result.ageEligible ? 'border-yellow-500 bg-yellow-50' : 'border-red-200 bg-red-50'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-800">{result.schemeName}</h4>
                            {result.isEligible ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Fully Eligible
                              </Badge>
                            ) : result.ageEligible ? (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Age Eligible
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <XCircle className="h-3 w-3 mr-1" />
                                Not Eligible
                              </Badge>
                            )}
                          </div>
                          {result.missingCriteria.length > 0 && (
                            <div className="text-sm">
                              <p className="font-medium mb-1 text-gray-700">
                                {result.ageEligible ? "Additional requirements:" : "Missing requirements:"}
                              </p>
                              <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {result.missingCriteria.map((criteria: string, i: number) => (
                                  <li key={i}>{criteria}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EligibilityChecker;
