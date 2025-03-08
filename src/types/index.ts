
export interface ChatItem {
  id: string;
  name: string;
  description: string;
  url: string;
  icon?: string;
  category?: string;
  favorite?: boolean;
  lastVisited?: string;
}

export interface ChatConfig {
  title: string;
  theme: 'light' | 'dark';
  chats: ChatItem[];
  categories?: string[];
}

export interface UnsavedChatItem extends Omit<ChatItem, 'id'> {
  id?: string;
}
