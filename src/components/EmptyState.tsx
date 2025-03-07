
import { FileSearch } from 'lucide-react';

interface EmptyStateProps {
  query?: string;
  showFavorites?: boolean;
  activeCategory?: string | null;
  onReset: () => void;
}

const getEmptyStateMessage = (query?: string, showFavorites?: boolean, category?: string | null) => {
  if (query) {
    return `没有找到匹配"${query}"的聊天机器人`;
  }
  
  if (showFavorites) {
    return '你还没有收藏任何聊天机器人';
  }
  
  if (category) {
    return `${category === 'general' ? '通用' : 
      category === 'development' ? '开发' : 
      category === 'creative' ? '创意' :
      category === 'data' ? '数据' :
      category === 'education' ? '教育' :
      category === 'research' ? '研究' :
      category}类别下没有聊天机器人`;
  }
  
  return '没有可用的聊天机器人';
};

const EmptyState = ({ query, showFavorites, activeCategory, onReset }: EmptyStateProps) => {
  const message = getEmptyStateMessage(query, showFavorites, activeCategory);
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
        <FileSearch className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">{message}</h3>
      <p className="text-muted-foreground mb-6">尝试使用不同的筛选条件</p>
      
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium 
          transition-all hover:bg-secondary/80"
      >
        显示所有聊天机器人
      </button>
    </div>
  );
};

export default EmptyState;
