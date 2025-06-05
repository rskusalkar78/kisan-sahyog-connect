import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, FileText, Upload, AlertCircle, Bot, MessageSquare, Send, Lightbulb, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      type: "bot",
      message: "Hello! I'm your AI Application Assistant. I can help you with document requirements, eligibility criteria, application status, and step-by-step guidance. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "What documents do I need?",
        "Check my eligibility",
        "Help with current step",
        "Application status"
      ]
    }
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

    const newUserMessage: ChatMessage = {
      type: "user",
      message: userMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = generateEnhancedBotResponse(userMessage);
      setChatMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);

    setUserMessage("");
  };

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
    setUserMessage(suggestion);
    handleSendMessage();
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
        <h2 className="text-2xl font-bold text-green-800 mb-2">AI Application Assistant</h2>
        <p className="text-green-600">Get intelligent, step-by-step guidance for your scheme applications</p>
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

        {/* Enhanced AI Chat Assistant */}
        <div className="lg:col-span-1">
          <Card className="border-green-200 h-full">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI Assistant
                <Badge className="ml-2 bg-green-100 text-green-800">Enhanced</Badge>
              </CardTitle>
              <CardDescription>Smart assistance for your application journey</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index}>
                    <div className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        msg.type === "user"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <span className="text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    {msg.suggestions && msg.type === "bot" && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {msg.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-green-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about documents, steps, eligibility..."
                    className="flex-1 p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!userMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Quick help available
                  </div>
                  <div className="flex items-center">
                    <HelpCircle className="h-3 w-3 mr-1" />
                    24/7 Support
                  </div>
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
