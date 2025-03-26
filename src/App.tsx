import React, { useState } from 'react';
import { Category, Difficulty } from './data/words';
import { CategoryCard } from './components/CategoryCard';
import { DifficultySelector } from './components/DifficultySelector';
import { GameScreen } from './components/GameScreen';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const categories: Category[] = [
    'hindi-movies',
    'english-movies',
    'bollywood-actors',
    'hollywood-actors',
    'pictionary'
  ];

  const handleStart = () => {
    if (!selectedCategory || !selectedDifficulty) return;
  };

  const resetSelections = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  const handleBackFromDifficulty = () => {
    setSelectedCategory(null);
  };

  if (selectedCategory && selectedDifficulty) {
    return (
      <GameScreen
        category={selectedCategory}
        difficulty={selectedDifficulty}
        onBack={() => setSelectedDifficulty(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white">
      <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Dumb Charades & Pictionary 🎭
        </h1>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          {!selectedCategory ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-purple-400">Pick Your Challenge</h2>
              <div className="grid grid-cols-1 gap-3">
                {categories.map(category => (
                  <CategoryCard
                    key={category}
                    category={category}
                    selected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <button
                  onClick={handleBackFromDifficulty}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ← Back
                </button>
                <h2 className="text-xl font-semibold text-purple-400 ml-4">How Brave Are You?</h2>
              </div>
              <DifficultySelector
                selected={selectedDifficulty}
                onSelect={setSelectedDifficulty}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;