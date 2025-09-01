import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Letter = {
  id: number;
  char: string;
  sound: string;
};

const LetterSortingGame: React.FC = () => {
  // المستويات: 4 حروف في كل مستوى
  const levels: Letter[][] = [
    [
      { id: 1, char: 'أ', sound: '/sounds/a.mp3' },
      { id: 2, char: 'ب', sound: '/sounds/b.mp3' },
      { id: 3, char: 'ت', sound: '/sounds/t.mp3' },
      { id: 4, char: 'ث', sound: '/sounds/th.mp3' },
    ],
    [
      { id: 5, char: 'ج', sound: '/sounds/ga.mp3' },
      { id: 6, char: 'ح', sound: '/sounds/h.mp3' },
      { id: 7, char: 'خ', sound: '/sounds/ka.mp3' },
      { id: 8, char: 'د', sound: '/sounds/d.mp3' },
    ],
    [
      { id: 9, char: 'ذ', sound: '/sounds/tha.mp3' },
      { id: 10, char: 'ر', sound: '/sounds/ra.mp3' },
      { id: 11, char: 'ز', sound: '/sounds/za.mp3' },
      { id: 12, char: 'س', sound: '/sounds/saa.mp3' },
    ],
    [
      { id: 13, char: 'ش', sound: '/sounds/sha.mp3' },
      { id: 14, char: 'ص', sound: '/sounds/sa.mp3' },
      { id: 15, char: 'ض', sound: '/sounds/da.mp3' },
      { id: 16, char: 'ط', sound: '/sounds/taa.mp3' },
    ],
    [
      { id: 17, char: 'ع', sound: '/sounds/aa.mp3' },
      { id: 18, char: 'غ', sound: '/sounds/kha.mp3' },
      { id: 19, char: 'ف', sound: '/sounds/fa.mp3' },
      { id: 20, char: 'ق', sound: '/sounds/gaa.mp3' },
    ],
    [
      { id: 21, char: 'ك', sound: '/sounds/kaa.mp3' },
      { id: 22, char: 'ل', sound: '/sounds/la.mp3' },
      { id: 23, char: 'م', sound: '/sounds/ma.mp3' },
      { id: 24, char: 'ن', sound: '/sounds/na.mp3' },
    ],
    [
      { id: 25, char: 'هـ', sound: '/sounds/haa.mp3' },
      { id: 26, char: 'و', sound: '/sounds/wa.mp3' },
      { id: 27, char: 'ي', sound: '/sounds/ya.mp3' },
    ],
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // تشغيل الصوت
  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.volume = 1.0;
    audio.play().catch((err) => console.warn('تعذر تشغيل الصوت:', err));
  };

  // إنهاء المستوى
  const completeLevel = () => {
    setShowSuccess(true);
  };

  // الانتقال للمستوى التالي
  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setShowSuccess(false);
    } else {
      setShowSuccess(false);
      alert('🎉 لقد أنهيت جميع المستويات!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-yellow-100 p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 font-arabic">
        لعبة ترتيب الحروف - المستوى {currentLevel + 1}
      </h1>

      {/* مربعات الحروف */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {levels[currentLevel].map((letter) => (
          <motion.div
            key={letter.id}
            onClick={() => playSound(letter.sound)}
            className="bg-white w-48 h-48 flex items-center justify-center rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300 border-4 border-purple-300"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-7xl font-bold text-purple-700">{letter.char}</span>
          </motion.div>
        ))}
      </div>

      {/* زر إنهاء المستوى */}
      <button
        onClick={completeLevel}
        className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300 font-arabic"
      >
        إنهاء المستوى ✅
      </button>

      {/* نافذة النجاح */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center"
            >
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                🎉 أحسنت!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                لقد أنهيت المستوى {currentLevel + 1} بنجاح!
              </p>
              <button
                onClick={nextLevel}
                className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
              >
                {currentLevel < levels.length - 1
                  ? 'المستوى التالي ⏭'
                  : 'إنهاء اللعبة 🎯'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LetterSortingGame;
