
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, CheckCircle, XCircle, User } from "lucide-react";
import SchemeApplicationForm from "./SchemeApplicationForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface SchemeCardProps {
  scheme: {
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
  };
}

const SchemeCard = ({ scheme }: SchemeCardProps) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<{
    isEligible: boolean;
    missingCriteria: string[];
  } | null>(null);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const checkEligibility = () => {
    setIsCheckingEligibility(true);
    
    // Simple eligibility simulation based on scheme type
    setTimeout(() => {
      let isEligible = true;
      const missingCriteria: string[] = [];
      
      // Basic eligibility rules simulation
      if (scheme.category === "Income Support") {
        // Simulate land size requirement
        const hasSmallLand = Math.random() > 0.3;
        if (!hasSmallLand) {
          isEligible = false;
          missingCriteria.push(t('eligibility.land_size_required'));
        }
      }
      
      if (scheme.category === "Insurance") {
        // Simulate bank account requirement
        const hasBankAccount = Math.random() > 0.2;
        if (!hasBankAccount) {
          isEligible = false;
          missingCriteria.push(t('eligibility.bank_account_required'));
        }
      }
      
      if (scheme.category === "Loan") {
        // Simulate age and income requirements
        const meetsAgeRequirement = Math.random() > 0.1;
        if (!meetsAgeRequirement) {
          isEligible = false;
          missingCriteria.push(t('eligibility.age_requirement'));
        }
      }
      
      setEligibilityResult({ isEligible, missingCriteria });
      setIsCheckingEligibility(false);
      
      toast({
        title: isEligible ? t('eligibility.eligible') : t('eligibility.not_eligible'),
        description: isEligible 
          ? t('eligibility.can_apply') 
          : `${missingCriteria.length} ${t('eligibility.requirements_missing')}`,
        variant: isEligible ? "default" : "destructive"
      });
    }, 2000);
  };

  const handleApplyClick = () => {
    if (!eligibilityResult) {
      toast({
        title: t('eligibility.check_first'),
        description: t('eligibility.check_before_apply'),
        variant: "destructive"
      });
      return;
    }
    
    if (!eligibilityResult.isEligible) {
      toast({
        title: t('eligibility.not_eligible'),
        description: t('eligibility.cannot_apply'),
        variant: "destructive"
      });
      return;
    }
    
    setShowApplicationForm(true);
  };

  return (
    <>
      <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {scheme.category}
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-700">
              {scheme.status}
            </Badge>
          </div>
          <CardTitle className="text-green-800 text-lg leading-tight">{scheme.title}</CardTitle>
          <CardDescription className="text-green-600 text-sm">{scheme.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-green-700">{t('schemes.amount')}:</span>
                <span className="font-bold text-green-800">{scheme.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-700">{t('schemes.beneficiaries')}:</span>
                <span className="font-bold text-green-800">{scheme.beneficiaries}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-700">{t('schemes.deadline')}:</span>
                <span className="font-bold text-green-800">{scheme.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-700">{t('schemes.state')}:</span>
                <span className="font-bold text-green-800">{scheme.state}</span>
              </div>
            </div>
            
            {/* Eligibility Status */}
            {eligibilityResult && (
              <div className={`p-3 rounded-lg border ${
                eligibilityResult.isEligible 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2">
                  {eligibilityResult.isEligible ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    eligibilityResult.isEligible ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {eligibilityResult.isEligible ? t('eligibility.eligible') : t('eligibility.not_eligible')}
                  </span>
                </div>
                {!eligibilityResult.isEligible && eligibilityResult.missingCriteria.length > 0 && (
                  <ul className="mt-2 text-xs text-red-700 list-disc list-inside">
                    {eligibilityResult.missingCriteria.map((criteria, index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            
            <div className="pt-2 space-y-2">
              <Button 
                onClick={checkEligibility}
                disabled={isCheckingEligibility}
                variant="outline"
                className="w-full border-blue-200 hover:bg-blue-50 text-blue-700"
              >
                <User className="h-4 w-4 mr-2" />
                {isCheckingEligibility ? t('eligibility.checking') : t('eligibility.check')}
              </Button>
              
              <Button 
                onClick={handleApplyClick}
                disabled={!eligibilityResult || !eligibilityResult.isEligible}
                className={`w-full ${
                  eligibilityResult?.isEligible 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {t('schemes.apply')}
              </Button>
              
              <Button variant="outline" className="w-full border-green-200 hover:bg-green-50">
                {t('schemes.details')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showApplicationForm && (
        <SchemeApplicationForm
          schemeName={scheme.title}
          onClose={() => setShowApplicationForm(false)}
        />
      )}
    </>
  );
};

export default SchemeCard;
