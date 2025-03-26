import React from 'react';
import { Category } from '../data/words';

interface CategoryCardProps {
  category: Category;
  selected: boolean;
  onClick: () => void;
}

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'hindi-movies':
      return '🎬';
    case 'english-movies':
      return '🎥';
    case 'bollywood-actors':
      return '🎭';
    case 'hollywood-actors':
      return '🌟';
    case 'pictionary':
      return '✏️';
  }
};

const getCategoryName = (category: Category) => {
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl transition-all active:scale-95 flex items-center gap-4 
        ${selected 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
          : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
        }`}
    >
      <div className="text-3xl">{getCategoryIcon(category)}</div>
      <h3 className="text-lg font-semibold">{getCategoryName(category)}</h3>
    </button>
  );
};