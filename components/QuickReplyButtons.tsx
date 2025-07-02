import React from 'react';

interface QuickReplyButtonsProps {
  onSelect: (text: string) => void;
}

const QuickReplyButtons: React.FC<QuickReplyButtonsProps> = ({ onSelect }) => {
  const replies = [
    'Jag vill få mer energi',
    'Kan ni hjälpa mig med viktnedgång?',
    'Jag vill börja träna men vet inte hur',
    'Vad är ett introsamtal?',
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="px-4 py-2 text-sm bg-[#ffedd5] text-[#c2410c] rounded-full hover:bg-[#fed7aa] transition duration-200"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplyButtons;
