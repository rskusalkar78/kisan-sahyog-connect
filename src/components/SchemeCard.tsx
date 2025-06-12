
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
      <Card className="farmer-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              {scheme.category}
            </Badge>
            <Badge variant="outline" className="border-primary text-primary">
              {scheme.status}
            </Badge>
          </div>
          <CardTitle className="farmer-text-accent text-lg leading-tight">{scheme.title}</CardTitle>
          <CardDescription className="farmer-text-muted text-sm">{scheme.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium farmer-text-muted">{t('schemes.amount')}:</span>
                <span className="font-bold farmer-text">{scheme.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium farmer-text-muted">{t('schemes.beneficiaries')}:</span>
                <span className="font-bold farmer-text">{scheme.beneficiaries}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium farmer-text-muted">{t('schemes.deadline')}:</span>
                <span className="font-bold farmer-text">{scheme.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium farmer-text-muted">{t('schemes.state')}:</span>
                <span className="font-bold farmer-text">{scheme.state}</span>
              </div>
            </div>
            
            {/* Eligibility Status */}
            {eligibilityResult && (
              <div className={`p-3 rounded-lg border ${
                eligibilityResult.isEligible 
                  ? 'bg-secondary border-primary/20' 
                  : 'bg-destructive/10 border-destructive/20'
              }`}>
                <div className="flex items-center space-x-2">
                  {eligibilityResult.isEligible ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <span className={`text-sm font-medium ${
                    eligibilityResult.isEligible ? 'text-primary' : 'text-destructive'
                  }`}>
                    {eligibilityResult.isEligible ? t('eligibility.eligible') : t('eligibility.not_eligible')}
                  </span>
                </div>
                {!eligibilityResult.isEligible && eligibilityResult.missingCriteria.length > 0 && (
                  <ul className="mt-2 text-xs text-destructive list-disc list-inside">
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
                className="w-full border-border hover:bg-accent text-accent-foreground"
              >
                <User className="h-4 w-4 mr-2" />
                {isCheckingEligibility ? t('eligibility.checking') : t('eligibility.check')}
              </Button>
              
              <Button 
                onClick={handleApplyClick}
                disabled={!eligibilityResult || !eligibilityResult.isEligible}
                className={`w-full farmer-button ${
                  eligibilityResult?.isEligible 
                    ? '' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {t('schemes.apply')}
              </Button>
              
              <Button variant="outline" className="w-full border-border hover:bg-accent">
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
