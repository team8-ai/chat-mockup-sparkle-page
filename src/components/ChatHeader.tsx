
import { Conversation, User } from "@/types/chat";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Phone, Search, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  conversation: Conversation;
  currentUser: User;
}

const ChatHeader = ({ conversation, currentUser }: ChatHeaderProps) => {
  // Filter out the current user from participants for 1:1 chats
  const otherParticipants = conversation.isGroup 
    ? conversation.participants
    : conversation.participants.filter(p => p.id !== currentUser.id);
  
  // For group chats, use the group name. For 1:1 chats, use the other person's name
  const displayName = conversation.isGroup 
    ? conversation.name 
    : otherParticipants[0]?.name;

  // Get online status text
  const getStatusText = () => {
    if (conversation.isGroup) {
      const onlineCount = otherParticipants.filter(p => p.status === 'online').length;
      return `${onlineCount} online • ${otherParticipants.length} members`;
    } else {
      const otherUser = otherParticipants[0];
      return otherUser?.status === 'online' 
        ? 'Active now'
        : otherUser?.lastSeen
          ? `Last seen ${otherUser.lastSeen}`
          : '';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        {conversation.isGroup ? (
          <div className="relative">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src={otherParticipants[0]?.avatar} />
              <AvatarFallback>{displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 absolute -bottom-1 -right-1 border-2 border-white">
              <AvatarImage src={otherParticipants[1]?.avatar} />
              <AvatarFallback>{otherParticipants[1]?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Avatar className="w-10 h-10">
            <AvatarImage src={otherParticipants[0]?.avatar} />
            <AvatarFallback>{displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        
        <div>
          <h2 className="font-semibold text-sm">{displayName}</h2>
          <p className="text-xs text-gray-500">{getStatusText()}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Video className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
