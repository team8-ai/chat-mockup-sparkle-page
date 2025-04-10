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
    name: "צוות הפרויקט",
    isGroup: true,
    participants: [users[0], users[1], users[2], users[3], users[4]],
    messages: [
      {
        id: "m1",
        content: "שלום לכולם! מה שלומכם?",
        sender: users[1],
        timestamp: "09:15 AM",
        status: "read"
      },
      {
        id: "m2",
        content: "סיימתי את המוקאפים של העיצוב. אשתף אותם בקרוב.",
        sender: users[3],
        timestamp: "09:18 AM",
        status: "read"
      },
      {
        id: "m3",
        content: "עבודה מצוינת מורגן! אני עדיין עובד/ת על תיעוד ה-API.",
        sender: users[2],
        timestamp: "09:20 AM",
        status: "read"
      },
      {
        id: "m4",
        content: "דחפתי כמה שינויי קוד למאגר. מישהו יכול לבדוק אותם?",
        sender: users[4],
        timestamp: "09:25 AM",
        status: "read"
      },
      {
        id: "m5",
        content: "אני אעיף מבט אחרי ארוחת הצהריים, ג'יימי.",
        sender: users[0],
        timestamp: "09:30 AM",
        status: "delivered"
      },
      {
        id: "m6",
        content: "תודה! שמתי לב גם לבאג בתהליך ההתחברות. הודעות השגיאה לא מופיעות כראוי.",
        sender: users[4],
        timestamp: "09:32 AM",
        status: "read"
      },
      {
        id: "m7",
        content: "הנה המוקאפים שהבטחתי!",
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
        content: "זה נראה מדהים, מורגן! אני אוהב/ת במיוחד את עיצוב הניווט החדש.",
        sender: users[1],
        timestamp: "09:40 AM",
        status: "read"
      },
      {
        id: "m9",
        content: "מסכים/ה, המוקאפים נראים נהדר! אבל אני חושב/ת שאולי נצטרך להתאים את סכמת הצבעים להנחיות המותג שלנו.",
        sender: users[0],
        timestamp: "09:45 AM",
        status: "delivered"
      },
      {
        id: "m10",
        content: "בטח, אני יכול/ה לבצע את ההתאמות. באילו צבעים עלינו להשתמש במקום זאת?",
        sender: users[3],
        timestamp: "09:48 AM",
        status: "read"
      },
      {
        id: "m11",
        content: "בוא/י נשתמש בצבע הראשי שלנו #9b87f5 לאלמנטים המרכזיים, ונוכל להשתמש ב-#7E69AB לפעולות משניות.",
        sender: users[0],
        timestamp: "09:50 AM",
        status: "sent"
      },
      {
        id: "m12",
        content: "האם כדאי שנקבע פגישת צוות לדון בצעדים הבאים?",
        sender: users[2],
        timestamp: "09:55 AM",
        status: "read"
      },
      {
        id: "m13",
        content: "רעיון טוב. מה דעתכם על מחר ב-10:00 בבוקר?",
        sender: users[1],
        timestamp: "10:00 AM",
        status: "read"
      },
      {
        id: "m14",
        content: "מתאים לי!",
        sender: users[0],
        timestamp: "10:05 AM",
        status: "sent"
      },
      {
        id: "m15",
        content: "גם לי.",
        sender: users[4],
        timestamp: "10:07 AM",
        status: "read"
      },
      {
        id: "m16",
        content: "מעולה, אשלח הזמנה ביומן בקרוב.",
        sender: users[1],
        timestamp: "10:10 AM",
        status: "read"
      }
    ],
    unreadCount: 0,
    lastMessage: {
      id: "m16",
      content: "מעולה, אשלח הזמנה ביומן בקרוב.",
      sender: users[1],
      timestamp: "10:10 AM",
      status: "read"
    }
  }
];

// Set the active conversation to the first one by default
export const activeConversationId = conversations[0].id;
