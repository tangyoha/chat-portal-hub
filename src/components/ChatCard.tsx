
import { useState } from 'react';
import { ArrowRight, Star, Clock, Trash2 } from 'lucide-react';
import { ChatItem } from '@/types';
import { getIconComponent } from '@/utils/mockData';
import { motion } from 'framer-motion';
import { staggeredAnimation } from '@/utils/animations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ChatCardProps {
  chat: ChatItem;
  index: number;
  onFavoriteToggle: (id: string) => void;
  onVisit: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
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

// Helper to determine if a string is a base64 image
const isBase64Image = (str: string) => {
  return str.startsWith('data:image/');
};

const ChatCard = ({ chat, index, onFavoriteToggle, onVisit, onDelete, isAdmin = false }: ChatCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Handle either built-in icon or custom uploaded icon
  const IconComponent = chat.icon && !isBase64Image(chat.icon) ? getIconComponent(chat.icon) : null;
  const hasCustomIcon = chat.icon && isBase64Image(chat.icon);
  
  const handleVisit = () => {
    onVisit(chat.id);
    window.open(chat.url, '_blank');
  };
  
  return (
    <>
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

            {isAdmin && onDelete && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowDeleteDialog(true);
                }}
                className="p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                aria-label="删除聊天"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            )}
          </div>
          
          <div className="flex flex-col h-full">
            <div className="mb-4">
              {hasCustomIcon ? (
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-4 overflow-hidden">
                  <img 
                    src={chat.icon} 
                    alt={chat.name} 
                    className="w-6 h-6 object-contain"
                  />
                </div>
              ) : IconComponent && (
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
              )}
              
              <h3 className="text-xl font-medium tracking-tight mb-1">{chat.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{chat.description}</p>
              {chat.category && (
                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-secondary/50">
                  {chat.category}
                </span>
              )}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确定要删除这个聊天吗？</AlertDialogTitle>
            <AlertDialogDescription>
              删除 "{chat.name}" 后将无法恢复。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (onDelete) {
                  onDelete(chat.id);
                }
              }}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChatCard;
