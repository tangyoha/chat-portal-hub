
import { ChatConfig } from '@/types';
import { defaultConfig } from './mockData';

// Function to load config from a JSON file
export const loadConfigFromFile = async (): Promise<ChatConfig> => {
  try {
    // Ask the user to select a file
    const fileHandle = await showFileOpenPicker();
    if (!fileHandle) {
      console.log('No file selected, using default config');
      return defaultConfig;
    }

    const fileData = await fileHandle.text();
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error loading config from file:', error);
    
    // If there's an error (like user cancelled or file not found),
    // return the default config
    toast({
      title: "加载配置失败",
      description: "无法加载配置文件，使用默认配置",
      variant: "destructive"
    });
    
    return defaultConfig;
  }
};

// Function to save config to a JSON file
export const saveConfigToFile = async (config: ChatConfig): Promise<void> => {
  try {
    // Create a Blob with the JSON data
    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a file name with timestamp
    const fileName = `chat-config-${new Date().toISOString().slice(0, 10)}.json`;
    
    // Create a download link and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(link.href);
    
    toast({
      title: "配置已保存",
      description: `配置已保存到文件: ${fileName}`,
    });
  } catch (error) {
    console.error('Error saving config to file:', error);
    toast({
      title: "保存配置失败",
      description: "无法保存配置到文件",
      variant: "destructive"
    });
    throw new Error('Failed to save chat configuration to file');
  }
};

// Helper function to show file picker dialog
const showFileOpenPicker = async (): Promise<File | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0] || null;
      resolve(file);
    };
    
    // Handle cancellation
    input.oncancel = () => {
      resolve(null);
    };
    
    // Simulate a click to open the file picker
    input.click();
  });
};

// Import toast function
import { toast } from '@/components/ui/use-toast';
