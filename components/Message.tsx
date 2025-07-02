import React from 'react';
import { Message as MessageType, Sender } from '../types';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isAI = message.sender === Sender.AI;

  const messageContainerClasses = isAI
    ? 'flex items-start gap-3 justify-start'
    : 'flex items-start gap-3 justify-end';

  const messageBubbleClasses = isAI
    ? 'bg-[#ffedd5] text-[#9a3412] rounded-b-xl rounded-tr-xl'
    : 'bg-[#51a1a1] text-white rounded-b-xl rounded-tl-xl';

  const linkClasses = isAI 
    ? 'text-[#c2410c] underline font-semibold hover:text-[#9a3412]' 
    : 'text-white underline font-semibold hover:text-gray-200';

  const parseTextWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    
    // Using split with a regex that has capturing groups includes the captured parts in the result array.
    // "text [link](url) text" becomes ["text ", "link", "url", " text"]
    const parts = text.split(linkRegex);

    return parts.map((part, index) => {
      // part at index 1 is linkText, part at index 2 is the URL
      if (index % 3 === 1) {
        const url = parts[index + 1];
        return (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer" className={linkClasses}>
            {part}
          </a>
        );
      }
      // The URL part, which we've already used, so we skip it.
      if (index % 3 === 2) {
        return null;
      }
      // Regular text part
      return part;
    });
  };

  return (
    <div className={messageContainerClasses}>
      {isAI && <BotIcon />}
      <div className={`max-w-md md:max-w-lg lg:max-w-xl px-4 py-3 shadow-sm ${messageBubbleClasses}`}>
        <p className="whitespace-pre-wrap text-sm">{parseTextWithLinks(message.text)}</p>
      </div>
      {!isAI && <UserIcon />}
    </div>
  );
};

export default Message;
