import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Trophy, RefreshCw, Star, Heart, Sparkles, X } from 'lucide-react';

const arabicLetters = [
  'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 
  'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
];

interface LetterSortingGameProps {
  onBack: () => void;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // اختيار فيديو عشوائي من القناة المحددة
  const videos = [
    'MBsYXRytFo8',
    'duD-rZAUeJE'
  ];
  const selectedVideo = videos[Math.floor(Math.random() * videos.length)];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-600 font-arabic">🎉 مبروك! أنت بطل! 🎉</h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-4">
          <p className="text-center text-lg text-purple-700 font-arabic">
            ✨ لقد أكملت جميع المراحل بنجاح! استمتع بهذا الفيديو الجميل ✨
          </p>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
            title="فيديو تحفيزي للأطفال"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const LetterSortingGame: React.FC<LetterSortingGameProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [correctPlacements, setCorrectPlacements] = useState<{ [key: string]: boolean }>({});
  const [score, setScore] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const failAudioRef = useRef<HTMLAudioElement | null>(null);
  const levelCompleteAudioRef = useRef<HTMLAudioElement | null>(null);

  const levelsData = [
    ['أ', 'ب', 'ت'],
    ['ث', 'ج', 'ح'],
    ['خ', 'د', 'ذ'],
    ['ر', 'ز', 'س'],
    ['ش', 'ص', 'ض'],
    ['ط', 'ظ', 'ع'],
    ['غ', 'ف', 'ق'],
    ['ك', 'ل', 'م'],
    ['ن', 'هـ', 'و'],
    ['ي']
  ];

  useEffect(() => {
    // إنشاء أصوات باستخدام Web Audio API
    const createBeepSound = (frequency: number, duration: number, type: 'success' | 'fail' | 'complete') => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'success') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
      } else if (type === 'fail') {
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.2); // G3
      } else {
        // Complete sound - happy melody
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.15);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.3);
        oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.45);
      }
      
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    successAudioRef.current = {
      play: () => createBeepSound(523.25, 0.3, 'success')
    } as any;

    failAudioRef.current = {
      play: () => createBeepSound(220, 0.5, 'fail')
    } as any;

    levelCompleteAudioRef.current = {
      play: () => createBeepSound(523.25, 0.6, 'complete')
    } as any;

    initializeLevel();
  }, [currentLevel]);

  const initializeLevel = () => {
    if (currentLevel < levelsData.length) {
      const levelLetters = levelsData[currentLevel];
      const shuffled = [...levelLetters].sort(() => Math.random() - 0.5);
      setShuffledLetters(shuffled);
      setCorrectPlacements({});
      setLevelComplete(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, letter: string) => {
    setDraggedLetter(letter);
    e.dataTransfer.setData('text/plain', letter);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetLetter: string) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData('text/plain');
    
    if (droppedLetter === targetLetter) {
      // نجح السحب
      setCorrectPlacements(prev => ({ ...prev, [targetLetter]: true }));
      setScore(prev => prev + 10);
      successAudioRef.current?.play();
      
      // فحص إكمال المستوى
      const currentLevelLetters = levelsData[currentLevel];
      const newCorrectPlacements = { ...correctPlacements, [targetLetter]: true };
      
      if (currentLevelLetters.every(letter => newCorrectPlacements[letter])) {
        setLevelComplete(true);
        levelCompleteAudioRef.current?.play();
        
        setTimeout(() => {
          if (currentLevel + 1 >= levelsData.length) {
            setGameComplete(true);
            setShowVideoModal(true);
          } else {
            setCurrentLevel(prev => prev + 1);
          }
        }, 2000);
      }
    } else {
      // فشل السحب
      failAudioRef.current?.play();
    }
    
    setDraggedLetter(null);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameComplete(false);
    setShowVideoModal(false);
    initializeLevel();
  };

  const currentLevelLetters = levelsData[currentLevel] || [];

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-600 font-arabic">ترتيب الحروف</h1>
              <p className="text-lg text-gray-600 font-arabic">المستوى {currentLevel + 1} من {levelsData.length}</p>
            </div>
            
            <div className="bg-yellow-100 px-4 py-2 rounded-2xl">
              <span className="text-yellow-700 font-bold font-arabic">النقاط: {score}</span>
            </div>
          </div>

          {/* Success Message */}
          {levelComplete && (
            <div className="text-center mb-6 animate-bounce">
              <div className="bg-green-100 rounded-2xl p-6 inline-block">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-green-600 font-arabic">أحسنت! 🎉</h2>
                <p className="text-green-700 font-arabic">لقد أكملت هذا المستوى بنجاح!</p>
              </div>
            </div>
          )}

          {/* Game Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Draggable Letters */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-700 font-arabic">اسحب الحروف</h3>
              <div className="grid grid-cols-3 gap-4">
                {shuffledLetters.map((letter, index) => (
                  <div
                    key={`draggable-${letter}-${index}`}
                    draggable={!correctPlacements[letter]}
                    onDragStart={(e) => handleDragStart(e, letter)}
                    className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold
                      transition-all duration-300 cursor-move shadow-lg
                      ${correctPlacements[letter] 
                        ? 'bg-green-200 text-green-800 opacity-50 cursor-not-allowed' 
                        : 'bg-white text-blue-600 hover:scale-110 hover:shadow-xl'
                      }
                      ${draggedLetter === letter ? 'scale-110 rotate-12' : ''}
                    `}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Drop Zones */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-700 font-arabic">ضع الحروف هنا</h3>
              <div className="grid grid-cols-3 gap-4">
                {currentLevelLetters.map((letter, index) => (
                  <div
                    key={`dropzone-${letter}-${index}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, letter)}
                    className={`
                      w-16 h-16 rounded-2xl border-2 border-dashed flex items-center justify-center
                      text-2xl font-bold transition-all duration-300
                      ${correctPlacements[letter]
                        ? 'bg-green-200 border-green-400 text-green-800 animate-pulse'
                        : 'bg-gray-100 border-gray-400 text-gray-500 hover:border-green-400 hover:bg-green-50'
                      }
                    `}
                  >
                    {correctPlacements[letter] ? letter : '؟'}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 text-center mb-6">
            <p className="text-gray-700 font-arabic">
              🎯 اسحب كل حرف إلى المكان المناسب له!
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center">
            <button
              onClick={resetGame}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg font-arabic"
            >
              <RefreshCw className="w-5 h-5 inline ml-2" />
              إعادة البدء
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentLevel + 1) / levelsData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 animate-bounce delay-0">
          <Star className="w-8 h-8 text-yellow-400 fill-current" />
        </div>
        <div className="absolute top-20 right-16 animate-bounce delay-150">
          <Heart className="w-6 h-6 text-pink-400 fill-current" />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-300">
          <Sparkles className="w-7 h-7 text-purple-400 fill-current" />
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
    </>
  );
};

export default LetterSortingGame;