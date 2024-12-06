'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Send, Sparkles, Download, Copy, Mic, StopCircle, Eraser, Share2, MessageSquare, Code, Mail } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gpt-4');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [tokenUsage, setTokenUsage] = useState({ used: 2481, limit: 10000 });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showPrompts, setShowPrompts] = useState(true);

  const models = [
    { value: 'gpt-4', label: 'GPT-4', description: 'Most capable model, best for complex tasks' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Faster responses, great for general use' },
    { value: 'claude-2', label: 'Claude 2', description: 'Excellent for analysis and long-form content' },
  ];

  const quickPrompts = [
    { text: 'Write a creative story', icon: MessageSquare, color: 'bg-blue-500/10 text-blue-500' },
    { text: 'Explain a complex topic', icon: Sparkles, color: 'bg-purple-500/10 text-purple-500' },
    { text: 'Help me brainstorm ideas', icon: Bot, color: 'bg-green-500/10 text-green-500' },
    { text: 'Review and improve my code', icon: Code, color: 'bg-amber-500/10 text-amber-500' },
    { text: 'Draft an email or message', icon: Mail, color: 'bg-pink-500/10 text-pink-500' },
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      tokens: input.split(' ').length * 2, // Rough estimation
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response - replace with actual API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a simulated response. In a real implementation, this would be replaced with an actual API call to your chosen AI model.',
        timestamp: new Date(),
        tokens: 24, // Example token count
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setTokenUsage(prev => ({
        ...prev,
        used: prev.used + userMessage.tokens! + assistantMessage.tokens!
      }));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement actual voice recording logic
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      setShowPrompts(false);
    } else {
      setShowPrompts(true);
    }
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Chat</h1>
            <p className="text-muted-foreground mt-1">
              Have a conversation with advanced AI models
            </p>
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>Token Usage</span>
                      <span className="font-medium">{tokenUsage.used.toLocaleString()} / {tokenUsage.limit.toLocaleString()}</span>
                    </div>
                    <Progress value={(tokenUsage.used / tokenUsage.limit) * 100} className="w-[200px]" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Monthly token usage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Model Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Model</CardTitle>
                <CardDescription>Choose your preferred AI model</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {models.map(model => (
                  <div
                    key={model.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      model.value === 'gpt-4' ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/50'
                    }`}
                    onClick={() => setModel(model.value)}
                  >
                    <div className="flex items-center gap-2">
                      <Bot className={`h-5 w-5 ${model.value === 'gpt-4' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div>
                        <p className="font-medium">{model.label}</p>
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
                <CardDescription>Manage your conversation</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Chat
                </Button>
                <Button variant="outline" className="justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Chat
                </Button>
                <Button variant="outline" className="justify-start text-destructive hover:text-destructive">
                  <Eraser className="h-4 w-4 mr-2" />
                  Clear Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <Card className="flex flex-col h-[calc(100vh-12rem)]">
            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
              <div className="space-y-6 py-6">
                {messages.length === 0 && showPrompts && (
                  <div className="flex flex-col items-center justify-center min-h-[400px] relative">
                    <div className="text-center mb-8">
                      <h3 className="text-lg font-semibold mb-2">Start a Conversation</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose a prompt or type your own message
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
                      {quickPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInput(prompt.text);
                            setShowPrompts(false);
                          }}
                          className={`${prompt.color} p-4 rounded-xl text-left transition-all hover:scale-105 hover:shadow-lg group relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-white/20 to-transparent transition-opacity" />
                          <div className="flex items-start gap-3">
                            <prompt.icon className="h-5 w-5 mt-0.5" />
                            <div>
                              <p className="font-medium mb-1">Try This</p>
                              <p className="text-sm opacity-90">{prompt.text}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${
                      message.role === 'assistant' ? 'items-start' : 'items-start justify-end'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AI</AvatarFallback>
                        <AvatarImage src="/ai-avatar.png" />
                      </Avatar>
                    )}
                    <div className={`flex flex-col gap-1.5 max-w-[80%] ${
                      message.role === 'user' ? 'items-end' : 'items-start'
                    }`}>
                      <div className={`rounded-2xl px-4 py-2.5 ${
                        message.role === 'assistant' 
                          ? 'bg-muted' 
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-2 px-1">
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.tokens && (
                          <span className="text-xs text-muted-foreground">
                            {message.tokens} tokens
                          </span>
                        )}
                        {message.role === 'assistant' && (
                          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-primary/5">
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>ME</AvatarFallback>
                        <AvatarImage src="/user-avatar.png" />
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AI</AvatarFallback>
                      <AvatarImage src="/ai-avatar.png" />
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Textarea
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="min-h-[60px] pr-24 resize-none"
                  />
                  <div className="absolute right-3 bottom-3 flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={isRecording ? 'text-destructive hover:text-destructive' : ''}
                      onClick={toggleRecording}
                    >
                      {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="icon"
                      onClick={handleSend}
                      disabled={!input.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  Press Enter to send, Shift + Enter for new line
                </p>
                <p className="text-xs text-muted-foreground">
                  Model: {models.find(m => m.value === model)?.label}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 