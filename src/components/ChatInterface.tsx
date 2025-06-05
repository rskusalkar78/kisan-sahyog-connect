
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Lightbulb, HelpCircle } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface ChatMessage {
  type: "bot" | "user";
  message: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatInterfaceProps {
  currentScheme: any;
  currentStep: number;
  onSuggestionClick: (suggestion: string) => void;
  generateBotResponse: (message: string) => ChatMessage;
}

const ChatInterface = ({ currentScheme, currentStep, onSuggestionClick, generateBotResponse }: ChatInterfaceProps) => {
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

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      type: "user",
      message: userMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setChatMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);

    setUserMessage("");
  };

  return (
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
            <ChatMessage
              key={index}
              type={msg.type}
              message={msg.message}
              timestamp={msg.timestamp}
              suggestions={msg.suggestions}
              onSuggestionClick={onSuggestionClick}
            />
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
  );
};

export default ChatInterface;
