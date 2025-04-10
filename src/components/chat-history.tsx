'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ChatHistory = () => {
  // Dummy data for chat history
  const chatSessions = [
    {
      id: 1,
      title: 'Session 1',
      timestamp: '2024-01-01 10:00',
      messages: ['Hello', 'Hi'],
    },
    {
      id: 2,
      title: 'Session 2',
      timestamp: '2024-01-02 12:00',
      messages: ['How are you?', 'I am fine'],
    },
    {
      id: 3,
      title: 'Session 3',
      timestamp: '2024-01-03 14:00',
      messages: ['What is your name?', 'I am a bot'],
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <Accordion type="single" collapsible>
        {chatSessions.map((session) => (
          <AccordionItem key={session.id} value={session.title}>
            <AccordionTrigger>{session.title} - {session.timestamp}</AccordionTrigger>
            <AccordionContent>
              {session.messages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChatHistory;
