
import { ChatConfig } from '@/types';
import { MessageSquare, Code, Sparkles, LayoutGrid, BookOpen, Bot, BrainCircuit } from 'lucide-react';

export const defaultConfig: ChatConfig = {
  title: "我的 Dify Chat 集合",
  theme: "light",
  chats: [
    {
      id: "1",
      name: "通用助手",
      description: "回答各类常见问题，提供全面的信息和建议",
      url: "http://127.0.0.1/chat/beJhGvD2iF4ABI6C",
      icon: "MessageSquare",
      category: "general",
      favorite: true,
      lastVisited: "2023-11-01T10:30:00Z"
    },
    {
      id: "2",
      name: "代码助手",
      description: "专注编程问题解答，支持多种语言和框架",
      url: "http://127.0.0.1/chat/dj38Hv2Sif94BsC",
      icon: "Code",
      category: "development",
      favorite: true
    },
    {
      id: "3",
      name: "创意写作",
      description: "帮助进行创意写作，灵感生成和内容创作",
      url: "http://127.0.0.1/chat/wfJ56DseRt9iPmK",
      icon: "Sparkles",
      category: "creative"
    },
    {
      id: "4",
      name: "数据分析",
      description: "协助处理数据分析任务，提供数据解读",
      url: "http://127.0.0.1/chat/gK29Jdo58Fhqw3L",
      icon: "LayoutGrid",
      category: "data",
      lastVisited: "2023-11-05T14:25:00Z"
    },
    {
      id: "5",
      name: "学习导师",
      description: "辅助学习各类学科知识，解答学术问题",
      url: "http://127.0.0.1/chat/pL78Ksd03JfTw4B",
      icon: "BookOpen",
      category: "education"
    },
    {
      id: "6",
      name: "对话机器人",
      description: "模拟自然对话，提供轻松交流体验",
      url: "http://127.0.0.1/chat/mQ95Rwd72NgHp6S",
      icon: "Bot",
      category: "general",
      lastVisited: "2023-11-08T09:15:00Z"
    },
    {
      id: "7",
      name: "AI 研究助手",
      description: "探索人工智能研究前沿，分析最新进展",
      url: "http://127.0.0.1/chat/xZ21Asd90KjLp3R",
      icon: "BrainCircuit",
      category: "research",
      favorite: true
    }
  ]
};

export const getIconComponent = (iconName: string) => {
  const icons = {
    MessageSquare,
    Code,
    Sparkles,
    LayoutGrid,
    BookOpen,
    Bot,
    BrainCircuit
  };
  
  return icons[iconName as keyof typeof icons] || MessageSquare;
};
