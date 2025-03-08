
import { useState, useEffect } from 'react';
import { ChatConfig, ChatItem, UnsavedChatItem } from '@/types';
import { defaultConfig } from '@/utils/mockData';
import { toast } from '@/components/ui/use-toast';

export const useChatData = () => {
  const [config, setConfig] = useState<ChatConfig>(defaultConfig);
  const [filteredChats, setFilteredChats] = useState<ChatItem[]>(defaultConfig.chats);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  // Load data from a local JSON file or API
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real implementation, this would fetch from a file or API
        // For now, we'll use the mock data after a small delay to simulate loading
        setTimeout(() => {
          // Check if we have saved data in localStorage
          const savedConfig = localStorage.getItem('chatConfig');
          if (savedConfig) {
            setConfig(JSON.parse(savedConfig));
          } else {
            setConfig(defaultConfig);
          }
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load chat configuration');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('chatConfig', JSON.stringify(config));
    }
  }, [config, loading]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    if (!config) return;

    let result = [...config.chats];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        chat => 
          chat.name.toLowerCase().includes(query) || 
          chat.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (activeCategory) {
      result = result.filter(chat => chat.category === activeCategory);
    }

    // Filter favorites
    if (showFavorites) {
      result = result.filter(chat => chat.favorite);
    }

    setFilteredChats(result);
  }, [config, searchQuery, activeCategory, showFavorites]);

  // Get unique categories from chats
  const categories = config.categories || 
    Array.from(new Set(config.chats.map(chat => chat.category).filter(Boolean))) as string[];

  // Toggle favorite status for a chat
  const toggleFavorite = (id: string) => {
    setConfig(prevConfig => {
      const updatedChats = prevConfig.chats.map(chat => 
        chat.id === id ? { ...chat, favorite: !chat.favorite } : chat
      );
      return { ...prevConfig, chats: updatedChats };
    });
  };

  // Record visit to a chat
  const recordVisit = (id: string) => {
    setConfig(prevConfig => {
      const updatedChats = prevConfig.chats.map(chat => 
        chat.id === id ? { ...chat, lastVisited: new Date().toISOString() } : chat
      );
      return { ...prevConfig, chats: updatedChats };
    });
  };

  // Add a new chat
  const addChat = (chatData: UnsavedChatItem) => {
    // Handle the "none" value from the category dropdown
    const categoryValue = chatData.category === "none" ? undefined : chatData.category;
    
    const newChat: ChatItem = {
      id: chatData.id || Date.now().toString(),
      name: chatData.name,
      description: chatData.description,
      url: chatData.url,
      icon: chatData.icon,
      category: categoryValue,
      favorite: chatData.favorite || false
    };

    setConfig(prevConfig => ({
      ...prevConfig,
      chats: [...prevConfig.chats, newChat]
    }));

    toast({
      title: "成功",
      description: `聊天 "${chatData.name}" 已添加`
    });

    return newChat;
  };

  // Delete a chat
  const deleteChat = (id: string) => {
    setConfig(prevConfig => {
      const chat = prevConfig.chats.find(c => c.id === id);
      const updatedChats = prevConfig.chats.filter(chat => chat.id !== id);
      
      toast({
        title: "已删除",
        description: `聊天 "${chat?.name}" 已移除`
      });
      
      return { ...prevConfig, chats: updatedChats };
    });
  };

  // Add a new category
  const addCategory = (category: string) => {
    if (!category.trim()) return;
    
    // Check if category already exists
    if (categories.includes(category)) {
      toast({
        title: "分类已存在",
        description: `分类 "${category}" 已经存在`,
        variant: "destructive"
      });
      return;
    }

    setConfig(prevConfig => ({
      ...prevConfig,
      categories: [...(prevConfig.categories || []), category]
    }));

    toast({
      title: "成功",
      description: `分类 "${category}" 已添加`
    });
  };

  // Delete a category
  const deleteCategory = (category: string) => {
    setConfig(prevConfig => {
      // Remove the category from the categories list
      const updatedCategories = (prevConfig.categories || []).filter(c => c !== category);
      
      // Update chats that had this category
      const updatedChats = prevConfig.chats.map(chat => 
        chat.category === category ? { ...chat, category: undefined } : chat
      );
      
      toast({
        title: "已删除",
        description: `分类 "${category}" 及其关联已移除`
      });
      
      return { 
        ...prevConfig, 
        categories: updatedCategories,
        chats: updatedChats
      };
    });
  };

  // Update a category name
  const updateCategory = (oldName: string, newName: string) => {
    if (!newName.trim()) return;
    if (oldName === newName) return;
    
    // Check if category already exists
    if (categories.includes(newName)) {
      toast({
        title: "分类已存在",
        description: `分类 "${newName}" 已经存在`,
        variant: "destructive"
      });
      return;
    }

    setConfig(prevConfig => {
      // Update the category name in the categories list
      const updatedCategories = (prevConfig.categories || []).map(c => 
        c === oldName ? newName : c
      );
      
      // Update chats that had this category
      const updatedChats = prevConfig.chats.map(chat => 
        chat.category === oldName ? { ...chat, category: newName } : chat
      );
      
      return { 
        ...prevConfig, 
        categories: updatedCategories,
        chats: updatedChats
      };
    });

    toast({
      title: "已更新",
      description: `分类已重命名为 "${newName}"`
    });
  };

  return {
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
    recordVisit,
    addChat,
    deleteChat,
    addCategory,
    deleteCategory,
    updateCategory
  };
};
