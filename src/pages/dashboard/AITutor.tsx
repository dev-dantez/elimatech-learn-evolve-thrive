
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageHeader from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock sample conversations
const sampleQuestions = [
  "Explain how CSS flexbox works",
  "What are the key principles of object-oriented programming?",
  "How does React's virtual DOM improve performance?",
  "Explain the difference between SQL and NoSQL databases"
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AITutor = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI learning assistant. How can I help you with your studies today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent | null = null) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // In a real implementation, this would call the OpenAI API
    // For now, we'll simulate a response after a brief delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Mock function to generate responses - would be replaced with actual API call
  const generateMockResponse = (question: string): string => {
    const responses: Record<string, string> = {
      'flexbox': 'CSS Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex (expand) to fill additional space or shrink to fit into smaller spaces. To use it, set display: flex on the parent container.',
      'programming': 'The key principles of object-oriented programming are Encapsulation, Inheritance, Polymorphism, and Abstraction.',
      'react': 'React\'s Virtual DOM improves performance by creating a lightweight copy of the actual DOM in memory. When state changes, React creates a new Virtual DOM, compares it with the previous one, and only updates the real DOM with the necessary changes.',
      'database': 'SQL databases are relational, table-based databases with predefined schemas. NoSQL databases are non-relational, document-oriented databases with flexible schemas.'
    };

    const lowerQuestion = question.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    return "I'm an AI tutor here to help you learn. Could you provide more context to your question so I can give you a more specific answer?";
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="AI Learning Assistant" 
        description="Your personal AI tutor to help with your studies"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main chat area */}
        <Card className="md:col-span-3 flex flex-col h-[calc(100vh-220px)]">
          <CardHeader className="px-6 py-4 border-b">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">ElimuTech AI Tutor</CardTitle>
                <CardDescription>Powered by advanced AI</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full pt-4 px-4 pb-0">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="mt-0.5">
                        <AvatarImage src="/placeholder.svg" alt="AI" />
                        <AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <p className={`text-xs ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right mt-1`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="mt-0.5">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start items-start gap-2">
                    <Avatar className="mt-0.5">
                      <AvatarImage src="/placeholder.svg" alt="AI" />
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-2 items-center">
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2 w-full">
              <Textarea 
                placeholder="Ask me anything about your course material..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                className="resize-none"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="flex-shrink-0"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>

        {/* Sidebar with quick questions */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Sample Questions</CardTitle>
            <CardDescription>Click on any question to ask</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-4 space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 font-normal text-sm"
                  onClick={() => handleSampleQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs" 
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-3 w-3 mr-1" />
              Scroll to bottom
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Note about API key */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> In a production environment, this would connect to the OpenAI API using a secure 
            backend service. The API key should be stored securely in your environment variables.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITutor;
