import { useRef, useEffect } from "react";
import { Check, CheckCheck } from "lucide-react";
import { Conversation, Message, User } from "@/types/chat";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageListProps {
  conversation: Conversation;
  currentUser: User;
}

const MessageList = ({ conversation, currentUser }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  // Group messages by date
  const getMessageDate = (timestamp: string) => {
    // In a real app, you would properly parse the timestamp
    // For this demo, we'll just return the timestamp as is
    return timestamp.includes("AM") || timestamp.includes("PM") 
      ? "Today" 
      : timestamp;
  };

  // Render the appropriate status icon
  const renderStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  // Helper function to format message content (bold markdown)
  const formatContent = (content: string): string => {
    // Replace **text** with <strong>text</strong>
    return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Note: Add more formatting rules here if needed (e.g., italics, links)
  };

  // Group messages by sender (to avoid showing avatar for consecutive messages from same sender)
  const renderMessageGroups = () => {
    const messageGroups: Message[][] = [];
    let currentGroup: Message[] = [];
    let currentSenderId: string | null = null;
    let currentDate: string | null = null;

    conversation.messages.forEach((message, index) => {
      const messageDate = getMessageDate(message.timestamp);
      
      // Start a new group if sender changes or date changes
      if (message.sender.id !== currentSenderId || messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          messageGroups.push([...currentGroup]);
        }
        currentGroup = [message];
        currentSenderId = message.sender.id;
        currentDate = messageDate;
      } else {
        currentGroup.push(message);
      }
      
      // Handle the last message
      if (index === conversation.messages.length - 1 && currentGroup.length > 0) {
        messageGroups.push([...currentGroup]);
      }
    });

    return messageGroups;
  };

  const messageGroups = renderMessageGroups();

  return (
    <div className="flex-1 p-4 overflow-y-auto hide-scrollbar">
      {messageGroups.map((group, groupIndex) => {
        const isCurrentUser = group[0].sender.id === currentUser.id;
        const sender = group[0].sender;
        
        return (
          <div key={`group-${groupIndex}`} className="mb-4">
            {/* Date separator */}
            {groupIndex === 0 || getMessageDate(group[0].timestamp) !== getMessageDate(messageGroups[groupIndex - 1][0].timestamp) ? (
              <div className="flex justify-center mb-4">
                <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                  {getMessageDate(group[0].timestamp)}
                </span>
              </div>
            ) : null}
            
            <div className={cn("flex", isCurrentUser ? "justify-end" : "items-end")}>
              {/* Avatar (only for other users) */}
              {!isCurrentUser && (
                <Avatar className="w-8 h-8 mr-2 flex-shrink-0">
                  <AvatarImage src={sender.avatar} />
                  <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              
              {/* Message group */}
              <div className={cn("flex flex-col max-w-[90%] space-y-1", 
                isCurrentUser ? "items-end" : "items-start"
              )}>
                {/* Sender name (only for group chats and first message in a group) */}
                {conversation.isGroup && !isCurrentUser && (
                  <span className="text-xs font-medium text-gray-500 ml-1">
                    {sender.name}
                  </span>
                )}
                
                {/* Messages */}
                {group.map((message, messageIndex) => (
                  <div key={message.id} className="flex flex-col">
                    <div 
                      className={cn(
                        "relative group whitespace-pre-wrap",
                        isCurrentUser ? "user-message" : "other-message",
                        // Adjust borders for consecutive messages in a group
                        messageIndex === 0 && group.length > 1 
                          ? isCurrentUser ? "rounded-br-md" : "rounded-bl-md" 
                          : "",
                        messageIndex > 0 && messageIndex < group.length - 1 
                          ? isCurrentUser ? "rounded-r-md" : "rounded-l-md" 
                          : "",
                        messageIndex === group.length - 1 && group.length > 1 
                          ? isCurrentUser ? "rounded-tr-md" : "rounded-tl-md" 
                          : ""
                      )}
                      dir="auto"
                    >
                      {/* Use dangerouslySetInnerHTML to render formatted content */}
                      <div dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} />
                      
                      {/* Attachments */}
                      {message.attachments?.map(attachment => (
                        <div key={attachment.id} className="mt-2">
                          {attachment.type === 'image' && (
                            <img 
                              src={attachment.url} 
                              alt={attachment.name || 'Attachment'} 
                              className="rounded-md max-w-full h-auto max-h-60 object-contain"
                            />
                          )}
                          {attachment.type === 'file' && (
                            <div className="flex items-center p-2 bg-gray-100 rounded-md">
                              <span className="text-sm truncate">{attachment.name}</span>
                              <span className="ml-2 text-xs text-gray-500">{attachment.size}</span>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Time and status (only for the last message) */}
                      <div 
                        className={cn(
                          "flex items-center text-xs mt-1",
                          isCurrentUser ? "justify-end" : "justify-start"
                        )}
                      >
                        <span className={isCurrentUser ? "text-gray-400" : "text-gray-500"}>
                          {message.timestamp}
                        </span>
                        {isCurrentUser && (
                          <span className="ml-1">{renderStatusIcon(message.status)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
