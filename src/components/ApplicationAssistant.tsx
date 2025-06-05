
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StepProgress from "./StepProgress";
import ChatInterface from "./ChatInterface";

interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  documents: string[];
}

interface ChatMessage {
  type: "bot" | "user";
  message: string;
  timestamp: Date;
  suggestions?: string[];
}

const ApplicationAssistant = () => {
  const [selectedScheme, setSelectedScheme] = useState("PM-KISAN");
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const schemes = {
    "PM-KISAN": {
      name: "PM-KISAN Samman Nidhi",
      steps: [
        {
          id: 1,
          title: "Personal Information",
          description: "Provide your basic details and Aadhaar information",
          status: "completed" as const,
          documents: ["Aadhaar Card", "Pan Card"]
        },
        {
          id: 2,
          title: "Land Details",
          description: "Enter your land ownership and cultivation details",
          status: "current" as const,
          documents: ["Land Records", "Khasra Number", "Survey Settlement"]
        },
        {
          id: 3,
          title: "Bank Details",
          description: "Link your bank account for direct benefit transfer",
          status: "pending" as const,
          documents: ["Bank Passbook", "Cancelled Cheque"]
        },
        {
          id: 4,
          title: "Document Upload",
          description: "Upload all required documents",
          status: "pending" as const,
          documents: ["All Previous Documents"]
        },
        {
          id: 5,
          title: "Review & Submit",
          description: "Review your application and submit",
          status: "pending" as const,
          documents: []
        }
      ]
    },
    "FASAL-BIMA": {
      name: "Pradhan Mantri Fasal Bima Yojana",
      steps: [
        {
          id: 1,
          title: "Farmer Registration",
          description: "Register as a farmer with crop details",
          status: "completed" as const,
          documents: ["Farmer ID", "Aadhaar Card"]
        },
        {
          id: 2,
          title: "Crop Information",
          description: "Provide details about crops to be insured",
          status: "current" as const,
          documents: ["Sowing Certificate", "Land Records"]
        },
        {
          id: 3,
          title: "Insurance Premium",
          description: "Pay the premium amount",
          status: "pending" as const,
          documents: ["Payment Receipt"]
        },
        {
          id: 4,
          title: "Policy Document",
          description: "Download your insurance policy",
          status: "pending" as const,
          documents: []
        }
      ]
    }
  };

  const currentScheme = schemes[selectedScheme as keyof typeof schemes];
  const progress = (currentStep / currentScheme.steps.length) * 100;

  const generateEnhancedBotResponse = (message: string): ChatMessage => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("document") || lowerMessage.includes("upload")) {
      return {
        type: "bot",
        message: `For ${currentScheme.name}, you'll need these documents for your current step: ${currentScheme.steps[currentStep - 1].documents.join(', ')}. Make sure all documents are clear, colored scans in PDF or JPG format (max 5MB each). Would you like specific guidance on any document?`,
        timestamp: new Date(),
        suggestions: ["Document format help", "Where to get documents", "Continue to next step"]
      };
    } else if (lowerMessage.includes("eligibility") || lowerMessage.includes("qualify")) {
      return {
        type: "bot",
        message: "I can check your eligibility! For PM-KISAN, you need: 1) Cultivable land ownership, 2) Valid Aadhaar card, 3) Bank account in your name. For Fasal Bima, you need: 1) Farmer ID, 2) Crop cultivation proof. Would you like me to check specific criteria?",
        timestamp: new Date(),
        suggestions: ["Check PM-KISAN eligibility", "Check Fasal Bima eligibility", "Other schemes"]
      };
    } else if (lowerMessage.includes("status") || lowerMessage.includes("track")) {
      return {
        type: "bot",
        message: `Your current application status: Step ${currentStep} of ${currentScheme.steps.length} (${Math.round(progress)}% complete). Next action needed: ${currentScheme.steps[currentStep - 1].description}. Applications typically process in 15-30 days. Need help with the current step?`,
        timestamp: new Date(),
        suggestions: ["Help with current step", "View all steps", "Contact support"]
      };
    } else if (lowerMessage.includes("bank") || lowerMessage.includes("account")) {
      return {
        type: "bot",
        message: "For bank linking: 1) Account must be in applicant's name, 2) Active account with transactions, 3) Provide IFSC code and account number, 4) Upload cancelled cheque or bank passbook. Ensure your bank supports DBT (Direct Benefit Transfer). Need help finding your IFSC?",
        timestamp: new Date(),
        suggestions: ["Find IFSC code", "DBT enabled banks", "Bank document help"]
      };
    } else if (lowerMessage.includes("next") || lowerMessage.includes("continue")) {
      const nextStep = currentStep < currentScheme.steps.length ? currentStep + 1 : currentStep;
      return {
        type: "bot",
        message: `Ready to move to the next step? Step ${nextStep}: ${currentScheme.steps[nextStep - 1]?.title || "Application Complete"}. Make sure you've completed all requirements for the current step. Shall I guide you through the next step?`,
        timestamp: new Date(),
        suggestions: ["Yes, continue", "Review current step", "Save and exit"]
      };
    } else {
      return {
        type: "bot",
        message: "I'm here to help with your application! I can assist with document requirements, eligibility checking, step-by-step guidance, status tracking, and troubleshooting. What specific help do you need?",
        timestamp: new Date(),
        suggestions: ["Document help", "Eligibility check", "Step guidance", "Status update"]
      };
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // This will be handled by the ChatInterface component
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">AI Application Assistant</h2>
        <p className="text-green-600">Get intelligent, step-by-step guidance for your scheme applications</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StepProgress
            currentScheme={currentScheme}
            selectedScheme={selectedScheme}
            onSchemeChange={setSelectedScheme}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            progress={progress}
          />
        </div>

        <div className="lg:col-span-1">
          <ChatInterface
            currentScheme={currentScheme}
            currentStep={currentStep}
            onSuggestionClick={handleSuggestionClick}
            generateBotResponse={generateEnhancedBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationAssistant;
