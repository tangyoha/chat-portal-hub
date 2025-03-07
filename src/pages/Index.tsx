
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ChatCard from '@/components/ChatCard';
import EmptyState from '@/components/EmptyState';
import { useChatData } from '@/hooks/useChatData';
import { useTheme } from '@/hooks/useTheme';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const {
    config,
    filteredChats,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    showFavorites,
    setShowFavorites,
    categories,
    toggleFavorite,
    recordVisit
  } = useChatData();

  const { theme, toggleTheme } = useTheme();

  // Set theme from config when loaded
  useEffect(() => {
    if (config && config.theme) {
      // We don't call setTheme directly to avoid overriding user preference
      // This would be used if you want to force the theme from config
      // setTheme(config.theme);
    }
  }, [config]);
  
  // Handle reset filters
  const handleReset = () => {
    setSearchQuery('');
    setActiveCategory(null);
    setShowFavorites(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground animate-pulse">正在加载聊天机器人...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="p-6 rounded-2xl glass-card max-w-md">
          <h2 className="text-2xl font-medium mb-4">加载失败</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Header
        title={config.title}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        theme={theme}
        onThemeToggle={toggleTheme}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categories={categories}
        showFavorites={showFavorites}
        onFavoritesToggle={() => setShowFavorites(!showFavorites)}
      />
      
      <motion.main 
        className="max-w-7xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {filteredChats.length === 0 ? (
          <EmptyState 
            query={searchQuery}
            showFavorites={showFavorites}
            activeCategory={activeCategory}
            onReset={handleReset}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChats.map((chat, index) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                index={index}
                onFavoriteToggle={toggleFavorite}
                onVisit={recordVisit}
              />
            ))}
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default Index;
