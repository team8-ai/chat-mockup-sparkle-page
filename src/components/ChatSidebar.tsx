
import { useState } from "react";
import { Search, Edit, Settings, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, User } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  currentUser: User;
  onSelectConversation: (id: string) => void;
}

const ChatSidebar = ({ 
  conversations, 
  activeConversationId, 
  currentUser,
  onSelectConversation 
}: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(conversation => {
    const name = conversation.isGroup
      ? conversation.name
      : conversation.participants.find(p => p.id !== currentUser.id)?.name;
    
    return name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-80 flex flex-col h-full border-r border-gray-200 bg-white">
      {/* Sidebar header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Messages</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:border-chat-primary focus:ring-1 focus:ring-chat-primary text-sm"
          />
        </div>
      </div>
      
      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {filteredConversations.map(conversation => {
          const isActive = conversation.id === activeConversationId;
          const otherParticipants = conversation.isGroup
            ? conversation.participants
            : conversation.participants.filter(p => p.id !== currentUser.id);
          
          const displayName = conversation.isGroup
            ? conversation.name
            : otherParticipants[0]?.name;
          
          const lastMessage = conversation.lastMessage;
          
          return (
            <div
              key={conversation.id}
              className={cn(
                "flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors",
                isActive && "bg-gray-100 hover:bg-gray-100"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              {/* Avatar */}
              <div className="relative mr-3">
                {conversation.isGroup ? (
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-white">
                      <AvatarImage src={otherParticipants[0]?.avatar} />
                      <AvatarFallback>{displayName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-6 h-6 absolute -bottom-1 -right-1 border-2 border-white">
                      <AvatarImage src={otherParticipants[1]?.avatar} />
                      <AvatarFallback>{otherParticipants[1]?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={otherParticipants[0]?.avatar} />
                    <AvatarFallback>{displayName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                
                {/* Online status indicator */}
                {!conversation.isGroup && otherParticipants[0]?.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
                
                {/* Unread count badge */}
                {conversation.unreadCount && conversation.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-chat-primary rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              
              {/* Conversation details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-sm truncate">{displayName}</h3>
                  {lastMessage && (
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-1">
                      {lastMessage.timestamp}
                    </span>
                  )}
                </div>
                
                {lastMessage && (
                  <p className={cn(
                    "text-xs truncate",
                    conversation.unreadCount && conversation.unreadCount > 0
                      ? "font-medium text-gray-900"
                      : "text-gray-500"
                  )}>
                    {lastMessage.sender.id === currentUser.id ? "You: " : ""}
                    {lastMessage.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* New chat button */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center justify-center w-full py-2 px-4 bg-chat-primary text-white rounded-full hover:bg-chat-secondary transition-colors">
          <PlusCircle className="w-4 h-4 mr-2" />
          <span>New Chat</span>
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
