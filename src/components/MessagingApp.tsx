
import { useState } from "react";
import { conversations, users, activeConversationId as defaultActiveConversationId } from "@/data/mockData";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Message } from "@/types/chat";

const MessagingApp = () => {
  const [activeConversationId, setActiveConversationId] = useState(defaultActiveConversationId);
  const [localConversations, setLocalConversations] = useState(conversations);
  
  // Current user is always the first user in our mock data
  const currentUser = users[0];
  
  const activeConversation = localConversations.find(c => c.id === activeConversationId);
  
  // Handle sending a new message
  const handleSendMessage = (content: string) => {
    if (!activeConversation) return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      content,
      sender: currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    const updatedConversations = localConversations.map(conversation => {
      if (conversation.id === activeConversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastMessage: newMessage
        };
      }
      return conversation;
    });
    
    setLocalConversations(updatedConversations);
  };
  
  if (!activeConversation) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 rounded-lg shadow-lg">
      <ChatHeader 
        conversation={activeConversation}
        currentUser={currentUser}
      />
      
      <MessageList 
        conversation={activeConversation}
        currentUser={currentUser}
      />
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default MessagingApp;
