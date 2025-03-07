
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = '搜索...' }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when user presses "/" key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className={`
        relative flex items-center w-full max-w-md transition-all duration-200
        ${isFocused ? 'ring-2 ring-primary/20' : ''}
      `}
    >
      <div className="glass-input rounded-full flex items-center w-full px-4 py-2">
        <Search 
          className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" 
          aria-hidden="true" 
        />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none flex-1 text-sm"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {value && (
          <button
            onClick={() => onChange('')}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
        )}
        
        <div className="hidden md:flex ml-2 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">
          /
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
