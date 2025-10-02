import { useEffect } from "react";
import { loadStage } from "../gameLogic";

export default function LetterSortingGame() {
  useEffect(() => {
    loadStage(0); // تحميل أول مرحلة عند فتح القسم
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">🅰️ لعبة الحروف</h2>
      <div id="gameBoard" className="board grid grid-cols-5 gap-2 mb-4"></div>
      <div id="draggables" className="draggables flex flex-wrap gap-2"></div>
    </div>
  );
}
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Letter = {
  id: number;
  char: string;
  sound: string;
};

// المستويات + أصواتها حسب الأسماء الفعلية
const levels: Letter[][] = [
  [
    { id: 1, char: "أ", sound: "/assets/sounds/a.mp3" },
    { id: 2, char: "ب", sound: "/assets/sounds/b.mp3" },
    { id: 3, char: "ت", sound: "/assets/sounds/t.mp3" },
    { id: 4, char: "ث", sound: "/assets/sounds/th.mp3" }
  ],
  [
    { id: 5, char: "ج", sound: "/assets/sounds/ga.mp3" },
    { id: 6, char: "ح", sound: "/assets/sounds/h.mp3" },
    { id: 7, char: "خ", sound: "/assets/sounds/ka.mp3" },
    { id: 8, char: "د", sound: "/assets/sounds/d.mp3" }
  ],
  [
    { id: 9, char: "ذ", sound: "/assets/sounds/tha.mp3" },
    { id: 10, char: "ر", sound: "/assets/sounds/ra.mp3" },
    { id: 11, char: "ز", sound: "/assets/sounds/za.mp3" },
    { id: 12, char: "س", sound: "/assets/sounds/sa.mp3" }
  ],
  [
    { id: 13, char: "ش", sound: "/assets/sounds/sha.mp3" },
    { id: 14, char: "ص", sound: "/assets/sounds/sa.mp3" },
    { id: 15, char: "ض", sound: "/assets/sounds/da.mp3" },
    { id: 16, char: "ط", sound: "/assets/sounds/ta2.mp3" }
  ],
  [
    { id: 17, char: "ظ", sound: "/assets/sounds/za2.mp3" },
    { id: 18, char: "ع", sound: "/assets/sounds/aa.mp3" },
    { id: 19, char: "غ", sound: "/assets/sounds/kha.mp3" },
    { id: 20, char: "ف", sound: "/assets/sounds/fa.mp3" }
  ],
  [
    { id: 21, char: "ق", sound: "/assets/sounds/qaa.mp3" },
    { id: 22, char: "ك", sound: "/assets/sounds/kaa.mp3" },
    { id: 23, char: "ل", sound: "/assets/sounds/la.mp3" },
    { id: 24, char: "م", sound: "/assets/sounds/ma.mp3" }
  ],
  [
    { id: 25, char: "ن", sound: "/assets/sounds/na.mp3" },
    { id: 26, char: "هـ", sound: "/assets/sounds/haa.mp3" },
    { id: 27, char: "و", sound: "/assets/sounds/wa.mp3" },
    { id: 28, char: "ي", sound: "/assets/sounds/ya.mp3" }
  ]
];

const LetterSortingGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.volume = 1.0;
    audio.play().catch(() => {});
  };

  const completeLevel = () => setShowSuccess(true);

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((p) => p + 1);
      setShowSuccess(false);
    } else {
      setShowSuccess(false);
      alert("🎉 لقد أنهيت جميع المستويات!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-yellow-100 p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 font-arabic drop-shadow-lg">
        🎲 لعبة ترتيب الحروف - المستوى {currentLevel + 1}
      </h1>

      {/* شبكة الحروف */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {levels[currentLevel].map((letter) => (
          <motion.div
            key={letter.id}
            onClick={() => playSound(letter.sound)}
            className="bg-white w-48 h-48 flex items-center justify-center rounded-2xl shadow-lg cursor-pointer border-4 border-purple-300"
            whileTap={{ scale: 0.85, rotate: -5 }}
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [0, -5, 0],
              transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
          >
            <span className="text-7xl font-bold text-purple-700 drop-shadow-md">
              {letter.char}
            </span>
          </motion.div>
        ))}
      </div>

      {/* زر إنهاء المستوى */}
      <motion.button
        onClick={completeLevel}
        className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 font-arabic"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        إنهاء المستوى ✅
      </motion.button>

      {/* نافذة النجاح */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center"
            >
              <h2 className="text-2xl font-bold text-green-600 mb-4 animate-bounce">
                🎉 أحسنت!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                لقد أنهيت المستوى {currentLevel + 1} بنجاح!
              </p>
              <motion.button
                onClick={nextLevel}
                className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {currentLevel < levels.length - 1
                  ? "المستوى التالي ⏭"
                  : "إنهاء اللعبة 🎯"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LetterSortingGame;
