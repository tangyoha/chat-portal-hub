from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Literal
import json
import os
from pathlib import Path

app = FastAPI(title="Chat Config API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the data models based on the TypeScript interfaces
class ChatItem(BaseModel):
    id: str
    name: str
    description: str
    url: str
    icon: Optional[str] = None
    category: Optional[str] = None
    favorite: Optional[bool] = None
    lastVisited: Optional[str] = None

class ChatConfig(BaseModel):
    title: str
    theme: Literal["light", "dark"]
    chats: List[ChatItem]
    categories: Optional[List[str]] = None

# Default configuration (same as in mockData.ts)
default_config = ChatConfig(
    title="AI Chat 集合",
    theme="light",
    chats=[
        ChatItem(
            id="1",
            name="通用助手",
            description="回答各类常见问题，提供全方位的知识支持。",
            url="https://example.com/chat/general",
            icon="MessageSquare",
            favorite=True,
            lastVisited="2023-01-01T00:00:00Z"
        ),
        ChatItem(
            id="2",
            name="代码助手",
            description="解答编程问题，帮助调试代码和学习编程概念。",
            url="https://example.com/chat/code",
            icon="Code",
            category="开发工具",
            lastVisited="2023-01-01T00:00:00Z"
        ),
        ChatItem(
            id="3",
            name="创意写作",
            description="提供创意写作建议，帮助撰写文章、故事和内容。",
            url="https://example.com/chat/creative",
            icon="Sparkles",
            category="内容创作",
            favorite=True
        ),
        ChatItem(
            id="4",
            name="数据分析",
            description="帮助分析和理解数据，提供数据可视化建议。",
            url="https://example.com/chat/data",
            icon="LayoutGrid",
            category="数据工具",
            lastVisited="2023-01-01T00:00:00Z"
        ),
        ChatItem(
            id="5",
            name="学习助手",
            description="辅助学习各类知识，解答学术问题和概念。",
            url="https://example.com/chat/learning",
            icon="BookOpen",
            category="教育"
        ),
        ChatItem(
            id="6",
            name="AI 顾问",
            description="探讨人工智能技术和发展，解答AI相关问题。",
            url="https://example.com/chat/ai",
            icon="BrainCircuit",
            category="技术",
            lastVisited="2023-01-01T00:00:00Z"
        )
    ],
    categories=["开发工具", "内容创作", "数据工具", "教育", "技术"]
)

# Define the path for storing the config file
CONFIG_DIR = Path("./data")
CONFIG_FILE = CONFIG_DIR / "chat_config.json"

# Ensure the data directory exists
CONFIG_DIR.mkdir(exist_ok=True)

def load_config_from_file() -> ChatConfig:
    """Load the chat configuration from the JSON file."""
    try:
        if CONFIG_FILE.exists():
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                config_data = json.load(f)
                return ChatConfig(**config_data)
        else:
            # If no config exists, use default and save it
            save_config_to_file(default_config)
            return default_config
    except Exception as e:
        print(f"Error loading config from file: {e}")
        raise HTTPException(status_code=500, detail="Failed to load chat configuration from file")

def save_config_to_file(config: ChatConfig) -> None:
    """Save the chat configuration to the JSON file."""
    try:
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(config.model_dump(), f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Error saving config to file: {e}")
        raise HTTPException(status_code=500, detail="Failed to save chat configuration to file")

@app.get("/api/config", response_model=ChatConfig)
async def get_config():
    """API endpoint to get the chat configuration."""
    return load_config_from_file()

@app.post("/api/config", response_model=ChatConfig)
async def update_config(config: ChatConfig):
    """API endpoint to update the chat configuration."""
    save_config_to_file(config)
    return config

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 