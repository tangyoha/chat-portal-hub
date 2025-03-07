
import { useState } from 'react';
import { ArrowRight, Star, Clock } from 'lucide-react';
import { ChatItem } from '@/types';
import { getIconComponent } from '@/utils/mockData';
import { motion } from 'framer-motion';
import { staggeredAnimation } from '@/utils/animations';

interface ChatCardProps {
  chat: ChatItem;
  index: number;
  onFavoriteToggle: (id: string) => void;
  onVisit: (id: string) => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return '今天';
  } else if (diffDays === 1) {
    return '昨天';
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }
};

const ChatCard = ({ chat, index, onFavoriteToggle, onVisit }: ChatCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = chat.icon ? getIconComponent(chat.icon) : null;
  
  const handleVisit = () => {
    onVisit(chat.id);
    window.open(chat.url, '_blank');
  };
  
  return (
    <motion.div
      className="relative"
      {...staggeredAnimation(index)}
    >
      <div 
        className="h-full glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {chat.lastVisited && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {formatDate(chat.lastVisited)}
            </div>
          )}
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavoriteToggle(chat.id);
            }}
            className="p-1.5 rounded-full hover:bg-secondary/70 transition-colors"
            aria-label={chat.favorite ? '取消收藏' : '添加到收藏'}
          >
            <Star 
              className={`w-4 h-4 transition-colors ${chat.favorite ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`} 
            />
          </button>
        </div>
        
        <div className="flex flex-col h-full">
          <div className="mb-4">
            {IconComponent && (
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-4">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
            )}
            
            <h3 className="text-xl font-medium tracking-tight mb-1">{chat.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{chat.description}</p>
          </div>
          
          <div className="mt-auto">
            <button
              onClick={handleVisit}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl 
                bg-primary text-primary-foreground font-medium 
                transition-all hover:opacity-90 active:scale-[0.98]"
            >
              开始对话
              <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'translate-x-0.5' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatCard;
