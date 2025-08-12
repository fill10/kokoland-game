import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, Trophy, Timer } from 'lucide-react';

const items = [
  { id: 1, color: '#FF6B6B', size: 'small', shape: 'circle' },
  { id: 2, color: '#4ECDC4', size: 'medium', shape: 'square' },
  { id: 3, color: '#45B7D1', size: 'large', shape: 'triangle' },
  { id: 4, color: '#96CEB4', size: 'small', shape: 'square' },
  { id: 5, color: '#FECA57', size: 'medium', shape: 'circle' },
  { id: 6, color: '#FF9FF3', size: 'large', shape: 'triangle' },
];

const AhmedSorting: React.FC = () => {
  const [gameItems, setGameItems] = useState(items);
  const [sortBy, setSortBy] = useState<'color' | 'size' | 'shape'>('size');
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setGameItems(shuffled);
    setGameWon(false);
    setScore(0);
  };

  const sortItems = () => {
    const sorted = [...gameItems].sort((a, b) => {
      if (sortBy === 'size') {
        const sizeOrder = { small: 1, medium: 2, large: 3 };
        return sizeOrder[a.size as keyof typeof sizeOrder] - sizeOrder[b.size as keyof typeof sizeOrder];
      }
      if (sortBy === 'color') {
        return a.color.localeCompare(b.color);
      }
      if (sortBy === 'shape') {
        return a.shape.localeCompare(b.shape);
      }
      return 0;
    });
    
    setGameItems(sorted);
    setGameWon(true);
    setScore(prev => prev + 10);
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'w-8 h-8';
      case 'medium': return 'w-12 h-12';
      case 'large': return 'w-16 h-16';
      default: return 'w-12 h-12';
    }
  };

  const renderShape = (item: any) => {
    const baseClasses = `${getSizeClass(item.size)} transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg`;
    
    if (item.shape === 'circle') {
      return (
        <div 
          className={`${baseClasses} rounded-full`}
          style={{ backgroundColor: item.color }}
        />
      );
    }
    
    if (item.shape === 'square') {
      return (
        <div 
          className={`${baseClasses} rounded-lg`}
          style={{ backgroundColor: item.color }}
        />
      );
    }
    
    if (item.shape === 'triangle') {
      const size = item.size === 'small' ? 16 : item.size === 'medium' ? 24 : 32;
      return (
        <div className="flex items-center justify-center">
          <svg width={size * 2} height={size * 2} className="hover:scale-110 transition-transform cursor-pointer">
            <polygon
              points={`${size},4 ${size * 2 - 4},${size * 2 - 4} 4,${size * 2 - 4}`}
              fill={item.color}
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      );
    }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'size': return 'الحجم (صغير → كبير)';
      case 'color': return 'اللون';
      case 'shape': return 'الشكل';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Layers className="w-12 h-12 text-green-500 mr-3" />
            <h1 className="text-4xl font-bold text-green-600 font-arabic">أحمد يُرتِّب</h1>
          </div>
          
          {/* Score */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="bg-green-100 px-4 py-2 rounded-2xl">
              <span className="text-green-700 font-bold font-arabic">النقاط: {score}</span>
            </div>
            {gameWon && (
              <div className="bg-yellow-100 px-4 py-2 rounded-2xl animate-bounce">
                <Trophy className="w-6 h-6 text-yellow-600 inline ml-2" />
                <span className="text-yellow-700 font-bold font-arabic">أحسنت!</span>
              </div>
            )}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="text-center mb-8">
          <p className="text-lg mb-4 text-gray-600 font-arabic">رتّب الأشكال حسب:</p>
          <div className="flex justify-center space-x-2 mb-4">
            {['size', 'color', 'shape'].map((type) => (
              <button
                key={type}
                onClick={() => setSortBy(type as any)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 font-arabic ${
                  sortBy === type
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {type === 'size' ? 'الحجم' : type === 'color' ? 'اللون' : 'الشكل'}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 font-arabic">الترتيب الحالي: {getSortLabel()}</p>
        </div>

        {/* Game Area */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-6">
          <div className="grid grid-cols-6 gap-4 justify-items-center">
            {gameItems.map((item, index) => (
              <div key={item.id} className="flex flex-col items-center space-y-2">
                {renderShape(item)}
                <span className="text-xs text-gray-500">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={sortItems}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg font-arabic"
          >
            رتّب الآن! ✨
          </button>
          
          <button
            onClick={shuffleItems}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 font-arabic">
            🎯 اختر طريقة الترتيب ثم اضغط "رتّب الآن" لترتيب الأشكال!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AhmedSorting;