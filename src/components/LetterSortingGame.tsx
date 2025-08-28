import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Letter = {
  id: number;
  char: string;
  sound: string;
};

const LetterSortingGame: React.FC = () => {
  // مستويات تحتوي على 4 حروف في كل مستوى
  const levels: Letter[][] = [
    [
      { id: 1, char: 'أ', sound: '/sounds/a.mp3' },
      { id: 2, char: 'ب', sound: '/sounds/a.mp3' },
      { id: 3, char: 'ت', sound: '/sounds/a.mp3' },
      { id: 4, char: 'ث', sound: '/sounds/a.mp3' },
    ],
    [
      { id: 5, char: 'ج', sound: '/sounds/a.mp3' },
      { id: 6, char: 'ح', sound: '/sounds/a.mp3' },
      { id: 7, char: 'خ', sound: '/sounds/a.mp3' },
      { id: 8, char: 'د', sound: '/sounds/a.mp3' },
    ],
    [
      { id: 9, char: 'ذ', sound: '/sounds/a.mp3' },
      { id: 10, char: 'ر', sound: '/sounds/a.mp3' },
      { id: 11, char: 'ز', sound: '/sounds/a.mp3' },
      { id: 12, char: 'س', sound: '/sounds/a.mp3' },
    ],
    [
      { id: 13, char: 'ش', sound: '/sounds/a.mp3' },
      { id: 14, char: 'ص', sound: '/sounds/a.mp3' },
      { id: 15, char: 'ض', sound: '/sounds/a.mp3' },
      { id: 16, char: 'ط', sound: '/sounds/a.mp3' },
    ],
  ];

  const [currentLevel, setCurrentLevel] = useState(0);

  // تشغيل الصوت عند النقر أو السحب
  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.volume = 1.0; // أعلى مستوى للصوت
    audio.play().catch((err) => console.warn('تعذر تشغيل الصوت:', err));
  };

  // الانتقال للمستوى التالي
  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      alert('🎉 لقد أنهيت جميع المستويات!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-yellow-100 p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 font-arabic">
        لعبة ترتيب الحروف - المستوى {currentLevel + 1}
      </h1>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {levels[currentLevel].map((letter) => (
          <motion.div
            key={letter.id}
            onClick={() => playSound(letter.sound)}
            className="bg-white w-32 h-32 flex items-center justify-center rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300 border-4 border-purple-300"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-5xl font-bold text-purple-700">{letter.char}</span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={nextLevel}
        className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300 font-arabic"
      >
        المستوى التالي ⏭
      </button>
    </div>
  );
};

export default LetterSortingGame;
