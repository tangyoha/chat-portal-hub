
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatData } from '@/hooks/useChatData';
import { ArrowLeft, Plus, Trash2, Edit, Save, X, MessageSquare, Code, Sparkles, LayoutGrid, BookOpen, Bot, BrainCircuit } from 'lucide-react';
import ChatCard from '@/components/ChatCard';
import { UnsavedChatItem } from '@/types';
import { motion } from 'framer-motion';
import { scaleIn } from '@/utils/animations';
import { toast } from '@/components/ui/use-toast';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const iconOptions = [
  { value: "MessageSquare", label: "消息", icon: MessageSquare },
  { value: "Code", label: "代码", icon: Code },
  { value: "Sparkles", label: "创意", icon: Sparkles },
  { value: "LayoutGrid", label: "数据", icon: LayoutGrid },
  { value: "BookOpen", label: "学习", icon: BookOpen },
  { value: "Bot", label: "机器人", icon: Bot },
  { value: "BrainCircuit", label: "AI", icon: BrainCircuit },
];

const Admin = () => {
  const navigate = useNavigate();
  const { 
    config, 
    filteredChats,
    categories, 
    addCategory, 
    deleteCategory, 
    updateCategory,
    addChat,
    deleteChat,
  } = useChatData();

  const [newChatOpen, setNewChatOpen] = useState(false);
  const [newChatData, setNewChatData] = useState<UnsavedChatItem>({
    name: '',
    description: '',
    url: '',
    icon: 'MessageSquare',
    category: undefined
  });

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleSubmitChat = () => {
    if (!newChatData.name || !newChatData.url) {
      toast({
        title: "错误",
        description: "聊天名称和URL不能为空",
        variant: "destructive"
      });
      return;
    }

    addChat(newChatData);
    setNewChatData({
      name: '',
      description: '',
      url: '',
      icon: 'MessageSquare',
      category: undefined
    });
    setNewChatOpen(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory);
      setNewCategory('');
    }
  };

  const handleUpdateCategory = (category: string) => {
    updateCategory(category, categoryName);
    setEditingCategory(null);
    setCategoryName('');
  };

  const startEditCategory = (category: string) => {
    setEditingCategory(category);
    setCategoryName(category);
  };

  return (
    <div className="min-h-screen pb-16">
      <motion.header 
        className="w-full max-w-7xl mx-auto px-4 py-8 flex items-center gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-secondary/60 transition-colors"
          aria-label="返回主页"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-medium tracking-tight">管理控制台</h1>
      </motion.header>

      <motion.main 
        className="max-w-7xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Tabs defaultValue="chats">
          <TabsList className="mb-8">
            <TabsTrigger value="chats">聊天管理</TabsTrigger>
            <TabsTrigger value="categories">分类管理</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">所有聊天 ({config.chats.length})</h2>
              
              <Dialog open={newChatOpen} onOpenChange={setNewChatOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    添加新聊天
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>添加新聊天</DialogTitle>
                    <DialogDescription>
                      填写以下信息创建新的聊天入口。
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">名称 *</Label>
                      <Input
                        id="name"
                        value={newChatData.name}
                        onChange={(e) => setNewChatData({ ...newChatData, name: e.target.value })}
                        placeholder="例如：通用助手"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">描述</Label>
                      <Textarea
                        id="description"
                        value={newChatData.description}
                        onChange={(e) => setNewChatData({ ...newChatData, description: e.target.value })}
                        placeholder="简短介绍这个聊天的功能..."
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="url">URL *</Label>
                      <Input
                        id="url"
                        value={newChatData.url}
                        onChange={(e) => setNewChatData({ ...newChatData, url: e.target.value })}
                        placeholder="http://127.0.0.1/chat/..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="icon">图标</Label>
                        <Select
                          value={newChatData.icon}
                          onValueChange={(value) => setNewChatData({ ...newChatData, icon: value })}
                        >
                          <SelectTrigger id="icon">
                            <SelectValue placeholder="选择图标" />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map((icon) => (
                              <SelectItem key={icon.value} value={icon.value}>
                                <div className="flex items-center">
                                  <icon.icon className="w-4 h-4 mr-2" />
                                  {icon.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="category">分类</Label>
                        <Select
                          value={newChatData.category}
                          onValueChange={(value) => setNewChatData({ ...newChatData, category: value })}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="选择分类" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">无分类</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewChatOpen(false)}>
                      取消
                    </Button>
                    <Button onClick={handleSubmitChat}>
                      创建聊天
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.chats.map((chat, index) => (
                <ChatCard
                  key={chat.id}
                  chat={chat}
                  index={index}
                  onFavoriteToggle={() => {}}
                  onVisit={() => {}}
                  onDelete={deleteChat}
                  isAdmin={true}
                />
              ))}

              {config.chats.length === 0 && (
                <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">没有聊天</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    点击"添加新聊天"按钮创建您的第一个聊天入口
                  </p>
                  <Button onClick={() => setNewChatOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    添加聊天
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">分类管理</h2>
              
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="新分类名称"
                  className="w-48"
                />
                <Button onClick={handleAddCategory} variant="outline">添加</Button>
              </div>
            </div>

            <div className="space-y-4">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <motion.div
                    key={category}
                    className="flex items-center justify-between p-4 glass-card rounded-xl"
                    {...scaleIn}
                  >
                    {editingCategory === category ? (
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          autoFocus
                        />
                        <Button variant="ghost" size="icon" onClick={() => handleUpdateCategory(category)}>
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setEditingCategory(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-lg">{category}</span>
                    )}
                    
                    {editingCategory !== category && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEditCategory(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>确定要删除分类吗？</AlertDialogTitle>
                              <AlertDialogDescription>
                                删除后，使用此分类的聊天项将变为无分类状态。此操作不可撤销。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>取消</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => deleteCategory(category)}
                              >
                                删除
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full glass-card mx-auto flex items-center justify-center mb-4">
                    <LayoutGrid className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">没有分类</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    添加分类可以更好地组织您的聊天入口
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.main>
    </div>
  );
};

export default Admin;
