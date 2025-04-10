
import { useState } from "react";
import { Smile, Paperclip, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Add emoji"
        >
          <Smile className="w-5 h-5 text-gray-500" />
        </button>
        
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>
        
        <div className="flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:border-chat-primary focus:ring-1 focus:ring-chat-primary"
          />
        </div>
        
        {message.trim() ? (
          <button
            type="submit"
            className="p-2 text-white bg-chat-primary rounded-full hover:bg-chat-secondary transition-colors"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Voice message"
          >
            <Mic className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
