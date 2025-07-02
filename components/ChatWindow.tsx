import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message as MessageType, Sender } from '../types';
import Message from './Message';
import InputBar from './InputBar';
import QuickReplyButtons from './QuickReplyButtons';
import { getAIResponse } from '../services/geminiService';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initialMessage: MessageType = {
      id: 'welcome-message',
      sender: Sender.AI,
      text: 'Hej och varmt välkommen till Flexibel Hälsostudio! Jag är din digitala hälsoguide. Hur kan jag hjälpa dig att må bättre idag? Berätta lite om vad du funderar på.',
    };
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      sender: Sender.User,
      text,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Use the statically imported AI service function.
      const aiResponseText = await getAIResponse(text);
      
      const aiMessage: MessageType = {
          id: (Date.now() + 1).toString(),
          sender: Sender.AI,
          text: aiResponseText,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to call AI service", error);
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        sender: Sender.AI,
        text: "Ursäkta, jag har problem att ansluta till min kunskapsbas just nu. Prova gärna igen om en liten stund."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden min-h-0">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="animate-pulse flex space-x-2 items-center">
                <div className="p-3 bg-gray-200 rounded-full"></div>
                <div className="p-3 bg-gray-300 rounded-full"></div>
                <div className="p-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0 w-full">
        {messages.length <= 2 && !isLoading && <QuickReplyButtons onSelect={handleSendMessage} />}
        <InputBar onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;