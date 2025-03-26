import React from 'react';
import { Difficulty } from '../data/words';

interface DifficultySelectorProps {
  selected: Difficulty | null;
  onSelect: (difficulty: Difficulty) => void;
}

const difficulties: { level: Difficulty; color: string; emoji: string }[] = [
  { level: 'easy', color: 'from-green-500 to-emerald-500', emoji: '😊' },
  { level: 'medium', color: 'from-yellow-500 to-orange-500', emoji: '😅' },
  { level: 'hard', color: 'from-red-500 to-rose-500', emoji: '😰' },
  { level: 'insane', color: 'from-purple-500 to-indigo-500', emoji: '🤯' },
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {difficulties.map(({ level, color, emoji }) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`p-3 rounded-lg font-semibold transition-all active:scale-95 flex flex-col items-center gap-1
            ${selected === level
              ? `bg-gradient-to-r ${color} text-white shadow-lg`
              : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
            }`}
        >
          <span className="text-xl">{emoji}</span>
          <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
        </button>
      ))}
    </div>
  );
};