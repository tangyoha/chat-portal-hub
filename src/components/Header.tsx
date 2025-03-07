
import { Sun, Moon, Star, Grid3X3, BookOpen, Monitor, Code, MessageSquare } from 'lucide-react';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  showFavorites: boolean;
  onFavoritesToggle: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'development':
      return <Code className="w-4 h-4 mr-2" />;
    case 'education':
      return <BookOpen className="w-4 h-4 mr-2" />;
    case 'data':
      return <Grid3X3 className="w-4 h-4 mr-2" />;
    case 'general':
      return <MessageSquare className="w-4 h-4 mr-2" />;
    default:
      return <Monitor className="w-4 h-4 mr-2" />;
  }
};

const Header = ({
  title,
  searchQuery,
  onSearchChange,
  theme,
  onThemeToggle,
  activeCategory,
  onCategoryChange,
  categories,
  showFavorites,
  onFavoritesToggle
}: HeaderProps) => {
  return (
    <motion.header 
      className="w-full max-w-7xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-medium tracking-tight">{title}</h1>
        
        <div className="flex items-center gap-4">
          <SearchBar 
            value={searchQuery} 
            onChange={onSearchChange} 
            placeholder="搜索聊天机器人..." 
          />
          
          <button 
            onClick={onThemeToggle}
            className="p-2 rounded-full glass-input hover:bg-secondary/50 transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => onCategoryChange(null)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all
            ${!activeCategory 
              ? 'glass-card shadow-sm' 
              : 'hover:bg-secondary/50'}
          `}
        >
          全部
        </button>
        
        <button
          onClick={onFavoritesToggle}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center
            ${showFavorites 
              ? 'glass-card text-amber-500 shadow-sm' 
              : 'hover:bg-secondary/50'}
          `}
        >
          <Star className={`w-4 h-4 ${showFavorites ? 'fill-amber-500' : ''} mr-1.5`} />
          收藏
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center
              ${activeCategory === category 
                ? 'glass-card shadow-sm' 
                : 'hover:bg-secondary/50'}
            `}
          >
            {getCategoryIcon(category)}
            {category === 'general' ? '通用' : 
              category === 'development' ? '开发' : 
              category === 'creative' ? '创意' :
              category === 'data' ? '数据' :
              category === 'education' ? '教育' :
              category === 'research' ? '研究' :
              category}
          </button>
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
