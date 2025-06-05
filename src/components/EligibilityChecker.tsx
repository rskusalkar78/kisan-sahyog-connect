
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, User, MapPin, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    landSize: "",
    landOwnership: "",
    annualIncome: "",
    farmingType: "",
    state: "",
    age: "",
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
        landSize: { max: 5, unit: "hectares" },
        landOwnership: "owned",
        annualIncome: { max: 200000 },
        bankAccount: true
      }
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      criteria: {
        farmingType: ["seasonal", "perennial"],
        bankAccount: true,
        hasKisanCard: true
      }
    },
    {
      name: "Soil Health Card Scheme",
      criteria: {
        landOwnership: "owned",
        farmingType: ["seasonal", "perennial", "organic"]
      }
    },
    {
      name: "PM Kisan Credit Card",
      criteria: {
        age: { min: 18, max: 75 },
        landOwnership: "owned",
        bankAccount: true
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
    setIsChecking(true);
    
    setTimeout(() => {
      const eligibilityResults = schemes.map(scheme => {
        let isEligible = true;
        const missingCriteria: string[] = [];

        // Check land size
        if (scheme.criteria.landSize) {
          const userLandSize = parseFloat(formData.landSize);
          if (isNaN(userLandSize) || userLandSize > scheme.criteria.landSize.max) {
            isEligible = false;
            missingCriteria.push(`Land size should be max ${scheme.criteria.landSize.max} ${scheme.criteria.landSize.unit}`);
          }
        }

        // Check land ownership
        if (scheme.criteria.landOwnership && formData.landOwnership !== scheme.criteria.landOwnership) {
          isEligible = false;
          missingCriteria.push(`Requires ${scheme.criteria.landOwnership} land`);
        }

        // Check annual income
        if (scheme.criteria.annualIncome) {
          const userIncome = parseFloat(formData.annualIncome);
          if (isNaN(userIncome) || userIncome > scheme.criteria.annualIncome.max) {
            isEligible = false;
            missingCriteria.push(`Annual income should be max ₹${scheme.criteria.annualIncome.max.toLocaleString()}`);
          }
        }

        // Check farming type
        if (scheme.criteria.farmingType && !scheme.criteria.farmingType.includes(formData.farmingType)) {
          isEligible = false;
          missingCriteria.push(`Requires farming type: ${scheme.criteria.farmingType.join(" or ")}`);
        }

        // Check age
        if (scheme.criteria.age) {
          const userAge = parseInt(formData.age);
          if (isNaN(userAge) || userAge < scheme.criteria.age.min || userAge > scheme.criteria.age.max) {
            isEligible = false;
            missingCriteria.push(`Age should be between ${scheme.criteria.age.min}-${scheme.criteria.age.max} years`);
          }
        }

        // Check bank account
        if (scheme.criteria.bankAccount && formData.bankAccount !== "yes") {
          isEligible = false;
          missingCriteria.push("Requires bank account");
        }

        // Check Kisan Card
        if (scheme.criteria.hasKisanCard && formData.hasKisanCard !== "yes") {
          isEligible = false;
          missingCriteria.push("Requires Kisan Credit Card");
        }

        return {
          schemeName: scheme.name,
          isEligible,
          missingCriteria
        };
      });

      setResults(eligibilityResults);
      setIsChecking(false);
      
      toast({
        title: "Eligibility Check Complete",
        description: `Found ${eligibilityResults.filter(r => r.isEligible).length} schemes you're eligible for`,
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <CheckCircle className="h-6 w-6 mr-2" />
            Eligibility Checker
          </CardTitle>
          <CardDescription>
            Check your eligibility for various government schemes by providing your farming details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="landSize">Land Size (in hectares)</Label>
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
                <Label htmlFor="landOwnership">Land Ownership</Label>
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
                <Label htmlFor="annualIncome">Annual Income (₹)</Label>
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
                <Label htmlFor="farmingType">Farming Type</Label>
                <select
                  id="farmingType"
                  value={formData.farmingType}
                  onChange={(e) => handleInputChange("farmingType", e.target.value)}
                  className="w-full p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none"
                >
                  <option value="">Select farming type</option>
                  <option value="seasonal">Seasonal Crops</option>
                  <option value="perennial">Perennial Crops</option>
                  <option value="organic">Organic Farming</option>
                  <option value="mixed">Mixed Farming</option>
                </select>
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 35"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="border-green-200 focus:border-green-400"
                />
              </div>

              <div>
                <Label htmlFor="bankAccount">Do you have a bank account?</Label>
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

              <div>
                <Label htmlFor="hasKisanCard">Do you have Kisan Credit Card?</Label>
                <select
                  id="hasKisanCard"
                  value={formData.hasKisanCard}
                  onChange={(e) => handleInputChange("hasKisanCard", e.target.value)}
                  className="w-full p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <Button 
                onClick={checkEligibility}
                disabled={isChecking}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isChecking ? "Checking Eligibility..." : "Check Eligibility"}
              </Button>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-800">Eligibility Results</h3>
              {results.length === 0 ? (
                <Card className="border-green-200">
                  <CardContent className="p-6 text-center text-green-600">
                    Fill out the form and click "Check Eligibility" to see your results
                  </CardContent>
                </Card>
              ) : (
                results.map((result, index) => (
                  <Card key={index} className={`border ${result.isEligible ? 'border-green-500' : 'border-red-200'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{result.schemeName}</h4>
                        {result.isEligible ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Not Eligible
                          </Badge>
                        )}
                      </div>
                      {!result.isEligible && result.missingCriteria.length > 0 && (
                        <div className="text-sm text-red-600">
                          <p className="font-medium mb-1">Missing requirements:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {result.missingCriteria.map((criteria, i) => (
                              <li key={i}>{criteria}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EligibilityChecker;
