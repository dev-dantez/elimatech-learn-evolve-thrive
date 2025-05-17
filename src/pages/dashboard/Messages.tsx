
import React, { useState } from 'react';
import { Send, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data - would come from API in real app
const conversations = [
  {
    id: '1',
    with: 'John Smith',
    avatar: '/placeholder.svg',
    lastMessage: 'When is the next live session?',
    timestamp: '2025-05-17T14:30:00',
    unread: true,
  },
  {
    id: '2',
    with: 'Jane Doe',
    avatar: '/placeholder.svg',
    lastMessage: 'Thank you for your help with the project.',
    timestamp: '2025-05-16T09:15:00',
    unread: false,
  },
  {
    id: '3',
    with: 'Michael Brown',
    avatar: '/placeholder.svg',
    lastMessage: 'Could you provide more examples for the assignment?',
    timestamp: '2025-05-15T18:45:00',
    unread: false,
  },
  {
    id: '4',
    with: 'Sarah Wilson',
    avatar: '/placeholder.svg',
    lastMessage: 'The course has been really informative so far!',
    timestamp: '2025-05-14T11:20:00',
    unread: false,
  },
];

// Mock data for messages in a conversation
const messageHistory = [
  {
    id: '1',
    sender: 'John Smith',
    content: 'Hi there! I had a question about the upcoming live session.',
    timestamp: '2025-05-17T14:25:00',
    isMe: false,
  },
  {
    id: '2',
    sender: 'Me',
    content: 'Hi John, sure! How can I help?',
    timestamp: '2025-05-17T14:26:00',
    isMe: true,
  },
  {
    id: '3',
    sender: 'John Smith',
    content: 'When is the next live session for the Web Development course?',
    timestamp: '2025-05-17T14:28:00',
    isMe: false,
  },
  {
    id: '4',
    sender: 'Me',
    content: "Let me check that for you. I believe it's scheduled for this Friday at 3:00 PM.",
    timestamp: '2025-05-17T14:30:00',
    isMe: true,
  },
];

const Messages = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    
    // Clear input after sending
    setNewMessage('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Messages" 
        description="Communicate with instructors and students"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader className="px-4 py-3">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-320px)]">
              {conversations
                .filter(conv => activeTab === 'all' || conv.unread)
                .map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`flex items-start gap-3 p-4 border-b cursor-pointer transition-colors ${
                      selectedConversation === conversation.id ? 'bg-accent' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar} alt={conversation.with} />
                      <AvatarFallback>{conversation.with.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">{conversation.with}</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(conversation.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && (
                      <Badge variant="default" className="ml-auto">New</Badge>
                    )}
                  </div>
                ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="px-6 py-4 border-b">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="/placeholder.svg" alt="John Smith" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">John Smith</CardTitle>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4 h-[calc(100vh-430px)]">
                  <div className="space-y-4">
                    {messageHistory.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isMe && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src="/placeholder.svg" alt={message.sender} />
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.isMe 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-right mt-1 opacity-70">
                            {formatDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type your message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      className="flex-shrink-0"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No conversation selected</h3>
              <p className="text-sm text-muted-foreground">Select a conversation from the list to start chatting.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
