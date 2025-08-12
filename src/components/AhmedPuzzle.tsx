import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, Trophy, ArrowRight, ArrowLeft, Volume2 } from 'lucide-react';
import VideoModal from './VideoModal';

interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number;
  image: string;
}

const puzzleImages = [
  { name: 'الدجاجة المرحة', src: 'src/assets/puzzles/دجاجة-chicken.webp' },
  { name: 'الطائرة السريعة', src: 'src/assets/puzzles/طائرة-airplane.webp' },
  { name: 'الفراشة الجميلة', src: 'src/assets/puzzles/فراشة-butterfly.webp' },
  { name: 'الموزة اللذيذة', src: 'src/assets/puzzles/موزة-banana.webp' },
  { name: 'النحلة النشيطة', src: 'src/assets/puzzles/نحلة-bee.webp' },
];

const AhmedPuzzle: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1); // 1 = easy (4 pieces), 2 = hard (6 pieces)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [completedPuzzles, setCompletedPuzzles] = useState(0);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);

  const totalPuzzles = puzzleImages.length * 2; // 2 levels per image

  useEffect(() => {
    initializePuzzle();
  }, [currentLevel, currentImageIndex]);

  const initializePuzzle = () => {
    const pieceCount = currentLevel === 1 ? 4 : 6;
    const pieces: PuzzlePiece[] = [];
    
    for (let i = 0; i < pieceCount; i++) {
      pieces.push({
        id: i,
        correctPosition: i,
        currentPosition: i,
        image: puzzleImages[currentImageIndex].src
      });
    }
    
    // Shuffle pieces
    const shuffled = [...pieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i].currentPosition;
      shuffled[i].currentPosition = shuffled[j].currentPosition;
      shuffled[j].currentPosition = temp;
    }
    
    setPuzzlePieces(shuffled);
    setIsComplete(false);
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

  const playApplauseSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Happy melody
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15);
    });
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.8);
  };

  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    setDraggedPiece(pieceId);
    e.dataTransfer.setData('text/plain', pieceId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetPosition: number) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    
    // Swap pieces
    const newPieces = [...puzzlePieces];
    const draggedPieceIndex = newPieces.findIndex(p => p.id === draggedId);
    const targetPieceIndex = newPieces.findIndex(p => p.currentPosition === targetPosition);
    
    if (draggedPieceIndex !== -1 && targetPieceIndex !== -1) {
      const temp = newPieces[draggedPieceIndex].currentPosition;
      newPieces[draggedPieceIndex].currentPosition = newPieces[targetPieceIndex].currentPosition;
      newPieces[targetPieceIndex].currentPosition = temp;
      
      setPuzzlePieces(newPieces);
      
      // Check if puzzle is complete
      const isCompleteNow = newPieces.every(piece => piece.id === piece.currentPosition);
      if (isCompleteNow) {
        setIsComplete(true);
        setScore(prev => prev + (currentLevel === 1 ? 10 : 20));
        setCompletedPuzzles(prev => prev + 1);
        playApplauseSound();
        
        // Check if all puzzles completed
        if (completedPuzzles + 1 >= totalPuzzles) {
          setTimeout(() => setShowVideoModal(true), 2000);
        }
      } else {
        playSuccessSound();
      }
    }
    
    setDraggedPiece(null);
  };

  const nextPuzzle = () => {
    // الانتقال للصورة التالية مباشرة
    setCurrentImageIndex((prev) => (prev + 1) % puzzleImages.length);
    
    // إعادة تهيئة البازل للصورة الجديدة
    setTimeout(() => {
      initializePuzzle();
    }, 100);
  };

  const resetPuzzle = () => {
    initializePuzzle();
  };

  const getPieceStyle = (piece: PuzzlePiece) => {
    const pieceCount = currentLevel === 1 ? 4 : 6;
    const cols = currentLevel === 1 ? 2 : 3;
    const rows = currentLevel === 1 ? 2 : 2;
    
    const col = piece.id % cols;
    const row = Math.floor(piece.id / cols);
    
    return {
      backgroundImage: `url(${piece.image})`,
      backgroundSize: `${cols * 100}% ${rows * 100}%`,
      backgroundPosition: `-${col * 100}% -${row * 100}%`,
    };
  };

  const currentImage = puzzleImages[currentImageIndex];
  const pieceCount = currentLevel === 1 ? 4 : 6;
  const gridCols = currentLevel === 1 ? 2 : 3;

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Layers className="w-12 h-12 text-green-500 mr-3" />
              <h1 className="text-4xl font-bold text-green-600 font-arabic">أحمد يلعب البازل</h1>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="bg-green-100 px-4 py-2 rounded-2xl">
                <span className="text-green-700 font-bold font-arabic">النقاط: {score}</span>
              </div>
              <div className="bg-blue-100 px-4 py-2 rounded-2xl">
                <span className="text-blue-700 font-bold font-arabic">
                  المستوى: {currentLevel} ({currentLevel === 1 ? '4 قطع' : '6 قطع'})
                </span>
              </div>
              <div className="bg-purple-100 px-4 py-2 rounded-2xl">
                <span className="text-purple-700 font-bold font-arabic">
                  {completedPuzzles}/{totalPuzzles}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-700 font-arabic">{currentImage.name}</h2>
          </div>

          {/* Success Message */}
          {isComplete && (
            <div className="text-center mb-6 animate-bounce">
              <div className="bg-green-100 rounded-2xl p-6 inline-block">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-green-600 font-arabic">أحسنت! 🎉</h2>
                <p className="text-green-700 font-arabic">لقد أكملت البازل بنجاح!</p>
              </div>
            </div>
          )}

          {/* Puzzle Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Reference Image */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-700 font-arabic">الصورة الأصلية</h3>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={currentImage.src} 
                  alt={currentImage.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Puzzle Grid */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-700 font-arabic">رتب القطع</h3>
              <div 
                className={`grid gap-2 aspect-square`}
                style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
              >
                {Array.from({ length: pieceCount }, (_, index) => {
                  const piece = puzzlePieces.find(p => p.currentPosition === index);
                  return (
                    <div
                      key={index}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-100 hover:border-green-400 transition-colors"
                    >
                      {piece && (
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, piece.id)}
                          className={`w-full h-full cursor-move transition-all duration-300 hover:scale-105 ${
                            draggedPiece === piece.id ? 'opacity-50 rotate-12' : ''
                          } ${
                            piece.id === piece.currentPosition ? 'ring-2 ring-green-400' : ''
                          }`}
                          style={getPieceStyle(piece)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={nextPuzzle}
              disabled={!isComplete}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 font-arabic ${
                isComplete
                  ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ArrowRight className="w-5 h-5 inline ml-2" />
              التالي
            </button>
            
            <button
              onClick={resetPuzzle}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <RotateCcw className="w-5 h-5 inline ml-2" />
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 text-center">
            <p className="text-gray-700 font-arabic">
              🎯 اسحب قطع البازل لترتيبها في المكان الصحيح!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedPuzzles / totalPuzzles) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
    </>
  );
};

export default AhmedPuzzle;