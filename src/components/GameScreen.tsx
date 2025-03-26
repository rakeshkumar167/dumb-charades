import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Category, Difficulty, gameData } from '../data/words';
import { CircularTimer } from './CircularTimer';
import { TIMER_END_SOUND } from '../sounds';

interface GameScreenProps {
  category: Category;
  difficulty: Difficulty;
  onBack: () => void;
}

const TOTAL_TIME = 180; // 3 minutes in seconds
const WORD_TIMER = 5; // 5 seconds for next word

export const GameScreen: React.FC<GameScreenProps> = ({ category, difficulty, onBack }) => {
  const [availableIndices, setAvailableIndices] = useState<number[]>(() => {
    const indices = Array.from({ length: gameData[category][difficulty].length }, (_, i) => i);
    return shuffle([...indices]);
  });

  const words = gameData[category][difficulty];
  const [currentWordIndex, setCurrentWordIndex] = useState(availableIndices[0]);
  const [wordTimer, setWordTimer] = useState(WORD_TIMER);
  const [canProceed, setCanProceed] = useState(false);
  const [gameTimer, setGameTimer] = useState(TOTAL_TIME);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const timerEndAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    timerEndAudioRef.current = new Audio(TIMER_END_SOUND);
  }, []);

  const playSound = useCallback(() => {
    if (timerEndAudioRef.current) {
      timerEndAudioRef.current.currentTime = 0;
      timerEndAudioRef.current.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });
    }
  }, []);

  function shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Word timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!canProceed && !isTimeUp) {
      interval = setInterval(() => {
        setWordTimer(prev => {
          if (prev === 1) {
            setCanProceed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [canProceed, isTimeUp]);

  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameTimer > 0 && !isTimeUp) {
      interval = setInterval(() => {
        setGameTimer(prev => {
          if (prev === 1) {
            setIsTimeUp(true);
            setIsShaking(true);
            playSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameTimer, isTimeUp, playSound]);

  useEffect(() => {
    setCanProceed(false);
    setWordTimer(WORD_TIMER);
  }, []);

  const handleNext = () => {
    if (!canProceed) return;

    // Reset timers and states
    setWordTimer(WORD_TIMER);
    setCanProceed(false);
    setIsShaking(false);
    setGameTimer(TOTAL_TIME);
    setIsTimeUp(false);

    setAvailableIndices(prev => {
      const remaining = prev.filter(i => i !== currentWordIndex);
      if (remaining.length === 0) {
        return shuffle(Array.from({ length: words.length }, (_, i) => i));
      }
      return remaining;
    });

    setAvailableIndices(prev => {
      setCurrentWordIndex(prev[0]);
      return prev;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((TOTAL_TIME - gameTimer) / TOTAL_TIME) * 100;

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col text-white">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm"
      >
        ← Back to Selection
      </button>

      <div className="flex-grow flex items-center justify-center">
        <div className="relative w-full max-w-sm">
          <div className={`relative bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 transition-transform min-h-[280px] flex flex-col ${isShaking ? 'animate-shake' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-400">
                Time Remaining
              </div>
              <div className="flex items-center gap-3">
                <CircularTimer progress={progressPercentage} size={32} />
                <div className={`text-lg font-bold ${gameTimer <= 30 ? 'text-red-500' : 'text-purple-400'}`}>
                  {formatTime(gameTimer)}
                </div>
              </div>
            </div>

            <div className="flex-grow flex flex-col">
              <h2 className="text-3xl font-bold mb-6 break-words bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {words[currentWordIndex]}
              </h2>
              
              <div className="mt-auto mb-6">
                {isTimeUp && (
                  <div className="text-xl font-semibold text-red-500">
                    Time's Up! 🔔
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`w-full px-6 py-3 rounded-lg text-lg font-semibold transition-all transform
                ${canProceed
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
            >
              Next Word 🎯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;