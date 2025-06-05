
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, FileText, Upload, AlertCircle, Bot, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  documents: string[];
}

const ApplicationAssistant = () => {
  const [selectedScheme, setSelectedScheme] = useState("PM-KISAN");
  const [currentStep, setCurrentStep] = useState(1);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: "Hi! I'm your application assistant. I'll help you complete your application step by step. What would you like help with today?"
    }
  ]);
  const [userMessage, setUserMessage] = useState("");
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

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    setChatMessages(prev => [...prev, { type: "user", message: userMessage }]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setChatMessages(prev => [...prev, { type: "bot", message: botResponse }]);
    }, 1000);

    setUserMessage("");
  };

  const generateBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("document") || lowerMessage.includes("upload")) {
      return "For document upload, make sure you have clear, colored scans of all required documents. Each file should be less than 5MB and in PDF or JPG format. Would you like me to guide you through the document requirements for your current step?";
    } else if (lowerMessage.includes("bank") || lowerMessage.includes("account")) {
      return "For bank account linking, you'll need your account number, IFSC code, and a cancelled cheque or bank passbook. Make sure the account is in your name and active. Do you need help with finding your IFSC code?";
    } else if (lowerMessage.includes("land") || lowerMessage.includes("khasra")) {
      return "Land details require your Khasra number, survey number, and land ownership documents. You can find these in your land records (Khatauni). If you don't have these, contact your local Patwari or village revenue officer.";
    } else if (lowerMessage.includes("status") || lowerMessage.includes("track")) {
      return "You can track your application status using your application reference number. It typically takes 15-30 days for processing. I can help you understand what each status means.";
    } else {
      return "I understand you need help with your application. Could you be more specific about what you're having trouble with? I can assist with documents, filling forms, or tracking your application status.";
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
      toast({
        title: "Step Selected",
        description: `Moved to step ${stepId}: ${currentScheme.steps[stepId - 1].title}`,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Application Assistant</h2>
        <p className="text-green-600">Get step-by-step guidance for your scheme applications</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Application Steps */}
        <div className="lg:col-span-2">
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-green-800">{currentScheme.name}</CardTitle>
                  <CardDescription>Application Progress</CardDescription>
                </div>
                <select
                  value={selectedScheme}
                  onChange={(e) => setSelectedScheme(e.target.value)}
                  className="p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none"
                >
                  <option value="PM-KISAN">PM-KISAN</option>
                  <option value="FASAL-BIMA">Fasal Bima Yojana</option>
                </select>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-green-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentScheme.steps.map((step) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      step.status === "completed"
                        ? "border-green-500 bg-green-50"
                        : step.status === "current"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {step.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className={`h-5 w-5 ${step.status === "current" ? "text-blue-600" : "text-gray-400"}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{step.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        {step.documents.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Required Documents:</p>
                            <div className="flex flex-wrap gap-1">
                              {step.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Assistant */}
        <div className="lg:col-span-1">
          <Card className="border-green-200 h-full">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI Assistant
              </CardTitle>
              <CardDescription>Ask questions about your application</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.type === "user"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-green-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about documents, steps, or status..."
                    className="flex-1 p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationAssistant;
