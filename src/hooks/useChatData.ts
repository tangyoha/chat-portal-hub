
import { useState, useEffect } from 'react';
import { ChatConfig, ChatItem } from '@/types';
import { defaultConfig } from '@/utils/mockData';

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
          setConfig(defaultConfig);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load chat configuration');
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
  const categories = config.chats 
    ? Array.from(new Set(config.chats.map(chat => chat.category).filter(Boolean))) as string[]
    : [];

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
    recordVisit
  };
};
