import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';

interface InputBarProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSend, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={disabled ? "Väntar på svar..." : "Skriv ditt meddelande här..."}
        disabled={disabled}
        className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f97316] focus:outline-none transition duration-200"
      />
      <button
        type="submit"
        disabled={disabled || !inputValue.trim()}
        className="bg-[#f97316] text-white p-3 rounded-full hover:bg-[#ea580c] disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97316]"
        aria-label="Skicka meddelande"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default InputBar;
