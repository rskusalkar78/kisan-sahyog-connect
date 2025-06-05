
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SchemeSelector from "./SchemeSelector";

interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  documents: string[];
}

interface StepProgressProps {
  currentScheme: {
    name: string;
    steps: ApplicationStep[];
  };
  selectedScheme: string;
  onSchemeChange: (scheme: string) => void;
  currentStep: number;
  onStepClick: (stepId: number) => void;
  progress: number;
}

const StepProgress = ({ currentScheme, selectedScheme, onSchemeChange, currentStep, onStepClick, progress }: StepProgressProps) => {
  const { toast } = useToast();

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      onStepClick(stepId);
      toast({
        title: "Step Selected",
        description: `Moved to step ${stepId}: ${currentScheme.steps[stepId - 1].title}`,
      });
    }
  };

  return (
    <Card className="border-green-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-green-800">{currentScheme.name}</CardTitle>
            <CardDescription>Application Progress</CardDescription>
          </div>
          <SchemeSelector selectedScheme={selectedScheme} onSchemeChange={onSchemeChange} />
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
  );
};

export default StepProgress;
