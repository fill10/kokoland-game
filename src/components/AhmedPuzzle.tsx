import React, { useState } from "react";

interface PuzzleImage {
  src: string;
  word: string;
}

const puzzles: PuzzleImage[] = [
  { src: "/assets/images/apple.png", word: "تفاحة" },
  { src: "/assets/images/duck.png", word: "بطة" },
  { src: "/assets/images/camel.png", word: "جمل" },
  // 🔔 أضف بقية صور البازل هنا
];

function AhmedPuzzle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solved, setSolved] = useState(false);

  const currentPuzzle = puzzles[currentIndex];

  const handleSolve = () => {
    setSolved(true);
  };

  const handleNext = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSolved(false);
    } else {
      alert("🎉 لقد أنهيت جميع الألغاز!");
      setCurrentIndex(0);
      setSolved(false);
    }
  };

  return (
    <div className="p-6 font-arabic text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">🎮 أحمد يلعب البازل</h1>

      {/* صورة البازل */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 inline-block">
        <img
          src={currentPuzzle.src}
          alt={currentPuzzle.word}
          className="w-60 h-60 object-contain mx-auto"
        />
        <p className="mt-4 text-xl font-bold text-gray-700">{currentPuzzle.word}</p>
      </div>

      {/* زر الحل */}
      {!solved ? (
        <button
          onClick={handleSolve}
          className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-green-600 transition-all duration-300"
        >
          ✅ حل البازل
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-green-700 font-bold">🎉 ممتاز! لقد حليت البازل</p>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-600 transition-all duration-300"
          >
            ⏭️ التالي
          </button>
        </div>
      )}
    </div>
  );
}

export default AhmedPuzzle;
