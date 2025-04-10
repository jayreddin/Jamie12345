'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Icons} from '@/components/icons';
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
import ChatHistory from '@/components/chat-history';
import Settings from '@/components/settings';
import {cn} from '@/lib/utils';
import {useToast} from '@/hooks/use-toast';
import {useSettings} from '@/hooks/use-settings';

const Main = () => {
  const [messages, setMessages] = useState<
    {sender: 'user' | 'model'; text: string; timestamp: string}[]
  >([]);
  const [newMessage, setNewMessage] = useState('');
  const {activeModel, setActiveModel} = useSettings();
  const {toast} = useToast();

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const timestamp = new Date().toLocaleTimeString();
      setMessages([
        ...messages,
        {sender: 'user', text: newMessage, timestamp: timestamp},
      ]);
      // Simulate model response
      setTimeout(() => {
        const modelTimestamp = new Date().toLocaleTimeString();
        setMessages([
          ...messages,
          {sender: 'model', text: 'This is a simulated response.', timestamp: modelTimestamp},
        ]);
      }, 1000);
      setNewMessage('');
    }
  };

  const restoreSession = (sessionMessages: {sender: 'user' | 'model'; text: string; timestamp: string}[]) => {
    setMessages(sessionMessages);
    toast({
      title: 'Session Restored',
      description: 'The selected chat session has been restored.',
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-background/90 backdrop-blur-md sticky top-0 z-50 py-4 shadow-sm">
        <div className="container flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Active Model: {activeModel}</span>
        </div>
      </header>

      {/* Message Display */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg px-3 py-2 w-fit max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-secondary text-secondary-foreground mr-auto'}`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs text-muted-foreground self-end">{message.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="sticky bottom-0 bg-background/90 backdrop-blur-md z-50 py-4 border-t shadow-inner">
        <div className="container flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Icons.newChat className="h-6 w-6" />
                  <span className="sr-only">New Chat</span>
                </Button>
              </DialogTrigger>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Icons.chatHistory className="h-6 w-6" />
                  <span className="sr-only">Chat History</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <ChatHistory onSessionSelect={restoreSession} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Icons.appSettings className="h-6 w-6" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Settings />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center w-full space-x-4">
            <Input
              type="text"
              placeholder="Enter message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              className="flex-grow rounded-full"
            />
            <Button onClick={sendMessage} className="rounded-full">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
