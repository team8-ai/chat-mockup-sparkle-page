
import { useState } from "react";
import { conversations, users, activeConversationId as defaultActiveConversationId } from "@/data/mockData";
import ChatSidebar from "./ChatSidebar";
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
  
  // Handle conversation selection
  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    
    // Mark conversation as read when selected
    setLocalConversations(
      localConversations.map(conversation => 
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation
      )
    );
  };
  
  if (!activeConversation) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex h-full overflow-hidden bg-gray-50 rounded-lg shadow-lg">
      <ChatSidebar 
        conversations={localConversations} 
        activeConversationId={activeConversationId}
        currentUser={currentUser}
        onSelectConversation={handleSelectConversation}
      />
      
      <div className="flex flex-col flex-1 h-full overflow-hidden">
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
    </div>
  );
};

export default MessagingApp;
