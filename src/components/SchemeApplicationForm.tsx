
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Briefcase, FileText, Phone, Mail } from "lucide-react";

interface SchemeApplicationFormProps {
  schemeName: string;
  onClose: () => void;
}

const SchemeApplicationForm = ({ schemeName, onClose }: SchemeApplicationFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    district: "",
    village: "",
    landSize: "",
    landOwnership: "",
    farmingType: "",
    crops: "",
    annualIncome: "",
    bankAccount: "",
    ifscCode: "",
    aadharNumber: "",
    rationCardNumber: "",
    additionalInfo: ""
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate application number
    const applicationNumber = `AGC${Date.now().toString().slice(-8)}`;
    
    toast({
      title: "Application Submitted Successfully!",
      description: `Your application number is ${applicationNumber}. You will receive updates on your registered mobile number.`,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-green-600 text-white">
          <CardTitle className="flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            Apply for {schemeName}
          </CardTitle>
          <CardDescription className="text-green-100">
            Fill in your farming details to apply for this scheme
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="fatherName">Father's Name *</Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Mobile Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                  <Input
                    id="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                    required
                    placeholder="XXXX-XXXX-XXXX"
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Address Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="village">Village/Town *</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => handleInputChange("village", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
              </div>
            </div>

            {/* Farming Information */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Farming Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landSize">Land Size (in acres) *</Label>
                  <Input
                    id="landSize"
                    type="number"
                    step="0.1"
                    value={formData.landSize}
                    onChange={(e) => handleInputChange("landSize", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="landOwnership">Land Ownership *</Label>
                  <select
                    id="landOwnership"
                    value={formData.landOwnership}
                    onChange={(e) => handleInputChange("landOwnership", e.target.value)}
                    required
                    className="w-full p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none"
                  >
                    <option value="">Select ownership type</option>
                    <option value="owned">Own Land</option>
                    <option value="leased">Leased Land</option>
                    <option value="shared">Share Cropping</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="farmingType">Farming Type *</Label>
                  <select
                    id="farmingType"
                    value={formData.farmingType}
                    onChange={(e) => handleInputChange("farmingType", e.target.value)}
                    required
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
                  <Label htmlFor="crops">Main Crops Grown *</Label>
                  <Input
                    id="crops"
                    value={formData.crops}
                    onChange={(e) => handleInputChange("crops", e.target.value)}
                    required
                    placeholder="e.g., Rice, Wheat, Cotton"
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="annualIncome">Annual Income (₹) *</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Bank Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankAccount">Bank Account Number *</Label>
                  <Input
                    id="bankAccount"
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="ifscCode">IFSC Code *</Label>
                  <Input
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                    required
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="rationCardNumber">Ration Card Number</Label>
                  <Input
                    id="rationCardNumber"
                    value={formData.rationCardNumber}
                    onChange={(e) => handleInputChange("rationCardNumber", e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Any additional information you would like to provide..."
                className="border-green-200 focus:border-green-400"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Submit Application
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-green-200 hover:bg-green-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemeApplicationForm;
