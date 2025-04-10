'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ChatSession {
  id: number;
  title: string;
  timestamp: string;
  messages: {sender: 'user' | 'model'; text: string; timestamp: string}[];
}

interface ChatHistoryProps {
  onSessionSelect: (messages: {sender: 'user' | 'model'; text: string; timestamp: string}[]) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ onSessionSelect }) => {
  // Dummy data for chat history
  const chatSessions: ChatSession[] = [
    {
      id: 1,
      title: 'Session 1',
      timestamp: '2024-01-01 10:00',
      messages: [{sender: 'user', text: 'Hello', timestamp: '10:00'}],
    },
    {
      id: 2,
      title: 'Session 2',
      timestamp: '2024-01-02 12:00',
      messages: [{sender: 'model', text: 'Hi', timestamp: '12:00'}],
    },
    {
      id: 3,
      title: 'Session 3',
      timestamp: '2024-01-03 14:00',
      messages: [{sender: 'user', text: 'How are you?', timestamp: '14:00'}],
    },
  ];

  const handleSessionClick = (session: ChatSession) => {
    onSessionSelect(session.messages);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <Accordion type="single" collapsible>
        {chatSessions.map((session) => (
          <AccordionItem key={session.id} value={session.title}>
            <AccordionTrigger onClick={() => handleSessionClick(session)}>{session.title} - {session.timestamp}</AccordionTrigger>
            <AccordionContent>
              {session.messages.map((message, index) => (
                <p key={index}>{message.text}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChatHistory;
