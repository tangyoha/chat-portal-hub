import { ChatConfig } from '@/types';
import { defaultConfig } from './mockData';

// API endpoint for the chat configuration
const API_ENDPOINT = '/api/config';

// Function to load config from the API
export const loadConfigFromFile = async (): Promise<ChatConfig> => {
  try {
    // Fetch the configuration from the API
    const response = await fetch(API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const config = await response.json();
    return config;
  } catch (error) {
    console.error('Error loading config from API:', error);
    
    // If API is not available, fall back to localStorage
    try {
      const savedConfig = localStorage.getItem('chatConfig');
      if (savedConfig) {
        return JSON.parse(savedConfig);
      } else {
        // If no config exists, use default and save it
        localStorage.setItem('chatConfig', JSON.stringify(defaultConfig));
        return defaultConfig;
      }
    } catch (localError) {
      console.error('Error with localStorage fallback:', localError);
      return defaultConfig;
    }
  }
};

// Function to save config to the API
export const saveConfigToFile = async (config: ChatConfig): Promise<void> => {
  try {
    // Save the configuration to the API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    // Also save to localStorage as a fallback
    localStorage.setItem('chatConfig', JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config to API:', error);
    
    // If API is not available, fall back to localStorage
    try {
      localStorage.setItem('chatConfig', JSON.stringify(config));
    } catch (localError) {
      console.error('Error with localStorage fallback:', localError);
      throw new Error('Failed to save chat configuration');
    }
  }
};
