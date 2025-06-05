
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  type: "bot" | "user";
  message: string;
  timestamp: Date;
  suggestions?: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const ChatMessage = ({ type, message, timestamp, suggestions, onSuggestionClick }: ChatMessageProps) => {
  return (
    <div>
      <div className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}>
        <div className={`max-w-xs p-3 rounded-lg ${
          type === "user"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-800"
        }`}>
          <p className="text-sm">{message}</p>
          <span className="text-xs opacity-70">
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      {suggestions && type === "bot" && (
        <div className="mt-2 flex flex-wrap gap-1">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
