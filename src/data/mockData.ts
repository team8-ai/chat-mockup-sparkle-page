
import { Conversation, User } from "@/types/chat";

// Mock users
export const users: User[] = [
  {
    id: "u1",
    name: "You",
    avatar: "https://ui-avatars.com/api/?name=You&background=9b87f5&color=fff",
    status: "online"
  },
  {
    id: "u2",
    name: "Alex Johnson",
    avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=FF6B6B&color=fff",
    status: "online",
    lastSeen: "Just now"
  },
  {
    id: "u3",
    name: "Sam Taylor",
    avatar: "https://ui-avatars.com/api/?name=Sam+Taylor&background=4ECDC4&color=fff",
    status: "offline",
    lastSeen: "3h ago"
  },
  {
    id: "u4",
    name: "Morgan Lee",
    avatar: "https://ui-avatars.com/api/?name=Morgan+Lee&background=FFE66D&color=333",
    status: "busy",
    lastSeen: "1h ago"
  },
  {
    id: "u5",
    name: "Jamie Smith",
    avatar: "https://ui-avatars.com/api/?name=Jamie+Smith&background=1A535C&color=fff",
    status: "online",
    lastSeen: "Just now"
  }
];

// Mock conversations
export const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Project Team",
    isGroup: true,
    participants: [users[0], users[1], users[2], users[3], users[4]],
    messages: [
      {
        id: "m1",
        content: "Good morning everyone! How's the project coming along?",
        sender: users[1],
        timestamp: "09:15 AM",
        status: "read"
      },
      {
        id: "m2",
        content: "I've finished the design mockups. Will share them soon.",
        sender: users[3],
        timestamp: "09:18 AM",
        status: "read"
      },
      {
        id: "m3",
        content: "Great work Morgan! I'm still working on the API documentation.",
        sender: users[2],
        timestamp: "09:20 AM",
        status: "read"
      },
      {
        id: "m4",
        content: "I've pushed some code changes to the repo. Could someone review them?",
        sender: users[4],
        timestamp: "09:25 AM",
        status: "read"
      },
      {
        id: "m5",
        content: "I'll take a look at them after lunch, Jamie.",
        sender: users[0],
        timestamp: "09:30 AM",
        status: "delivered"
      },
      {
        id: "m6",
        content: "Thanks! I've also noticed a bug in the login flow. The error messages aren't showing up correctly.",
        sender: users[4],
        timestamp: "09:32 AM",
        status: "read"
      },
      {
        id: "m7",
        content: "Here are the design mockups I promised!",
        sender: users[3],
        timestamp: "09:35 AM",
        status: "read",
        attachments: [
          {
            id: "a1",
            type: "image",
            url: "https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Design+Mockup",
            name: "design_mockup.png",
            size: "2.4 MB"
          }
        ]
      },
      {
        id: "m8",
        content: "These look amazing, Morgan! I especially like the new navigation design.",
        sender: users[1],
        timestamp: "09:40 AM",
        status: "read"
      },
      {
        id: "m9",
        content: "I agree, the mockups look great! But I think we might need to adjust the color scheme to match our brand guidelines.",
        sender: users[0],
        timestamp: "09:45 AM",
        status: "delivered"
      },
      {
        id: "m10",
        content: "Sure, I can make those adjustments. Which colors should we use instead?",
        sender: users[3],
        timestamp: "09:48 AM",
        status: "read"
      },
      {
        id: "m11",
        content: "Let's use our primary color #9b87f5 for the main elements, and we can use #7E69AB for secondary actions.",
        sender: users[0],
        timestamp: "09:50 AM",
        status: "sent"
      },
      {
        id: "m12",
        content: "Should we have a team meeting to discuss the next steps?",
        sender: users[2],
        timestamp: "09:55 AM",
        status: "read"
      },
      {
        id: "m13",
        content: "Good idea. How about tomorrow at 10 AM?",
        sender: users[1],
        timestamp: "10:00 AM",
        status: "read"
      },
      {
        id: "m14",
        content: "Works for me!",
        sender: users[0],
        timestamp: "10:05 AM",
        status: "sent"
      },
      {
        id: "m15",
        content: "Same here.",
        sender: users[4],
        timestamp: "10:07 AM",
        status: "read"
      },
      {
        id: "m16",
        content: "Great, I'll send a calendar invite shortly.",
        sender: users[1],
        timestamp: "10:10 AM",
        status: "read"
      }
    ],
    unreadCount: 0,
    lastMessage: {
      id: "m16",
      content: "Great, I'll send a calendar invite shortly.",
      sender: users[1],
      timestamp: "10:10 AM",
      status: "read"
    }
  },
  {
    id: "c2",
    name: "Alex Johnson",
    isGroup: false,
    participants: [users[0], users[1]],
    messages: [],
    unreadCount: 2,
    lastMessage: {
      id: "m1",
      content: "Can we discuss the client presentation?",
      sender: users[1],
      timestamp: "Yesterday",
      status: "delivered"
    }
  },
  {
    id: "c3",
    name: "Product Team",
    isGroup: true,
    participants: [users[0], users[2], users[3]],
    messages: [],
    unreadCount: 5,
    lastMessage: {
      id: "m1",
      content: "New feature request from the client",
      sender: users[2],
      timestamp: "Yesterday",
      status: "delivered"
    }
  },
  {
    id: "c4",
    name: "Sam Taylor",
    isGroup: false,
    participants: [users[0], users[2]],
    messages: [],
    unreadCount: 0,
    lastMessage: {
      id: "m1",
      content: "Thanks for your help with the report",
      sender: users[0],
      timestamp: "Monday",
      status: "read"
    }
  },
  {
    id: "c5",
    name: "Marketing Team",
    isGroup: true,
    participants: [users[0], users[1], users[4]],
    messages: [],
    unreadCount: 0,
    lastMessage: {
      id: "m1",
      content: "Campaign results are in!",
      sender: users[4],
      timestamp: "Monday",
      status: "read"
    }
  }
];

// Set the active conversation to the first one by default
export const activeConversationId = conversations[0].id;
