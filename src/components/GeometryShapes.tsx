import React, { useState, useEffect } from 'react';
import { Shapes, Trophy, RotateCcw, Volume2, Star } from 'lucide-react';

interface Shape {
  id: number;
  name: string;
  nameEn: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  sides: number;
  type: 'circle' | 'square' | 'triangle' | 'rectangle' | 'pentagon' | 'hexagon';
}

const shapes: Shape[] = [
  { id: 1, name: 'دائرة', nameEn: 'Circle', color: '#FF6B6B', size: 'small', sides: 0, type: 'circle' },
  { id: 2, name: 'مربع', nameEn: 'Square', color: '#4ECDC4', size: 'medium', sides: 4, type: 'square' },
  { id: 3, name: 'مثلث', nameEn: 'Triangle', color: '#45B7D1', size: 'large', sides: 3, type: 'triangle' },
  { id: 4, name: 'مستطيل', nameEn: 'Rectangle', color: '#96CEB4', size: 'small', sides: 4, type: 'rectangle' },
  { id: 5, name: 'خماسي', nameEn: 'Pentagon', color: '#FECA57', size: 'medium', sides: 5, type: 'pentagon' },
  { id: 6, name: 'سداسي', nameEn: 'Hexagon', color: '#FF9FF3', size: 'large', sides: 6, type: 'hexagon' },
  { id: 7, name: 'دائرة', nameEn: 'Circle', color: '#54A0FF', size: 'medium', sides: 0, type: 'circle' },
  { id: 8, name: 'مربع', nameEn: 'Square', color: '#5F27CD', size: 'large', sides: 4, type: 'square' },
];

const GeometryShapes: React.FC = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [gameMode, setGameMode] = useState<'learn' | 'sort' | 'identify'>('learn');
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [sortBy, setSortBy] = useState<'color' | 'size' | 'sides' | 'type'>('size');
  const [sortedShapes, setSortedShapes] = useState<Shape[]>([]);
  const [score, setScore] = useState(0);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [identifyTarget, setIdentifyTarget] = useState<Shape | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (gameMode === 'sort') {
      shuffleShapes();
    } else if (gameMode === 'identify') {
      setIdentifyTarget(shapes[Math.floor(Math.random() * shapes.length)]);
    }
  }, [gameMode, sortBy]);

  const shuffleShapes = () => {
    const shuffled = [...shapes].sort(() => Math.random() - 0.5);
    setSortedShapes(shuffled);
    setGameComplete(false);
  };

  const sortShapes = () => {
    const sorted = [...sortedShapes].sort((a, b) => {
      switch (sortBy) {
        case 'size':
          const sizeOrder = { small: 1, medium: 2, large: 3 };
          return sizeOrder[a.size] - sizeOrder[b.size];
        case 'color':
          return a.color.localeCompare(b.color);
        case 'sides':
          return a.sides - b.sides;
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
    
    setSortedShapes(sorted);
    setScore(prev => prev + 10);
    setGameComplete(true);
    playSuccessSound();
  };

  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const speakShape = (shape: Shape) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        language === 'ar' ? shape.name : shape.nameEn
      );
      utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleShapeIdentify = (shape: Shape) => {
    if (identifyTarget && shape.type === identifyTarget.type) {
      setScore(prev => prev + 5);
      playSuccessSound();
      setIdentifyTarget(shapes[Math.floor(Math.random() * shapes.length)]);
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'w-12 h-12';
      case 'medium': return 'w-16 h-16';
      case 'large': return 'w-20 h-20';
      default: return 'w-16 h-16';
    }
  };

  const renderShape = (shape: Shape, onClick?: () => void) => {
    const baseClasses = `${getSizeClass(shape.size)} transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg flex items-center justify-center`;
    
    const shapeElement = (() => {
      switch (shape.type) {
        case 'circle':
          return (
            <div 
              className={`${baseClasses} rounded-full`}
              style={{ backgroundColor: shape.color }}
              onClick={onClick}
            />
          );
        case 'square':
          return (
            <div 
              className={`${baseClasses} rounded-lg`}
              style={{ backgroundColor: shape.color }}
              onClick={onClick}
            />
          );
        case 'rectangle':
          return (
            <div 
              className={`${baseClasses} rounded-lg`}
              style={{ 
                backgroundColor: shape.color,
                width: shape.size === 'small' ? '60px' : shape.size === 'medium' ? '80px' : '100px',
                height: shape.size === 'small' ? '40px' : shape.size === 'medium' ? '50px' : '60px'
              }}
              onClick={onClick}
            />
          );
        case 'triangle':
          const size = shape.size === 'small' ? 24 : shape.size === 'medium' ? 32 : 40;
          return (
            <div className="flex items-center justify-center" onClick={onClick}>
              <svg width={size * 2} height={size * 2} className="hover:scale-110 transition-transform cursor-pointer">
                <polygon
                  points={`${size},4 ${size * 2 - 4},${size * 2 - 4} 4,${size * 2 - 4}`}
                  fill={shape.color}
                  className="drop-shadow-lg"
                />
              </svg>
            </div>
          );
        case 'pentagon':
        case 'hexagon':
          const polygonSize = shape.size === 'small' ? 24 : shape.size === 'medium' ? 32 : 40;
          const sides = shape.sides;
          const points = Array.from({ length: sides }, (_, i) => {
            const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
            const x = polygonSize + polygonSize * Math.cos(angle);
            const y = polygonSize + polygonSize * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');
          
          return (
            <div className="flex items-center justify-center" onClick={onClick}>
              <svg width={polygonSize * 2} height={polygonSize * 2} className="hover:scale-110 transition-transform cursor-pointer">
                <polygon
                  points={points}
                  fill={shape.color}
                  className="drop-shadow-lg"
                />
              </svg>
            </div>
          );
        default:
          return null;
      }
    })();

    return shapeElement;
  };

  const currentShape = shapes[currentShapeIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shapes className="w-12 h-12 text-purple-500 mr-3" />
            <h1 className="text-4xl font-bold text-purple-600 font-arabic">
              {language === 'ar' ? 'هندسة الأشكال' : 'Geometry Shapes'}
            </h1>
          </div>
          
          {/* Language Toggle */}
          <div className="flex justify-center space-x-2 mb-4">
            <button
              onClick={() => setLanguage('ar')}
              className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                language === 'ar'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                language === 'en'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              English
            </button>
          </div>

          {/* Game Mode Selection */}
          <div className="flex justify-center space-x-2 mb-6 flex-wrap gap-2">
            <button
              onClick={() => setGameMode('learn')}
              className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                gameMode === 'learn'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {language === 'ar' ? 'التعلم' : 'Learn'}
            </button>
            <button
              onClick={() => setGameMode('sort')}
              className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                gameMode === 'sort'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {language === 'ar' ? 'الترتيب' : 'Sort'}
            </button>
            <button
              onClick={() => setGameMode('identify')}
              className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                gameMode === 'identify'
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {language === 'ar' ? 'التمييز' : 'Identify'}
            </button>
          </div>

          {/* Score */}
          <div className="bg-yellow-100 px-4 py-2 rounded-2xl inline-block">
            <span className="text-yellow-700 font-bold">
              {language === 'ar' ? 'النقاط' : 'Score'}: {score}
            </span>
          </div>
        </div>

        {/* Learning Mode */}
        {gameMode === 'learn' && (
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-12 mb-6">
              <div className="flex justify-center mb-6">
                {renderShape(currentShape, () => speakShape(currentShape))}
              </div>
              <h2 className="text-4xl font-bold text-purple-600 mb-4">
                {language === 'ar' ? currentShape.name : currentShape.nameEn}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-lg text-gray-600 max-w-md mx-auto">
                <div className="bg-white/50 rounded-2xl p-3">
                  <strong>{language === 'ar' ? 'الأضلاع:' : 'Sides:'}</strong> {currentShape.sides || (language === 'ar' ? 'لا يوجد' : 'None')}
                </div>
                <div className="bg-white/50 rounded-2xl p-3">
                  <strong>{language === 'ar' ? 'الحجم:' : 'Size:'}</strong> {language === 'ar' ? 
                    (currentShape.size === 'small' ? 'صغير' : currentShape.size === 'medium' ? 'متوسط' : 'كبير') :
                    currentShape.size
                  }
                </div>
              </div>
              <button
                onClick={() => speakShape(currentShape)}
                className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Volume2 className="w-5 h-5 inline ml-2" />
                {language === 'ar' ? 'استمع' : 'Listen'}
              </button>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentShapeIndex((prev) => (prev - 1 + shapes.length) % shapes.length)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {language === 'ar' ? 'السابق' : 'Previous'}
              </button>
              <button
                onClick={() => setCurrentShapeIndex((prev) => (prev + 1) % shapes.length)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {language === 'ar' ? 'التالي' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {/* Sorting Mode */}
        {gameMode === 'sort' && (
          <div>
            <div className="text-center mb-6">
              <p className="text-lg mb-4 text-gray-600">
                {language === 'ar' ? 'رتّب الأشكال حسب:' : 'Sort shapes by:'}
              </p>
              <div className="flex justify-center space-x-2 mb-4 flex-wrap gap-2">
                {['size', 'color', 'sides', 'type'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSortBy(type as any)}
                    className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                      sortBy === type
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {language === 'ar' ? 
                      (type === 'size' ? 'الحجم' : type === 'color' ? 'اللون' : type === 'sides' ? 'الأضلاع' : 'النوع') :
                      type.charAt(0).toUpperCase() + type.slice(1)
                    }
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center">
                {sortedShapes.map((shape, index) => (
                  <div key={`${shape.id}-${index}`} className="flex flex-col items-center space-y-2">
                    {renderShape(shape)}
                    <span className="text-xs text-gray-500">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={sortShapes}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {language === 'ar' ? 'رتّب الآن! ✨' : 'Sort Now! ✨'}
              </button>
              
              <button
                onClick={shuffleShapes}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            {gameComplete && (
              <div className="text-center mt-6 animate-bounce">
                <div className="bg-green-100 rounded-2xl p-4 inline-block">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-green-700 font-bold">
                    {language === 'ar' ? 'أحسنت! تم الترتيب بنجاح!' : 'Well done! Sorted successfully!'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Identification Mode */}
        {gameMode === 'identify' && identifyTarget && (
          <div>
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">
                  {language === 'ar' ? 'ابحث عن:' : 'Find the:'}
                </h3>
                <div className="flex justify-center mb-4">
                  {renderShape(identifyTarget)}
                </div>
                <p className="text-xl font-bold text-purple-600">
                  {language === 'ar' ? identifyTarget.name : identifyTarget.nameEn}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center">
                {shapes.map((shape, index) => (
                  <div 
                    key={`identify-${shape.id}-${index}`} 
                    className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => handleShapeIdentify(shape)}
                  >
                    {renderShape(shape)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeometryShapes;