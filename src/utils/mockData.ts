
import { 
  MessageSquare, Code, Sparkles, LayoutGrid, 
  BookOpen, Bot, BrainCircuit 
} from 'lucide-react';
import { ChatConfig } from '@/types';

// Helper function to get icon component by name
export const getIconComponent = (iconName: string) => {
  // Don't try to return a component for base64 images
  if (iconName.startsWith('data:')) {
    return null;
  }
  
  const iconMap: Record<string, any> = {
    'MessageSquare': MessageSquare,
    'Code': Code,
    'Sparkles': Sparkles,
    'LayoutGrid': LayoutGrid,
    'BookOpen': BookOpen,
    'Bot': Bot,
    'BrainCircuit': BrainCircuit,
  };
  
  return iconMap[iconName] || MessageSquare;
};

// Default configuration for new installations
export const defaultConfig: ChatConfig = {
  title: "AI Chat 集合",
  theme: "light",
  chats: [
    {
      id: "1",
      name: "通用助手",
      description: "回答各类常见问题，提供全方位的知识支持。",
      url: "https://example.com/chat/general",
      icon: "MessageSquare",
      favorite: true,
      lastVisited: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
    },
    {
      id: "2",
      name: "代码助手",
      description: "解答编程问题，帮助调试代码和学习编程概念。",
      url: "https://example.com/chat/code",
      icon: "Code",
      category: "开发工具",
      lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
    },
    {
      id: "3",
      name: "创意写作",
      description: "提供创意写作建议，帮助撰写文章、故事和内容。",
      url: "https://example.com/chat/creative",
      icon: "Sparkles",
      category: "内容创作",
      favorite: true
    },
    {
      id: "4",
      name: "数据分析",
      description: "帮助分析和理解数据，提供数据可视化建议。",
      url: "https://example.com/chat/data",
      icon: "LayoutGrid",
      category: "数据工具",
      lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
    },
    {
      id: "5",
      name: "学习助手",
      description: "辅助学习各类知识，解答学术问题和概念。",
      url: "https://example.com/chat/learning",
      icon: "BookOpen",
      category: "教育"
    },
    {
      id: "6",
      name: "AI 顾问",
      description: "探讨人工智能技术和发展，解答AI相关问题。",
      url: "https://example.com/chat/ai",
      icon: "BrainCircuit",
      category: "技术",
      lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
    }
  ],
  categories: ["开发工具", "内容创作", "数据工具", "教育", "技术"]
};
