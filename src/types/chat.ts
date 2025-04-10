
export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: 'online' | 'offline' | 'busy';
  lastSeen?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'audio';
  url: string;
  name?: string;
  size?: string;
}

export interface Conversation {
  id: string;
  name?: string;
  isGroup: boolean;
  participants: User[];
  messages: Message[];
  unreadCount?: number;
  lastMessage?: Message;
}
